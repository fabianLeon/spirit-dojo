'use strict';

/**
 * @ngdoc overview
 * @name spiritDojoApp
 * @description
 * # spiritDojoApp
 *
 * Main module of the application.
 */
angular
  .module('spiritDojoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'afOAuth2',
    'treeControl',
    'ngMaterial',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ngStorage',
    'ngWebSocket',
    'angularMoment',
    'ui.utils.masks',
    'pascalprecht.translate',
    'ngAudio'
  ])
    .run(["amMoment", function(amMoment) {
      amMoment.changeLocale('es');
    }])
    .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("");
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/notificaciones', {
        templateUrl: 'views/notificaciones.html',
        controller: 'NotificacionesCtrl',
        controllerAs: 'notificaciones'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/tiempo_ring', {
        templateUrl: 'views/tiempo_ring.html',
        controller: 'TiempoRingCtrl',
        controllerAs: 'tiempoRing'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name spiritDojoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spiritDojoApp
 */
angular.module('spiritDojoApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('spiritDojoApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<br> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> about. </div> <div class=\"panel-body\"> <p> Ahora puede empezar a construir la vista de about. </p> </div> <div class=\"panel-footer\"> Panel Footer </div> </div>"
  );


  $templateCache.put('views/footer.html',
    "<footer> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-4 col-sm-6 footerleft\"> <div class=\"logofooter\"> Universidad Distrital Francisco José de Caldas</div> <p> Institución de Educación Superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional Adscrita a la Alcaldía Mayor de Bogotá Distrito Capital </p> <p><i class=\"fa fa-map-pin\"></i> Carrera 7 # 40B - 53 - Bogotá D.C. - Colombia</p> <p><i class=\"fa fa-phone\"></i> Teléfono (Colombia) : +57 3 323 9300</p> <p><i class=\"fa fa-envelope\"></i> E-mail : atencion@udistrital.edu.co</p> <p><i class=\"fa fa-handshake-o\"></i> Lunes a Viernes de 8:00 a.m. a 5:00 p.m.</p> <div class=\"logofooter\"> Redes Sociales</div> <div class=\"col-md-4\"> <a href=\"https://es-la.facebook.com/UniversidadDistrital/\" target=\"_blank\"> <i class=\"fa fa-facebook-square fa-3x\" aria-hidden=\"true\"></i> </a> </div> <div class=\"col-md-4\"> <a href=\"https://plus.google.com/106543869133961089207?hl=es\" target=\"_blank\"> <i class=\"fa fa-google-plus fa-3x\" aria-hidden=\"true\"></i></a> </div> <div class=\"col-md-4\"> <a href=\"https://plus.google.com/106543869133961089207?hl=es\" target=\"_blank\"> <i class=\"fa fa-twitter fa-3x\" aria-hidden=\"true\"></i></a> </div> </div> <div class=\"col-md-4 col-sm-6 paddingtop-bottom\"> <h6 class=\"heading7\">ENLACES UNIVERSITARIOS</h6> <ul class=\"footer-ul\"> <li ng-repeat=\"elemento in enlaces_universitarios\"> <a href=\"{{elemento.link}}\"> {{elemento.nombre}}</a> </li> </ul> </div> <div class=\"col-md-4 col-sm-6 paddingtop-bottom\"> <h6 class=\"heading7\">ENLACES DE INTERÉS</h6> <ul class=\"footer-ul\"> <li ng-repeat=\"elemento in enlaces_universitarios\"> <a href=\"{{elemento.link}}\"> {{elemento.nombre}}</a> </li> </ul> </div> </div> </div> </footer> <div class=\"copyright\"> <div class=\"container\"> <div class=\"col-md-6\"> <p>{{copyright}}</p> </div> <div class=\"col-md-6\"> <ul class=\"bottom_ul\"> <li ng-repeat=\"elemento in map\"> <a href=\"{{elemento.link}}\"> {{elemento.nombre}}</a> </li> </ul> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<br> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h3 class=\"page-header\"> {{ 'TITULO' | translate }} </h3> </div> <div class=\"panel-body\"> <p> {{ 'MENSAJE_INICIAL' | translate }} </p> </div> <div class=\"panel-footer\"> Panel Footer </div> </div>"
  );


  $templateCache.put('views/menu.html',
    "<nav class=\"navbar navbar-default navbar-static-top\" role=\"navigation\" style=\"margin-bottom: 0\"> <div class=\"navbar-header\"> <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\"> <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> <a class=\"navbar-brand\" ng-href=\"#/\">spiritDojoApp</a> </div> <div id=\"navbar\" class=\"navbar-collapse collapse in\"> <ul class=\"nav navbar-top-links navbar-right\"> <li ng-repeat=\"nivel_1 in menu_service\"> <a ng-if=\"nivel_1.Opciones === null\" ng-href=\"{{'#/' + nivel_1.Url}}\"> {{nivel_1.Nombre}} </a> </li> <li ng-repeat=\"nivel_1 in menu_service\" class=\"dropdown\"> <a ng-if=\"nivel_1.Opciones !== null\" ng-href=\"{{actual}}\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"> {{nivel_1.Nombre}} <b class=\"caret\"> </b> </a> <ul class=\"dropdown-menu\"> <li ng-repeat=\"nivel_2 in nivel_1.Opciones\"> <a ng-href=\"{{'#/' + nivel_2.Url}}\" ng-if=\"nivel_2.Opciones === null\"> {{nivel_2.Nombre}} </a> </li> <li class=\"dropdown dropdown-submenu\" ng-repeat=\"nivel_2 in nivel_1.Opciones\"> <a ng-href=\"{{actual}}\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" ng-if=\"nivel_2.Opciones !== null\"> {{nivel_2.Nombre}} </a> <ul class=\"dropdown-menu\"> <li ng-repeat=\"nivel_3 in nivel_2.Opciones\"> <a ng-href=\"{{'#/' + nivel_3.Url}}\" ng-if=\"nivel_3.Opciones === null\"> {{nivel_3.Nombre}} </a> </li> <li class=\"dropdown dropdown-submenu\" ng-repeat=\"nivel_3 in nivel_2.Opciones\"> <a ng-href=\"{{actual}}\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" ng-if=\"nivel_3.Opciones !== null\">{{nivel_3.Nombre}} </a> <ul class=\"dropdown-menu\"> <li ng-repeat=\"nivel_4 in nivel_3.Opciones\"> <a ng-href=\"{{'#/' + nivel_4.Url}}\"> {{nivel_4.Nombre}} </a></li> </ul> </li> </ul> </li> </ul> </li> <!-- /.dropdown Notifications--> <li class=\"dropdown\"> <a class=\"dropdown-toggle notificacion_vista\" data-toggle=\"dropdown\" ng-href=\"{{actual}}\" ng-if=\"notificacion.no_vistos() > 0\"> <i class=\"fa fa-bell fa-fw\"></i>{{notificacion.no_vistos()}} <i class=\"fa fa-caret-down\"></i> </a> <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" ng-href=\"{{actual}}\" ng-if=\"notificacion.no_vistos() == 0\"> <i class=\"fa fa-bell fa-fw\"></i> <i class=\"fa fa-caret-down\"></i> </a> <ul class=\"dropdown-menu dropdown-alerts\"> <li ng-repeat=\" notificacion in notificacion.log | limitTo:6\"> <a ng-href=\"{{'#' + actual}}\" ng-click=\"notificacion.viewed = true\"> <div> <i ng-if=\"! notificacion.viewed\" class=\"fa fa-comment fa-fw\"></i> <i ng-if=\"notificacion.viewed\" class=\"fa fa-check-circle\"></i> <strong>{{notificacion.user}}</strong> <span class=\"pull-right text-muted\"> <em><span am-time-ago=\"notificacion.date\"></span></em> </span> </div> <div ng-if=\"! notificacion.viewed\">{{notificacion.message | limitTo:100}} ...</div> <div ng-if=\"notificacion.viewed\">{{notificacion.message| limitTo:100}} ...</div> </a> </li> <li class=\"divider\"></li> <li> <a class=\"text-center\" ng-href=\"#/notificaciones\"> <strong>Ver todas las notificaciones</strong> <i class=\"fa fa-angle-right\"></i> </a> </li> </ul> <!-- /.dropdown --> </li><li class=\"dropdown\" ng-if=\"token_service.live_token()\"> <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" ng-href=\"{{menuCtrl.actual}}\"> <i class=\"fa fa-user fa-fw\"></i> <i class=\"fa fa-caret-down\"></i> </a> <ul class=\"dropdown-menu dropdown-user\"> <li> <a ng-click=\"\"> <i class=\"fa fa-sign-in fa-fw\"></i> {{token_service.token.name}}</a>  </li> <li><a><i class=\"fa fa-gear fa-fw\"></i> Settings</a> </li> <li class=\"divider\"></li> <li><a ng-click=\"token_service.logout()\"><i class=\"fa fa-sign-out fa-fw\"></i> Logout</a> </li> </ul> <!-- /.dropdown-user --> </li> <li ng-if=\"!token_service.live_token()\"> <oauth2 authorization-url=\"{{token_service.config.AUTORIZATION_URL}}\" client-id=\"{{token_service.config.CLIENTE_ID}}\" redirect-url=\"{{token_service.config.REDIRECT_URL}}\" response-type=\"{{token_service.config.RESPONSE_TYPE}}\" scope=\"{{token_service.config.SCOPE}}\" button-class=\"{{token_service.config.BUTTON_CLASS}}\"> </oauth2> </li> <!-- /.dropdown --> </ul> </div> <!-- /.navbar-header --> <!-- /.navbar-top-links --> <!-- /.navbar-static-side --> </nav> <ul class=\"breadcrumb\"> <li ng-repeat=\"option in breadcrumb\" ng-if=\"option === ''\" class=\"breadcrumb-item\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i>{{option}}</a> </li> <li ng-repeat=\"option in breadcrumb\" ng-if=\"$middle\" class=\"breadcrumb-item\"> <a href=\"#\">{{option}}</a> </li> <li ng-repeat=\"option in breadcrumb\" ng-if=\"$last\" class=\"breadcrumb-item active\"> {{option}} </li> <div class=\"pull-right\" style=\"margin-top:-6px\"> <a id=\"es\" name=\"es\" class=\"{{language.es}}\" ng-click=\"changeLanguage('es')\"> es</a> <a id=\"en\" mane=\"en\" class=\"{{language.en}}\" ng-click=\"changeLanguage('en')\"> en</a> </div> </ul>"
  );


  $templateCache.put('views/notificaciones.html',
    "<div class=\"container\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> notificaciones. </div> <div class=\"panel-body\"> <div class=\"row\"> <div class=\"col-md-8 col-md-offset-2\"> <div class=\"input-group\"> <span class=\"input-group-addon\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" ng-model=\"buscador\" placeholder=\"Filtrar Notificación\"> </div> </div> </div> <br> <md-content style=\"height: 500px\"> <md-subheader class=\"md-warn\">Notificaciones Pendientes</md-subheader> <div ng-repeat=\"m in notificacion.log | filter:{ $: buscador}\" ng-if=\"!m.viewed\"> <md-list-item class=\"md-3-line\" ng-click=\"m.viewed = true\"> <img ng-src=\"{{imagePath}}\" class=\"img-responsive img-thumbnail\" alt=\"No funciona\"> <div class=\"md-list-item-text\"> <h3>{{\"Usuario:\\t\" + m.user}}</h3> <p>{{\"Mensaje: \\t\" + m.message}}</p> <em><span am-time-ago=\"m.date\"></span></em> </div> </md-list-item> </div> <md-subheader class=\"md-primary\">Notificaciones Vistas</md-subheader> <div ng-repeat=\"m in notificacion.log | filter:{ $: buscador}\" ng-if=\"m.viewed\"> <md-list-item class=\"md-3-line\" ng-click=\"\"> <img ng-src=\"{{imagePath}}\" class=\"img-responsive img-thumbnail\" alt=\"No funciona\"> <div class=\"md-list-item-text\"> <h3>{{m.user}}</h3> <p>{{m.message}}</p> <em><span am-time-ago=\"m.date\"></span></em> </div> </md-list-item></div>  </md-content></div> </div> </div>"
  );


  $templateCache.put('views/tiempo_ring.html',
    "<div class=\"container\"> <div class=\"row\"> <div class=\"col-md-2\"> <input type=\"text\" class=\"total-time form-control\" value=\"{{n}}\" readonly> </div> <div class=\"col-md-2 prepare\"> <input type=\"text\" class=\"total-time form-control\" value=\"{{prepare | date :'mm:ss'}}\" readonly> </div> <div class=\"col-md-2 round\"> <input type=\"text\" class=\"total-time form-control\" value=\"{{round | date :'mm:ss'}}\" readonly> </div> <div class=\"col-md-2 warning\"> <input type=\"text\" class=\"total-time form-control\" value=\"{{warning | date :'mm:ss'}}\" readonly> </div> <div class=\"col-md-2 rest\"> <input type=\"text\" class=\"total-time form-control\" value=\"{{rest | date :'mm:ss'}}\" readonly> </div> </div> <div class=\"row\"> <div class=\"col-md-2\"> <div ng-repeat=\"t in timers\"> <button ng-click=\"set_model(t)\" class=\"btn btn-primary btn-lg btn-block\"> {{t.class}} </button> </div> <button ng-click=\"comenzar()\" class=\"btn btn-success btn-lg btn-block\"> Comenzar</button> <input type=\"text\" class=\"total-time form-control\" value=\"{{tiempo_total | date :'mm:ss'}}\" readonly> </div> <div class=\"{{ 'col-md-7 ' + actual.type}}\" ng-if=\"actual.type === 'round'\"> <input type=\"text\" class=\"time\" value=\"{{actual.time | date :'mm:ss'}}\" readonly> </div> <div class=\"{{ 'col-md-7 ' + actual.type}}\" ng-if=\"actual.type !== 'round'\"> <input type=\"text\" class=\"time\" value=\"{{actual.time | date :'mm:ss'}}\" readonly> </div> </div> </div>"
  );

}]);
