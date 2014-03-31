app.config(function ($locationProvider, $routeProvider, $compileProvider) {

  //$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//    $locationProvider.html5Mode(true);
    $routeProvider

        .when("/score", {templateUrl: "partials/score.html"})
        .when("/search", {templateUrl: "partials/search.html"})
        .when("/list", {templateUrl: "partials/listview.html"})
        .when("/item/:id", {templateUrl: "partials/item.html"})
        .otherwise({redirectTo: "/map"});
});