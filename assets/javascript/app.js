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

	  	// Store info about the train that was input on the form into variables
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

		  	Upload new train to the database
		  	database.ref().push(newTrain);
	  	}
	  	else {
	  		alert(false);
	  	}

	  	

	  	console.log(trainName);
	  	console.log(destination);
	  	console.log(startTime);
	  	console.log(frequency);
	  	
	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	  	var x=2;
	});
});
