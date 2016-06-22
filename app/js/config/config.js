/**
 * Created by Ben on 6/22/16.
 */

(function () {
    angular
        .module("WHAM")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "templates/physicalTherapistLogin.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/home/:ptid", {
                templateUrl: "templates/physicalTherapistHome.html",
                controller: "PhysicalTherapistController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "templates/physicalTherapistLogin.html",
                controller: "LoginController",
                controllerAs: "model"
            });
    }
})();