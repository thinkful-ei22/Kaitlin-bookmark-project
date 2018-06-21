'use strict';

/* global $, bookmarkList, api, store */

console.log('index is linked');

$(document).ready(function() {
  console.log('Ready!');
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  // $(alert('jQuery and JavaScript are connected!'));

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  });
});