/**
 * Created by Ben Dunbar on 6/22/16.
 */

//var FIREBASE_URL = 'https://burning-heat-5840.firebaseio.com/';
(function() {
	angular
		.module("WHAM")
		.controller("LoginController", LoginController);

	function LoginController($location) {
		var vm = this;
		vm.message = "Login Controller";
		var FIREBASE_URL = 'https://amber-inferno-7571.firebaseio.com/';
		vm.therapistSubmit = therapistSubmit;

		function init() {
			//If moving to services. This init function should be used to retreive initial data.
		}
		init();

		/*
		 * Allow for physical therapist users to login to see their patients'
		 * data.
		 */
		function therapistSubmit(username) {
			var myDataRef = new Firebase(FIREBASE_URL);
			var physicalTherapistsRef = myDataRef.child("therapistlist");
			var $failMessage = $("#hiddenLoginMessage");
			$failMessage.addClass("hidden");
			physicalTherapistsRef.once("value", function (snapshot) {
				var therapists = snapshot.val();
				var found = false;
				for (var i in therapists) {
					if (therapists[i].name == username) {
						found = true;
						$location.url("home/" + username);
					}
				}
				if(!found) {
					$failMessage.removeClass("hidden");
				}
			});
		}
	}
})();