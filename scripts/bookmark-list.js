'use strict';

/* global $, store, api */

console.log('bookmark is linked');

const bookmarkList = (function (){

  // generate a bookmark element (html) to the page
  function generateBookmarkItem(bookmark) {
    return `
    <li class="js-bookmark-element col-3" data-bookmark-id="${bookmark.id}">
       
        <div class="miniBox">
        
        <div class="title">${bookmark.title}  <span class="bookmarkRating stars${bookmark.rating}"></span></div>
        
        
        </div>

        ${expandBookmark(bookmark)}
        
        <div class="formButtons">
          <button type="click" class="bookmark-delete js-bookmark-delete">Delete</button>
          <button type="click" class="bookmark-expand js-bookmark-expand">Details</button>
        </div>
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

  // validate input

  const validateBookmark = function(bookmark) {
    $('.error').remove;

    if (bookmark.title === '') {
      $('#bookmark-name').after('<span class="alert">This field is required!</alert>');
      // throw new TypeError('Title is required');
      console.log('Why is this not working');
    } 
    if (bookmark.url.length < 5) {
      $('#bookmark-name').after('<span class="alert">URL must be longer than 5 characters!</alert>');
    }
    if (!bookmark.url.includes('http')) {
      $('#bookmark-url').after('<span class="alert">URL must include http/https!</alert>');
    }
    if (bookmark.url === '') {
      $('#bookmark-url').after('<span class="alert">URL must be entered!</alert>');
    }
    return bookmark;
  };

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
      
      // validate
      const newDataObj = validateBookmark(dataObject);
      
      api.createBookmark(newDataObj, function(bookmark) {
        console.log('api response 2');
        store.addBookmark(bookmark);
        render();
      }, (err) => {
        $('#js-bookmark-name').after(`${err.responseJSON.message}`);
        console.log(err);
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

  

  function handleExpand() {
    $('ul').on('click', '.js-bookmark-expand', event => {
      event.preventDefault();
      const thisBook = getBookmarkIdFromElement(event.target);
      console.log(thisBook);

      store.bookmarks.map(bookmark => {
        if (bookmark.id === thisBook) {
          bookmark.expanded = !bookmark.expanded;
        } 
      });
      render();
    });
  }

  function expandBookmark(bookmark) {
    if (bookmark.expanded) {
      return `
      <div class="bookmark-details js-bookmark-details bookDesc" id="bookmark-details">${bookmark.desc}, </div>
      <div class="bookUrl"><a href="${bookmark.url}">visit the site!</a></div>
      `;
    } else {
      return '';
    }
  }


  // if/else -> error callbacks

  function handleValidateInputs() {
    $('#js-bookmark-list-form').submit( function(event) {
      event.preventDefault();
      console.log('forum submit');
    });
  }

  function bindEventListeners() {
    handleValidateInputs();
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