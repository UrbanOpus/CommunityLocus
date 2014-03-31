app.directive('ngInitToolTip', function($timeout){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            $("[data-toggle=tooltip]").tooltip({html:true, title: scope.sub.calcDesc});
        }
    };
});