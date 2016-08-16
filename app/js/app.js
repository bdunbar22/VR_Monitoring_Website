/**
 * Created by Ben on 6/22/16.
 */

/* GLOBAL VARIABLE */
var FIREBASE_URL = 'https://amber-inferno-7571.firebaseio.com/';
//var FIREBASE_URL = 'https://burning-heat-5840.firebaseio.com/';


/**
 * This design patter is IIFE - Immediately Invoked Function Environment.
 */
(function () {
    angular.module("WHAM", ["ngRoute", "firebase"]);
})();