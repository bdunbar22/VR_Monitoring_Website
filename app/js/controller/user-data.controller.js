/**
 * Created by Ben Dunbar on 6/22/16.
 */

//var FIREBASE_URL = 'https://burning-heat-5840.firebaseio.com/';
(function() {
    angular
        .module("WHAM")
        .controller("UserDataController", UserDataController);

    function UserDataController($location, $routeParams) {
        var vm = this;
        vm.message = "User Data Controller";
        var FIREBASE_URL = 'https://amber-inferno-7571.firebaseio.com/';
        vm.createGraph = createGraph;
        vm.therapistPage = therapistPage;

        function init() {
            var username = $routeParams["uid"];
            var therapistId = $routeParams["ptid"];
            var myDataRef = new Firebase(FIREBASE_URL);

            myDataRef.on('value', function (snapshot) {
                //Get the patient
                var users = snapshot.val().userlist;
                //Get the therapist object
                for (var i in users) {
                    if (users[i].id === username) {
                        vm.user = users[i];
                    }
                }

                //Get the therapist
                var therapists = snapshot.val().therapistlist;
                //Get the therapist object
                for (var i in therapists) {
                    if (therapists[i].id === therapistId) {
                        vm.therapist = therapists[i];
                    }
                }

                //User graphs
                for (var i in user.exercises) {
                    var exercise = user.exercises[i];
                    createGraph(exercise);
                }
            });
        }
        init();
        
        /**
         * Create a graph of score vs. date for an exercise.
         * Score is an integer
         * date is in format mm/dd/yyyy
         *
         * Exercise object format:
         * {
		  "name" : "riverraft",
		  "occurance" : [ {
			"dataset" : "",
			"date" : "",
			"duration" : "",
			"feedback" : ""
		  }, {
			"dataset" : "",
			"date" : "",
			"duration" : "",
			"feedback" : ""
		  } ]
		}
         */
        function createGraph(exercise) {
            var chartDivId = "chart_" + exercise.name;
            var patientGraphContainer = $("graphColumn");
            patientGraphContainer.append("<div id='" + chartDivId + "' class='exerciseChart'></div>")


            google.charts.setOnLoadCallback(drawColumnChart);

            /**
             * Creating the chart.
             */
            function drawColumnChart() {
                var data = new google.visualization.DataTable(
                    {
                        cols: [{id: 'date', label: 'Date', type: 'string'},
                            {id: 'score', label: 'Score', type: 'number'}]
                    }
                );

                //Occurances (rows in data)
                for (var j in exercise.occurance) {
                    var occurance = exercise.occurance[j];
                    data.addRow([occurance.date, occurance.dataset]);
                }

                var options = {
                    title: 'Scores for Exercise: ' + exercise.name,
                    hAxis: {
                        title: 'Date of Occurance',
                    },
                    vAxis: {
                        title: 'Score'
                    },
                    colors: ['#FF6600']
                };

                var chart = new google.visualization.ColumnChart(
                    document.getElementById(chartDivId));

                chart.draw(data, options);
            }
        }
        
        function therapistPage() {
            $location.url("/home/" + vm.therapist.id);
        }
    }
})();