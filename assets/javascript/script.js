//Javascript Link Test
console.log("*** TRAIN SCHEDULER -- script.js attached! ***")

// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDm4oaygel7qMCpRXs5ywnY0MwXn8q1HDI",
    authDomain: "hw7-trainscheduer.firebaseapp.com",
    databaseURL: "https://hw7-trainscheduler.firebaseio.com",
    storageBucket: "hw7-trainscheduler.appspot.com"
  };
  
  firebase.initializeApp(config);
  

  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainFreq = moment($("#freq-input").val().trim(), "MM/DD/YYYY").format("X");
    var firstArrival = $("#first-arrival-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      frequency: trainFreq,
      arrival: firstArrival
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("freq-input").val("");
    $("#first-arrival-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().frequency;
    var firstArrival = childSnapshot.val().arrival;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(firstArrival);
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMonths = moment().diff(moment(trainStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var trainBilled = trainMonths * trainRate;
    console.log(trainBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainStartPretty),
      $("<td>").text(empMonths),
      $("<td>").text(empRate),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  