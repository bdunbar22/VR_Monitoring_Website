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

        function init() {
            var username = $routeParams["uid"];
            fillUserDataPage(username);
        }
        init();

        /**
         * Populate the data page for a single patient when chosen by the therapist.
         *
         * param userId gives the id of the specific patient to be accessed
         */
        function fillUserDataPage(userId) {
            userId = userId.value;
            var therapistName = CurrentTherapistName;
            var myDataRef = new Firebase(FIREBASE_URL);

            myDataRef.on('value', function (snapshot) {
                //Get the patient
                var users = snapshot.val().userlist;
                var user;
                //Get the therapist object
                for (var i in users) {
                    if (users[i].id === userId) {
                        user = users[i];
                    }
                }

                //Get the therapist
                var therapists = snapshot.val().therapistlist;
                var therapist;
                //Get the therapist object
                for (var i in therapists) {
                    if (therapists[i].name === therapistName) {
                        therapist = therapists[i];
                    }
                }

                //PT title
                therapistContainer.append("<h2>Welcome " + therapist.name + "!</h2>");
                CurrentTherapistName = therapist.name;
                therapistContainer.append("<button class='btn btn-primary' ng-click='model.fillTherapistPage(" + CurrentTherapistName +
                    ")'>" + "Back</button><br>");

                //User data
                patientDataContainer.append(patientTemplate(user));

                //User graphs
                for (var i in user.exercises) {
                    var exercise = user.exercises[i];
                    createGraph(exercise, patientGraphContainer);
                }
            });
        }

        /**
         * Template building for the individual patients.
         *
         * template object has the following format. Shown by example
         *
         {
           "exercises" : [ {
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
           }, {
             "name" : "exercise2",
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
           } ],
           "id" : "user2",
           "name" : "test user2"
         }
         */
        function patientTemplate(patientObject) {
            var htmlContent = "";
            htmlContent += "<div class='patientInfoColumn well'>";
            //Patient Title
            htmlContent += "<h4>Name: " + patientObject.name + "</h4>";

            //Display Exercises
            //Each Exercise as a collapsible list of data.
            for (var i in patientObject.exercises) {
                var exercise = patientObject.exercises[i];
                htmlContent += "<h5>Exercise: " + exercise.name + "</h5>";

                //Occurances
                for (var j in exercise.occurance) {
                    var occurance = exercise.occurance[j];
                    htmlContent += "<h5 class='indentFive'>Occurance:</h5>";
                    htmlContent += "<p class='indentTen'>Dataset: " + occurance.dataset + "</p>";
                    htmlContent += "<p class='indentTen'>Date: " + occurance.date + "</p>";
                    htmlContent += "<p class='indentTen'>Duration: " + occurance.duration + "</p>";
                    htmlContent += "<p class='indentTen'>Feedback: " + occurance.feedback + "</p>";
                }
            }


            htmlContent += "</div>"
            return htmlContent;
        }

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
        function createGraph(exercise, patientGraphContainer) {
            var chartDivId = "chart_" + exercise.name;
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
    }
})();