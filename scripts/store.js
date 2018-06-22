'use strict';

/* global $ */

console.log('store is linked');

const store = (function () {

  // add bookmark here
  const addBookmark = function(bookmark) {
    bookmark.expanded = false;
    this.bookmarks.push(bookmark);
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

  const expandToggle = function (id) {
    // this.bookmarks.this.bookmarks.
    this.bookmarks.changeState('checked','!checked');
    console.log(this.bookmarks);
    this.bookmarks.expanded=!this.bookmarks.expanded;  
  };

  return {
    bookmarks: [],
    inputToggle: false,
    filter: 1,

    addBookmark,
    findAndDeleteBookmark,
    filterThroughBookmarks,
    expandToggle
  };
}());