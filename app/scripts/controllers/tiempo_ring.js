'use strict';

/**
 * @ngdoc function
 * @name spiritDojoApp.controller:TiempoRingCtrl
 * @description
 * # TiempoRingCtrl
 * Controller of the spiritDojoApp
 */
angular.module('spiritDojoApp')
  .controller('TiempoRingCtrl', function($scope, $interval, $http, ngAudio) {
    $scope.sound = ngAudio.load("audio/chinese-gong-daniel_simon.mp3");
    $scope.segundo = new Date(1000);
    $scope.timers = null;
    $scope.tiempo_total = null;
    var contador = null;
    $scope.procesos = [];
    $scope.actual = null;

    $http.get('model/timers.json').then(function(data) {
      $scope.timers = data.data.timers;
    });

    var retroceder = function() {
      if ($scope.tiempo_total > 0) {
        $scope.tiempo_total -= $scope.segundo;
        $scope.actual = $scope.procesos[0];
        if ($scope.procesos[0].time > $scope.segundo) {
          $scope.procesos[0].time -= $scope.segundo;
        } else {
          $scope.sound.play();
          $scope.procesos.shift();
        }
      }
    };

    $scope.sumar_tiempos = function(timer) {
      var n = timer.time[0].num;
      var seg = 0;
      var prepare = timer.time[1].min * 60 + timer.time[1].seg;
      var round = timer.time[2].min * 60 + timer.time[2].seg;
      var warning = timer.time[3].min * 60 + timer.time[3].seg;
      var rest = timer.time[4].min * 60 + timer.time[4].seg;
      $scope.n = n;
      $scope.prepare = new Date(prepare * 1000);
      $scope.round = new Date(round * 1000);
      $scope.warning = new Date(warning * 1000);
      $scope.rest = new Date(rest * 1000);

      seg += prepare;
      seg += round * n;
      seg += rest * (n - 1);
      $scope.procesos.push({
        type: "prepare",
        time: new Date(prepare * 1000)
      });
      for (var i = 1; i < n; i++) {
        $scope.procesos.push({
          type: "round",
          time: new Date((round - warning) * 1000)
        });
        $scope.procesos.push({
          type: "warning",
          time: new Date(warning * 1000)
        });
        $scope.procesos.push({
          type: "rest",
          time: new Date(rest * 1000)
        });
      }
      $scope.procesos.push({
        type: "round",
        time: new Date((round - warning) * 1000)
      });
      $scope.procesos.push({
        type: "warning",
        time: new Date(warning * 1000)
      });
      $scope.tiempo_total = new Date(seg * 1000);
    };

    $scope.set_model = function(model) {
      $scope.sumar_tiempos(model);
    };
    $scope.comenzar = function() {
      contador = $interval(retroceder, 1000);
    };

  });
