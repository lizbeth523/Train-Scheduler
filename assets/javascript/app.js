$(document).ready( function() {
	// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyBfnmtnnE8xGEwdG7ZAlCB3_quHQxj1om0",
	    authDomain: "train-schedul-589bf.firebaseapp.com",
	    databaseURL: "https://train-schedul-589bf.firebaseio.com",
	    projectId: "train-schedul-589bf",
	    storageBucket: "train-schedul-589bf.appspot.com",
	    messagingSenderId: "330193806375"
	};
	firebase.initializeApp(config);

	var database = firebase.database();

	$("#btn-submit").on("click", function() {
	  	event.preventDefault();

	  	// Store info about the train into variables
	  	var trainName = $("#train_name").val().trim();
	  	var destination = $("#destination").val().trim();
	  	var startTime = $("#train-time").val().trim();
	  	var frequency = $("#frequency").val().trim();

	  	// Verify validity of time that was input by user
	  	if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]/.test(startTime)) {
	  		// Clear the input fields
		  	$("#train-name").val("");
		  	$("#destination").val("");
		  	$("#train-time").val("");
		  	$("#frequency").val("");

		  	// Create new train object
	  		var newTrain = {
		  		name: trainName,
		  		destination: destination,
		  		start: startTime,
		  		frequency: frequency
		  	};

		  	// Upload new train to the database
		  	// database.ref().push(newTrain);

		  	alert(true);
	  	}
	  	else {
	  		alert(false);
	  	}	  	
	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
		// console.log(childSnapshot.val());

	  	var trainName = childSnapshot.val().name;
	  	var destination = childSnapshot.val().destination;
	  	var nextArrival = childSnapshot.val().start;
	  	var frequency = childSnapshot.val().frequency;
	  	// Get the hours and minutes for the start time
	  	var startTimeArray = nextArrival.split(":");
	  	var minutesAway;

	  	// console.log(moment().hour(startTimeArray[0]).minute(startTimeArray[1]).format());

	  	// Set the next arrival to the current day at the start time
	  	nextArrival = moment().hour(startTimeArray[0]).minute(startTimeArray[1]).format("ddd MMM DD YYYY HH:mm");
	  	// Set minutesAway to the time difference in  minutes between the next arrival time and now
	  	minutesAway = moment().hour(startTimeArray[0]).minute(startTimeArray[1]).diff(moment(), 'minutes');

	  	// If the current time is after the start time, then set the next arrival to the next day at the start time
	  	if (moment().isAfter(nextArrival)) {
	  		nextArrival = moment().hour(startTimeArray[0]).minute(startTimeArray[1]).add(1, 'day').format("ddd MMM DD YYYY HH:mm");
	  		// Set minutesAway to the time difference in  minutes between the next arrival time and now
	  		minutesAway = moment().hour(startTimeArray[0]).minute(startTimeArray[1]).add(1, 'day').diff(moment(), 'minutes');
	  	}
	  		 

	  	// Create a new row to add to the schedule table
	  	var newRow = $("<tr>");
	  	newRow.append("<td>" + trainName + "</td>");
	  	newRow.append("<td>" + destination + "</td>");
	  	newRow.append("<td>" + frequency + "</td>");
	  	newRow.append("<td>" + nextArrival + "</td>");
	  	newRow.append("<td>" + minutesAway + "</td>");

	  	// Add the row to the table
	  	$("#schedule-table").append(newRow);
	});
});
