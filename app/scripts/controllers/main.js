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
    $scope.books = [
              { name: 'Hopscotch',
                author: 'Julio Cortazar',
                cover: 'images\\hopscotch.jpg',
                length: 576,
                year: 1966 },
              { name: 'Gravity\'s Rainbow',
                author: 'Thomas Pynchon',
                cover: 'images\\gravitysrainbow.jpg',
                length: 776,
                year: 1973 }
    ];
    $scope.getTotalPages = function($scope) {
      var totalLength = 0;
      for (var i = 0; i < $scope.books.length; i++) {
        totalLength += $scope.books[i].length;
      }
      return totalLength;
    };
  });
