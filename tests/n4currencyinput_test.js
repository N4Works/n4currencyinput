"use strict";

describe('n4CurrencyInput', function()
{
  var $scope, $compile;

  beforeEach(module('n4CurrencyInput'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    spyOn($.fn, 'on').and.callThrough();
    spyOn($.fn, 'off').and.callThrough();
  }));

  describe('Creation', function() {
    it('Should be able to create directive by element', function() {
      var element = angular.element('<n4-currency-input data-ng-model="value"></n4-currency-input>');
      $compile(element)($scope);
      $scope.$apply();

      expect(angular.isDefined(element)).toBeTruthy();
      expect(element[0].tagName).toBe('INPUT');
      expect(element.on).toHaveBeenCalled();
    });

    it('Should be able to create directive by class', function() {
      var element = angular.element('<input class="n4-currency-input" data-ng-model="value">');
      $compile(element)($scope);
      $scope.$apply();

      expect(angular.isDefined(element)).toBeTruthy();
      expect(element[0].tagName).toBe('INPUT');
      expect(element.on).toHaveBeenCalled();
    });

    it('Should be able to create directive by attribute', function() {
      var element = angular.element('<input n4-currency-input="" data-ng-model="value">');
      $compile(element)($scope);
      $scope.$apply();

      expect(angular.isDefined(element)).toBeTruthy();
      expect(element[0].tagName).toBe('INPUT');
      expect(element.on).toHaveBeenCalled();
    });
  });
  
  describe('Functionality', function() {
    var element;

    beforeEach(inject(function() {
      element = $compile('<input class="n4-currency-input" currency="R$" data-ng-model="value">')($scope);
      $scope.$apply();
    }));

    it('Should be able to set a valid number as string', function() {
      $scope.value = '0123456789';
      $scope.$apply();
      expect(element.val()).toBe('R$ 1234567.89');
    });
    
    it('Should remove any non digit value inserted on the input', function() {
      element.val('01a2b3c4d5,6;7?.8^9/');
      element.trigger('change');
      $scope.$apply();
      $scope.$digest();
      expect($scope.value).toBe(1234567.89);
      expect(element.val()).toBe('0123456789');
      element.trigger('blur');
      expect(element.val()).toBe('R$ 1234567.89');
    });
    
    it('Should allow . caractere on the input', function() {
      element.val('1299');
      element.trigger('change');
      $scope.$apply();
      $scope.$digest();
      expect($scope.value).toBe(12.99);
      expect(element.val()).toBe('1299');
      element.trigger('blur');
      expect(element.val()).toBe('R$ 12.99');
    });
  });
  
  describe('Destruction', function() {
    var element;

    beforeEach(function() {
      element = angular.element('<input n4-currency-input="" data-ng-model="value">');
      $compile(element)($scope);
      $scope.$apply();
    });

    it('Should remove event listener on destroy', function() {
      $scope.$broadcast('$destroy');

      expect(element.off).toHaveBeenCalledWith('blur');
    });
  });
});
