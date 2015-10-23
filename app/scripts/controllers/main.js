'use strict';

/**
 * @ngdoc function
 * @name bookPlanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookPlanApp
 */
angular.module('bookPlanApp')
  .controller('MainCtrl', function ($scope, $firebaseArray) {
    var ref = new Firebase("https://luminous-inferno-477.firebaseio.com");
    $scope.books = $firebaseArray(ref.child('books'));
    $scope.currentList = [];
    $scope.toReadList = [];

    function updateShelves(){
      console.log('shelves updated');
      $scope.currentList = $scope.books.filter(function (book){return book.shelf === 'reading';});
      $scope.toReadList = $scope.books.filter(function (book){return book.shelf === 'to read';});
    }

    //Firebase event handlers to update shelves when DB changes
    ref.on('value', updateShelves);
    $scope.books.$loaded(updateShelves);

    $scope.sortableOptions = {
      connectWith: '.card-list',
      update: function(e, ui){
        switch (true) {
          case e.target.classList.contains('toReadList'):
              for (var i = 0; i < $scope.books.length; i++) {
                if ($scope.books[i] === ui.item.sortable.model) {
                  $scope.books[i].shelf='to read';
                  $scope.books.$save(i);
                }
              }
              break;
          case e.target.classList.contains('readingList'):
              for (var h = 0; h < $scope.books.length; h++) {
                if ($scope.books[h] === ui.item.sortable.model) {
                  $scope.books[h].shelf='reading';
                  $scope.books.$save(h);
                }
              }
              break;
        }
      }
    };

    $scope.getBooksByShelf = function(shelf){
      var bookshelf=[];
      var books = $scope.books;
      for (var i = 0; i < books.length; i++){
        if (books[i].shelf === shelf) {
          bookshelf.push(books[i]);
        }
      }
      return bookshelf;
    };

    $scope.getTotalPagesByList = function(list) {
      var totalLength = 0;
      for (var i = 0; i < list.length; i++) {
        totalLength += list[i].pages;
      }
      return totalLength;
    };

    $scope.getDaysLeftByList = function(list){
      return Math.round($scope.getTotalPagesByList(list) / $scope.pagesPerDay);
    };

    $scope.addBook = function($item) {
      $scope.books.$add({title: $item.originalObject.volumeInfo.title,
                        author: $item.originalObject.volumeInfo.authors[0],
                        cover: $item.originalObject.volumeInfo.imageLinks.smallThumbnail,
                        year: $item.originalObject.volumeInfo.publishedDate,
                        pages: $item.originalObject.volumeInfo.pageCount,
                        shelf: 'reading'
                      }).then(updateShelves());
    };

    $scope.removeBook = function(item){
      $scope.books.$remove(item).then(function(){console.log('removed item'+item.title); updateShelves();});
    };
  });
