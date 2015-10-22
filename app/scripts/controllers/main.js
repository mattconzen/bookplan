'use strict';

/**
 * @ngdoc function
 * @name bookPlanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookPlanApp
 */
angular.module('bookPlanApp')
  .controller('MainCtrl', function ($scope) {
    $scope.pagesPerDay = 14;
    $scope.books = [
              { title: 'Hopscotch',
                author: 'Julio Cortazar',
                cover: 'images\\hopscotch.jpg',
                pages: 576,
                year: 1966,
                shelf: 'reading'},
              { title: 'Gravity\'s Rainbow',
                author: 'Thomas Pynchon',
                cover: 'images\\gravitysrainbow.jpg',
                pages: 776,
                year: 1973,
                shelf: 'reading'},
              { title: 'Naked Lunch',
                author: 'William S. Burroughs',
                cover: 'images\\nakedlunch.jpg',
                pages: 411,
                year: 1966,
                shelf: 'to read'},
              { title: 'A Naked Singularity',
                author: 'Sergio De La Pava',
                cover: 'images\\nakedsingularity.jpg',
                pages: 652,
                year: 2011,
                shelf: 'to read' },
              { title: 'M Train',
                author: 'Patti Smith',
                cover: 'images\\mtrain.jpg',
                pages: 205,
                year: 2015,
                shelf: 'to read' },
              { title: 'Wolf in White Van',
                author: 'John Darnielle',
                cover: 'images\\wolfinwhitevan.jpg',
                pages: 652,
                year: 2011,
                shelf: 'to read' },
    ];


    $scope.currentList = $scope.books.filter(function (book){
      return (book.shelf === 'reading');
    });

    $scope.toReadList = $scope.books.filter(function (book){
      return (book.shelf === 'to read');
    });

    $scope.sortableOptions = {
      connectWith: '.card-list',
    };

    $scope.$watchCollection('books', function(newValue){
                    $scope.currentList = newValue.filter(function (book){ return book.shelf === 'reading';});
                    $scope.toReadList = newValue.filter(function (book){ return book.shelf === 'to read';});
                    $scope.books = newValue;
                    console.log($scope.currentList);
                    console.log($scope.toReadList);
                  });

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

    $scope.getTotalPagesByShelf = function(shelf) {
      var totalLength = 0;
      var books = $scope.getBooksByShelf(shelf);
      for (var i = 0; i < books.length; i++) {
        totalLength += books[i].pages;
      }
      return totalLength;
    };

    $scope.getDaysLeftByList = function(list){
      return Math.round($scope.getTotalPagesByList(list) / $scope.pagesPerDay);
    };

    $scope.getDaysLeftByShelf = function(shelf){
      return Math.round($scope.getTotalPagesByShelf(shelf) / $scope.pagesPerDay);
    };

    $scope.addBook = function() {
      $scope.books.push({title: $scope.book.title,
                        author: 'test',
                        cover: 'test.jpg',
                        year: '1900',
                        shelf: 'reading'
                      });
    };

    $scope.removeBook = function(index){
      $scope.books = $scope.books.filter(function(item) {
        return item.title !== index.title;
      });
    };
  });
