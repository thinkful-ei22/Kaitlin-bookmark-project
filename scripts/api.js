'use strict';

/* global $ */

console.log('api is linked');

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/KBunn/bookmarks';

  const getBookmarks = function(callback) {
    $.getJSON( BASE_URL, callback);
  };

  // create a bookmark


  const createBookmark = function (data, callback) {
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: callback,
    //   error
    });
  };

    // patch a bookmark

  const patchBookmark = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      dataType: 'application/json',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: function (err) {
        console.log('ajax delete error', err);
      }
    });
  };

  // delete a bookmark

  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: function (err) {
        console.log('ajax delete error', err);
      }
    });
  };


  return {
    getBookmarks,
    createBookmark,
    patchBookmark,
    deleteBookmark

  };
}());