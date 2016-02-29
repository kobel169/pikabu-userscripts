// ==UserScript==
// @name         Pikabu Karmamet
// @namespace    http://pikabu.ru/
// @version      0.2
// @description  Минусы и плюсы пачками.
// @author       kobl169
// @match        http://pikabu.ru/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';


var page=$(location).attr('href');
if(page.indexOf("/story/") >=0) {

  $(".b-comment__user").children("a").children("span").each(function(){
    $(this).parent().before('<div style="margin-left: 5px; cursor:pointer; display:inline-block; width: 14px; height: 8px" class="i-sprite--comments__rating-up-active banhammer" data-rating="up" data-user="'+ $(this).html() +'" /><div style="margin-right: 5px; cursor:pointer; display:inline-block; width: 14px; height: 8px" style="cursor:pointer" class="i-sprite--comments__rating-down-active banhammer" data-rating="down" data-user="'+ $(this).html() +'" />');
  })

  $(".banhammer").click(function(){
   var clicked = $("a:contains(" + $(this).data('user') + ")").parent().parent().find("li[data-rating='" + $(this).data('rating') + "']").click().length
   var user = $(this).data('user')
   var rate = $(this).data('rating') == "up" ? "плюсы" : "минусы"
   Notification.requestPermission(function (permission) {
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }
    if (permission === "granted") {
      var notification = new Notification('Pikabu Karmamet', {body: '' + rate + ': ' + clicked + ' пользователю ' + user + '', icon: 'http://cs.pikabu.ru/images/def_avatar/def_avatar_100.png'});
    }
  })
  })
 };
