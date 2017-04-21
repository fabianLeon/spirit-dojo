'use strict';

/**
 * @ngdoc service
 * @name spiritDojoApp.token
 * @description
 * # token
 * Factory in the spiritDojoApp.
 */


// First, parse the query string
var params = {},
  queryString = location.hash.substring(1),
  regex = /([^&=]+)=([^&]*)/g,
  m;
while (!!(m = regex.exec(queryString))){
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
// And send the token over to the server
var req = new XMLHttpRequest();
// consider using POST so query isn't logged
var query = 'https://' + window.location.host + '?' + queryString;
//console.log(query);
req.open('GET', query, true);

req.onreadystatechange = function(e) {
    console.log(e);
  if (req.readyState === 4) {
    if (req.status === 200) {
      window.location = params.state;
    } else if (req.status === 400) {
      window.alert('There was an error processing the token.');
    } else {
      //alert('something else other than 200 was returned');
      //console.log(req);
    }

  }
};

angular.module('spiritDojoApp')
  .factory('token_service', ["$location", "$http", "$localStorage", function($location, $http, $localStorage) {
    var service = {
      local: $localStorage.$default(params),
      //session: $sessionStorage.default(params),
      header: null,
      token: null,
      //Configuracion de parametros identificacion unica oas-wso2
      /*
      config: {

        AUTORIZATION_URL: "https://wso2.intranetoas.udistrital.edu.co:9443/oauth2/authorize",
        CLIENTE_ID: "mEEMLpePonJ91jKYB_s8sbE8slQa",
        REDIRECT_URL:  "http://10.20.2.52/prototipo/app",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid profile email",
        BUTTON_CLASS: "btn btn-outline btn-primary btn-sm"
      },*/
      //Configuracion de parametros oidc unica google
      /*
      config: {
        AUTORIZATION_URL: "https://accounts.google.com/o/oauth2/v2/auth",
        CLIENTE_ID: "794841744026-6p2i7lmiho204r4li2bb1ektd7j9dbd4.apps.googleusercontent.com",
        REDIRECT_URL: "https://fabianleon.github.io/app",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid profile email",
        BUTTON_CLASS: "btn btn-outline btn-primary btn-sm"
      },*/

      live_token: function() {
        if (typeof service.local.id_token === 'undefined' || service.local.id_token === null) {
          return false;
        } else {
          service.header = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(service.local.id_token.split(".")[0]));
          service.token = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(service.local.id_token.split(".")[1]));
          return true;
        }
      },
      logout: function() {
        service.token = null;
        $localStorage.$reset();
        window.location = $location.absUrl();
      }
    };
    return service;
  }]);

'use strict';

/**
 * @ngdoc service
 * @name notificacionesApp.notificacion
 * @description
 * # notificacion
 * Factory in the notificacionesApp.
 */
 //10.20.0.254/notificacion_api/register?id=1&profile=admin

angular.module('spiritDojoApp')
  .factory('notificacion', ["$websocket", function($websocket) {
    var dataStream = $websocket("ws://localhost:8080/register?id=2&profile=admin");
    var log = [];
    dataStream.onMessage(function(message) {
      log.unshift(JSON.parse(message.data));
    });

    var methods = {
      id : -1,
      log: log,
      get: function() {
        dataStream.send(JSON.stringify({
          action: 'get'
        }));
      },
      no_vistos: function() {
        var j = 0;
        angular.forEach(methods.log, function(notificiacion) {
          if (!notificiacion.viewed) {
            j += 1;
          }
        });
        return j;
    }

    };
    return methods;
  }]);

'use strict';
/**
 * @ngdoc function
 * @name spiritDojoApp.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the spiritDojoApp
 */
