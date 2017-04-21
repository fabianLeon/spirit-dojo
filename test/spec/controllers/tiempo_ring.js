'use strict';

describe('Controller: TiempoRingCtrl', function () {

  // load the controller's module
  beforeEach(module('spiritDojoApp'));

  var TiempoRingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TiempoRingCtrl = $controller('TiempoRingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TiempoRingCtrl.awesomeThings.length).toBe(3);
  });
});
