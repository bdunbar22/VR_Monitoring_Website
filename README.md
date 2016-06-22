VR_Monitoring_Website for WHAM
Welcome to the WHAM git repository!

Summary:

    This is the git repository for the WHAM website for VR Monitoring, an ongoing project of Enabling Engineering at
    Northeastern University. The project goal is to help Physical Therapists and Cerebral Palsy patients monitor the
    progress of the user during virtual reality game play. This will help the users to increase mobility in a non
    dominant arm.

Development information:

    The website uses Angular.js to help with templates and includes. It uses Firebase as a host server and database.
    Angular allows the html files to be stored as templates. The config.js file determines which template to add to the
    ng-view div on the indew page. The pages are hooked up to controller files, which currently handle interactions with
    the Firebase database and update the angular model (the variable vm in each controller) with the information needed
    at the given time. The templates are hooked up with angular so that they respond to the model (referred to as model
    in the templates). Bootstrap is loaded via cdn and can be used for styling. The graphs on the users data page are
     generated using the google charts library.

How to Deploy to Firebase:
    https://amber-inferno-7571.firebaseio.com/?page=Hosting

    The Firebase page Hosting site above shows how to deploy a website to firebase.
    I will summarize the steps here:
    1. Use a terminal window.
    2. Have node.js installed.
    3. $npm install -g firebase-tools OR $sudo npm install -g firebase-tools if required as administrator.
    4. cd into this directory (WHAM_Website)
    5. firebase init
    6. firebase deploy

    Note: You would need to login to a firebase account in this process.

Database:

    var FIREBASE_URL = 'https://burning-heat-5840.firebaseio.com/';
    var myDataRef = new Firebase(FIREBASE_URL);

    This sets up a connection to the database which will allow for operations with the hosted data.
    Please see the Firebase documentation for interacting with the database: https://www.firebase.com/docs/web/api/
    You can also look at the existing controller pages to see some examples.

Future Steps:

    Improvements can be made by future members of the WHAM team. These are some possible ways to improve the site in the
    future:
    - Make the database secure so that you need credentials to access the data.
    - Augment the physical therapist and user structures so that more information can be added and displayed.
    - Update the UI to allow for enhanced experience for the users.

Regards,
Ben Dunbar
