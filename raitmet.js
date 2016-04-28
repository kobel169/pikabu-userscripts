// ==UserScript==
// @name         Pikabu Karmamet
// @namespace    http://pikabu.ru/
// @version      0.4.1
// @description  Минусы и плюсы пачками.
// @author       kobl169
// @match        http://pikabu.ru/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Settings:
// Example: var whitelist = new Array("user1","user2","user3");
// Whitelist - список пользователей для одаривания пользователей плюсами
// Blacklist - список пользователей для одаривания пользователей минусами
var whitelist = new Array("kobl169");
var blacklist = new Array();

var page=$(location).attr('href');

function notifyUser(rate,clicked,user){
   Notification.requestPermission(function (permission) {
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }
    if (permission === "granted") {
      var notification = new Notification('Pikabu Karmamet', {body: '' + rate + ': ' + clicked + ' пользователю ' + user + '', icon: 'http://cs.pikabu.ru/images/def_avatar/def_avatar_100.png'});
    }
  }
);}

function massVote(user,rating){
  var clicked = $("a:contains(" + user + ")").parent().parent().find("li[data-rating='" + rating + "']").click().length;
  var targetuser = (user === "" ? "Pikabu" : user);
  var rate = (rating == "up" ? "плюсы" : "минусы");
  window.rate = (rating == "up" ? "плюсы" : "минусы");
  if(clicked > 0){notifyUser(rate,clicked,targetuser);}
}

if(page.indexOf("/story/") >=0) {

/*jshint multistr: true */
$(".b-comment__user").children("a").children("span").each(function(){
  $(this).parent().before('<div style="margin-left: 5px; cursor:pointer; display:inline-block; width: 14px; height: 8px" class="i-sprite--comments__rating-up-active banhammer" data-rating="up" data-user="'+ $(this).html() +'" />\
  <div style="margin-right: 5px; cursor:pointer; display:inline-block; width: 14px; height: 8px" style="cursor:pointer" class="i-sprite--comments__rating-down-active banhammer" data-rating="down" data-user="'+ $(this).html() +'" />');
});
/*jshint multistr: true */
  $(".b-story-info__main").append($("<div style='display: inline-block' class='i-sprite_b-rating_up-active banhammer' data-rating='up' data-user='' />\
<div style='display: inline-block' class='i-sprite_b-rating_down-active banhammer' data-rating='down' data-user='' />"));

/*jshint multistr: true */
  $(".b-user-menu").append($("<div class='b-user-menu__main' style='margin-top: 8px;'>\
  <div class='b-user-menu__header'><a>Юзерлисты</a></div>\
  <ul class='b-user-menu-list'>\
  <li><span class='b-user-menu-list__icon i-sprite--users__menu-interested' /><a style='cursor:pointer' class='do-userlist autoup' data-action='up'>Отплюсовать whitelist</a></li>\
  <li><span class='b-user-menu-list__icon i-sprite--users__menu-interested' style='transform: rotate(180deg)' /><a style='cursor:pointer' class='do-userlist autodown' data-action='down'>Отминусить blacklist</a></li>\
  </ul></div>"));

$(".do-userlist").click(function(){
  var userlist = ($(this).data('action') == "up" ? whitelist : blacklist);
  for(var key in userlist){
    massVote(userlist[key],$(this).data('action'));
  }
});

$(".banhammer").click(function(){
  // FIXME: BUG: All comments takes vote for post
  massVote($(this).data('user'),$(this).data('rating'));
});

}

window.onbeforeunload = function(e) {
    if ($.active > 0) {
      return "Вы действительно хотите покинуть страницу? В очереди " + $.active + " запросов к серверу. Вероятно вы запустили кармомёт по большому количеству комментариев, и сейчас идёт выставление рейтинга. Вы действительно хотите покинуть страницу и отменить отправку " + window.rate + ": " + $.active + ". Это займёт примерно " + $.active * 1.5 + " секунд";
    }
};

// DANGER OPTIONS AND FUNCTIONS:
// al = 1 - enable autovote settings
// if al enabled aw = 1 enables whitelist, ab = 1  enables blacklist.
var al = 1;
var ab = 1;
var aw = 1;

if(al == 1){
  $("document").ready(function(){
    if(aw == 1){
     $(".autoup").trigger("click");
    }
    if(ab == 1){
     $(".autodown").trigger("click");
    }
  });
}