angular.module('spiritDojoApp')
.controller('menuCtrl', ["$location", "$http", "$scope", "token_service", "notificacion", "$translate", function($location, $http, $scope, token_service, notificacion, $translate) {
    var paths = [];
    $scope.language = {
        es:"btn btn-primary btn-circle btn-outline active",
        en:"btn btn-primary btn-circle btn-outline"
    };
    $scope.notificacion = notificacion;
    $scope.actual = "";
    $scope.token_service = token_service;
    $scope.breadcrumb = [];
    $scope.menu_service = [{ //aqui va el servicio de el app de configuracion
      "Id": 2,
      "Nombre": "Tiempos en el Ring",
      "Url": "",
      "Opciones": [{
        "Id": 3,
        "Nombre": "Ring",
        "Url": "tiempo_ring",
        "Opciones": null
        }]
    }];

    var recorrerArbol = function(item, padre) {
      var padres = "";
      for (var i = 0; i < item.length; i++) {
        if (item[i].Opciones === null) {
          padres = padre + " , " + item[i].Nombre;
          paths.push({
            'path': item[i].Url,
            'padre': padres.split(",")
          });
        } else {
          recorrerArbol(item[i].Opciones, padre + "," + item[i].Nombre);
        }
      }
      return padres;
    };



    var update_url = function() {
      $scope.breadcrumb = [''];
      for (var i = 0; i < paths.length; i++) {
        if ($scope.actual === "/" + paths[i].path) {
          $scope.breadcrumb = paths[i].padre;
        } else if ('/' === $scope.actual) {
          $scope.breadcrumb = [''];
        }
      }
    };
    recorrerArbol($scope.menu_service, "");
    paths.push({padre:["","Notificaciones","Ver Notificaciones"],path:"notificaciones"});

    $scope.$on('$routeChangeStart', function(next, current) {
      $scope.actual = $location.path();
      update_url();
      console.log(next + current);
    });

    $scope.changeLanguage = function (key){
        $translate.use(key);
        switch (key) {
            case 'es':
                $scope.language.es = "btn btn-primary btn-circle btn-outline active";
                $scope.language.en = "btn btn-primary btn-circle btn-outline";
                break;
            case 'en':
                $scope.language.en = "btn btn-primary btn-circle btn-outline active";
                $scope.language.es = "btn btn-primary btn-circle btn-outline";
                break;
            default:
        }
    };
    //Pendiente por definir json del menu
    (function($) {
      $(document).ready(function() {
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).parent().siblings().removeClass('open');
          $(this).parent().toggleClass('open');
        });
      });
    })(jQuery);
  }]);

'use strict';

angular.module('spiritDojoApp')
.controller("footerCtrl", ["$scope", function($scope) {
    //var ctrl = this;
    $scope.enlaces_universitarios = [{
      nombre: "Transparencia",
      link: "#/"
    }, {
      nombre: "Normatividad",
      link: "#/"
    }, {
      nombre: "Trámites",
      link: "#/"
    }, {
      nombre: "General",
      link: "#/"
    }, {
      nombre: "Docente",
      link: "#/"
    }, {
      nombre: "Académica Estudiantil ",
      link: "#/"
    }, {
      nombre: "Derechos Pecuniarios",
      link: "#/"
    }, {
      nombre: "Sistema de Notificaciones",
      link: "#/"
    }, {
      nombre: "CSU",
      link: "#/"
    }, {
      nombre: "PIGA",
      link: "#/"
    }, {
      nombre: "Bitácora",
      link: "#/"
    }, {
      nombre: "Noticias anterioresg",
      link: "#/"
    }, {
      nombre: "Área de Red UDNet",
      link: "#/"
    }, {
      nombre: "Administración PWI",
      link: "#/"
    }];
    $scope.copyright = "© Copyright 1995 - 2017 - Todos los Derechos Reservados ...";
    $scope.map = [{
      nombre: "Preguntas Frecuentes",
      link: "#/"
    }, {
      nombre: "Mapa del Porta",
      link: "#/"
    }, {
      nombre: "Política de Privacidad",
      link: "#/"
    }];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name spiritDojoApp.controller:NotificacionesCtrl
 * @description
 * # NotificacionesCtrl
 * Controller of the spiritDojoApp
 */
angular.module('spiritDojoApp')
  .controller('NotificacionesCtrl', ["$scope", "notificacion", function($scope, notificacion) {
    $scope.imagePath = 'images/yeoman.png';
    $scope.notificacion = notificacion;
  }]);

"use strict";

/**
 * @ngdoc function
 * @name spiritDojoApp.decorator:TextTranslate
 * @description
 * # TextTranslate
 * Decorator of the spiritDojoApp
 */
var text_es = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Ahora puede comenzar con el desarrollo ...",
};

var text_en = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Now get to start to develop ..."
};

angular.module('spiritDojoApp')
  .config(["$translateProvider", function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  }]);

'use strict';

/**
 * @ngdoc function
 * @name spiritDojoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the spiritDojoApp
 */
angular.module('spiritDojoApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name spiritDojoApp.controller:TiempoRingCtrl
 * @description
 * # TiempoRingCtrl
 * Controller of the spiritDojoApp
 */
angular.module('spiritDojoApp')
  .controller('TiempoRingCtrl', ["$scope", "$interval", "$http", "ngAudio", function($scope, $interval, $http, ngAudio) {
    $scope.sound = ngAudio.load("audio/chinese-gong-daniel_simon.mp3");
    $scope.segundo = new Date(1000);
    $scope.timers = null;
    $scope.tiempo_total = null;
    var contador = null;
    $scope.procesos = [];
    $scope.actual = null;

    $http.get('scripts/timers.json').then(function(data) {
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

  }]);
