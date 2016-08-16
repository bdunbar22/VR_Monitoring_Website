/**
 * Created by Ben Dunbar on 6/22/16.
 */

(function() {
	angular
		.module("WHAM")
		.controller("PhysicalTherapistController", PhysicalTherapistController);

	function PhysicalTherapistController($scope, $location, $routeParams, $firebaseObject) {
		var vm = this;
		vm.therapist = '';
		vm.users = [];

		vm.message = "Physical Therapist Controller";
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
						var therapistRef = myDataRef.child('therapistlist/'+ i);
						var syncObject = $firebaseObject(therapistRef);
						syncObject.$bindTo($scope, "therapist");
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
			$location.url("/home/" + vm.therapist.name + "/user/" + user.id);
		}
	}
})();