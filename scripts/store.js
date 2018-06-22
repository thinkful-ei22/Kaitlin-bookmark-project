'use strict';

/* global $ */

console.log('store is linked');

const store = (function () {

  // add bookmark here
  const addBookmark = function(bookmark) {
    let bookmarks2 = Object.assign({expanded: false}, bookmark);
    this.bookmarks.push(bookmarks2);
  };
  // delete bookmark here

  const findAndDeleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  // search by min rating

  const filterThroughBookmarks = function(num) {
    store.bookmarks.filter((item) => item.rating >= num);
  };


  // toggle adding bookmark

  return {
    bookmarks: [],
    inputToggle: false,
    filter: 1,

    addBookmark,
    findAndDeleteBookmark,
    filterThroughBookmarks
  };
}());