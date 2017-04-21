'use strict';

/**
 * @ngdoc function
 * @name spiritDojoApp.controller:NotificacionesCtrl
 * @description
 * # NotificacionesCtrl
 * Controller of the spiritDojoApp
 */
angular.module('spiritDojoApp')
  .controller('NotificacionesCtrl', function($scope, notificacion) {
    $scope.imagePath = 'images/yeoman.png';
    $scope.notificacion = notificacion;
  });
