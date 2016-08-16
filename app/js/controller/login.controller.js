/**
 * Created by Ben Dunbar on 6/22/16.
 */

(function() {
	angular
		.module("WHAM")
		.controller("LoginController", LoginController);

	function LoginController($location, $firebaseObject) {
		var vm = this;
		vm.message = "Login Controller";
		vm.therapistSubmit = therapistSubmit;

		function init() {
			//If moving to services. This init function should be used to retrieve initial data.
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