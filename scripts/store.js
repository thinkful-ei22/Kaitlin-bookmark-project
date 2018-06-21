'use strict';

/* global $ */

console.log('store is linked');

const store = (function () {

  // add bookmark here
  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };
  // delete bookmark here

  const findAndDeleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  // search by min rating

  // toggle adding bookmark

  return {
    bookmarks: [],
    inputToggle: false,
    filter: 1,

    addBookmark,
    findAndDeleteBookmark
  };
}());