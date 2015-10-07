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
                year: 1966 },
              { title: 'Gravity\'s Rainbow',
                author: 'Thomas Pynchon',
                cover: 'images\\gravitysrainbow.jpg',
                pages: 776,
                year: 1973 }
    ];
    $scope.getTotalPages = function() {
      var totalLength = 0;
      for (var i = 0; i < $scope.books.length; i++) {
        totalLength += $scope.books[i].pages;
      }
      return totalLength;
    };
    $scope.getDaysLeft = function(){
      return Math.round($scope.getTotalPages() / $scope.pagesPerDay);
    };
  });
