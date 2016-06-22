/**
 * Created by Ben Dunbar on 6/22/16.
 */

//var FIREBASE_URL = 'https://burning-heat-5840.firebaseio.com/';
(function() {
	angular
		.module("WHAM")
		.controller("PhysicalTherapistController", PhysicalTherapistController);

	function PhysicalTherapistController($location, $routeParams) {
		var vm = this;
		vm.message = "Physical Therapist Controller";
		var FIREBASE_URL = 'https://amber-inferno-7571.firebaseio.com/';
		vm.displayUser = displayUser;

		function init() {
			var username = $routeParams["ptid"];
			var myDataRef = new Firebase(FIREBASE_URL);

			myDataRef.on('value', function (snapshot) {
				//Get all therapists and patients
				var therapists = snapshot.val().therapistlist;
				var allPatients = snapshot.val().userlist;
				
				//Get the therapist object
				for (var i in therapists) {
					if (therapists[i].name === username) {
						vm.therapist = therapists[i];
					}
				}
				
				//The patients from the PT viewpoint
				var patients = vm.therapist.userlist;
				vm.users = [];

				//The patients from the DB info
				//Below goes to the users information and adds their specific info
				//Had to put here because of asynchronous aspects.
				for (var i in patients) {
					for (var j in allPatients) {
						if (allPatients[j].id === patients[i].uid) {
							vm.users.push(allPatients[j]);
						}
					}
				}
			});
		}
		init();
		
		function displayUser(user) {
			$location.url("user/" + user.id);
		}
	}
})();