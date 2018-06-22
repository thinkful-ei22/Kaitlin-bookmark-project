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
    
  };

  // function validateInputs() {
  //   $('#js-bookmark-list-form').click( function() {
  //     console.log('forum submit');
  //   });
  // }

  return {
    bookmarks: [],
    inputToggle: false,
    filter: 1,

    addBookmark,
    findAndDeleteBookmark,
    filterThroughBookmarks,
    expandToggle,
    // validateInputs
  };
}());