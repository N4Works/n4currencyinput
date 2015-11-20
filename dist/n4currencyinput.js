"use strict";

; (function (ng) {
    ng
        .module('n4CurrencyInput', [])
        .directive('n4CurrencyInput', [
            function () {
                return {
                    require: "ngModel",
                    restrict: "EAC",
                    replace: true,
                    template: "<input type=\"text\">",
                    link: function (scope, element, attrs, controller) {
                        var parseValue = function (value) {
                            var number = value.toString().trim().replace(/[^0-9]/g, "");
                            if (value !== number) {
                                controller.$setViewValue(number);
                                controller.$render();
                            }
                            return parseFloat(number.replace(/(\d+)(\d{2})/, '$1.$2'));
                        },
                            formatValue = function (value) {
                                if (!value) {
                                    return 'R$ 0.00';
                                }
                                var number = value.toString().trim().replace(/[^0-9]/g, "");
                                var float = parseFloat(number.replace(/(\d+)(\d{2})/, '$1.$2'));
                                return 'R$ ' + float.toFixed(2);
                            };

                        controller.$formatters.unshift(formatValue);

                        controller.$parsers.unshift(parseValue);

                        element.on("blur", function () {
                            element.val(formatValue(element.val()));
                        });

                        scope.$on("$destroy", function () {
                            element.off("blur");
                        });
                    }
                };
            }]);
} (angular))
