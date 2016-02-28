// ==UserScript==
// @name         Pikabu Raitmet (alfa edition)
// @namespace    http://pikabu.ru/
// @version      0.1a
// @description  Минусы и плюсы пачками. Лига лени, обновления в течениии времени.
// @author       kobl169
// @match        http://pikabu.ru/story/*
// @grant        none
// @license	 ANY
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(".b-comment__user").children("a").children("span").each(function(){
//  console.log($(this).html());
  $(this).parent().before('<a class="i-sprite--comments__rating-up banhammer" data-rating="up" data-user="'+ $(this).html() +'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><a class="i-sprite--comments__rating-down banhammer" data-rating="down" data-user="'+ $(this).html() +'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>');
})

$(".banhammer").click(function(){
  $("a:contains(" + $(this).data('user') + ")").parent().parent().find("li[data-rating='" + $(this).data('rating') + "']").click();
})

