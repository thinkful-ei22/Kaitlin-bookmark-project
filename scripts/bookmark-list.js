'use strict';

/* global $, store, api */

console.log('bookmark is linked');

const bookmarkList = (function (){

  // generate a bookmark element (html) to the page
  function generateBookmarkItem(bookmark) {
    return `
    <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
        <div class="miniBox">${bookmark.title}, 
        ${bookmark.rating}
        </div>
        ${bookmark.desc}, <a href="${bookmark.url}">visit the site!</a>

        <button type="click" class="bookmark-delete js-bookmark-delete">Delete</button>
        <button type="click" class="bookmark-expand js-bookmark-expand">Details</button>
    </li>`;
  }

  // generate a string from the elements
  function generateBookmarkItemString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkItem(bookmark));
    return bookmarks.join('');
  }

  // render the page
  function render(filteredList = null) {
    let bookmarks = store.bookmarks;

    if (filteredList !== null) {
      bookmarks = filteredList;
      console.log(filteredList);
    }
    console.log(store);
    // render bookmark list in the DOM
    console.log('`render` ran');
    const bookmarkListString = generateBookmarkItemString(bookmarks);
    // insert the HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListString);
  }

  // fn extend

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });
  
  // adding Toggle

  function addingBookmark() {
    $('#addingButton').click(function(event){
      event.preventDefault();
      console.log('adding button clicked!');
      $('.inputGroup').slideToggle(1000, 'linear');
    });
  }

  // handleNewBookmarkSubmit

  function handleNewBookmarkSubmit() {
    $('#js-bookmark-list-form').on('submit', function(event) {
      event.preventDefault();
      const dataObject = {
        title: event.target.title.value,
        url: event.target.url.value,
        desc: event.target.desc.value,
        rating: event.target.rating.value
      };
      console.log(dataObject);
      $('.js-shopping-list-entry').val(''); // clear the inputs!!!! CLEAR THEM!
      api.createBookmark(dataObject, function() {
        console.log('api response 2');
        store.addBookmark(dataObject);
        render();
      });
    });
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark).closest('li').attr('data-bookmark-id');
  }

  // handleDeleteBookmarkClicked

  function handleDeleteBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      console.log('delete button clicked');
      // get index of item in store
      const bookId = getBookmarkIdFromElement(event.currentTarget);
      console.log(bookId);
      // delete the item
      api.deleteBookmark(bookId, function() {
        console.log('api response');
        store.findAndDeleteBookmark(bookId);
        render();
      });
    });
  }

  // handle filter by stars

  function handleFilterByStars() {
    $('#filterValueButton').on('click', event => {
      event.preventDefault();
      console.log('filter button clicked!');
      const starNumber = $('#pickRatings').val();
      console.log(starNumber);
      const filteredList = store.bookmarks.filter((item) => item.rating >= starNumber);
      render(filteredList);
    });
  }

  function expandToggle(id) {
    let bookmark = this.findById(id);
    bookmark.expanded=!bookmark.expanded;  
  }

  function handleExpand() {
    $('ul').on('click', '.js-bookmark-expand', event => {
      event.preventDefault();
      const bookId = getBookmarkIdFromElement(event.currentTarget);
      // console.log(bookId);

      // toggle expand in bookmark
      expandToggle(bookId);

      console.log();
      render();
    });
  }

  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleFilterByStars();
    addingBookmark();
    handleExpand();
  }

  return {
    render, bindEventListeners
  };
}());