angular.module('phone-format-br', []).filter('phoneFormatBr', function () {

  function _formatPhone(raw) {
    if (!(raw && (typeof raw === 'string' || raw instanceof String)))
      return '';

    var N = raw.length;
    var result = '';
    var f = raw.substring(0,4);
      if (N <= 3) {
        return raw;
      } else {
        if (N < 6) {
          return result = '(' + raw.substring(0,3) + ') ' + raw.substring(3,N);
        } else if (N == 6) {
          return result = '(' + raw.substring(0, 3) + ') ' + raw.substring(3, 6);
        } else if (N < 8) {
          return result = '(' + raw.substring(0, 3) + ') ' + raw.substring(3, 6) + ' ' + raw.substring(6,N);
        } else if (N == 8) {
          return result = '(' + raw.substring(0, 3) + ') ' + raw.substring(3, 6) + ' ' + raw.substring(6, 8) ;
        } else if (N < 10){
          return result = '(' + raw.substring(0, 3) + ') ' + raw.substring(3, 6) + ' ' + raw.substring(6, 8) + ' ' + raw.substring(8,N);
        } else if (N == 10){
          return result = '(' + raw.substring(0, 3) + ') ' + raw.substring(3, 6) + ' ' + raw.substring(6, 8) + ' ' + raw.substring(8, 10) ;
        }
      }
  };

  return _formatPhone;
}).directive('phoneValidator', ['$filter',function ($filter) {

  var formatPhoneBrFilter = $filter('phoneFormatBr');

  function _removeNonNumeric(str) {
    if (typeof str === 'string' || str instanceof String)
      return str.replace(/\D/g, '');

    return '';
  };

  function _applyFormat(str) {
    if (!str) return '';

    return formatPhoneBrFilter(_removeNonNumeric(str));
  };

  return {
    restrict: 'A',
    require: '^ngModel',
    scope: {
      ngModel: '='
    },
    link: function (scope, elem, attrs, ngModelController) {
      ngModelController.$parsers.push(function (data) {
        data = data || '';
        return _removeNonNumeric(data);
      });

      ngModelController.$formatters.push(function (data) {
        return _applyFormat(data);
      });

      elem.bind('keyup', function (e) {
        if (e.keyCode < 37 || e.keyCode > 40) {
          var currVal = elem.val();
          elem.val(_applyFormat(currVal));
        }
      });
    }
  };
}]);
