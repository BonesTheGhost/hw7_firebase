//Javascript Link Test
console.log("*** TRAIN SCHEDULER -- script.js attached! ***")

var trainFreq = 0;
var firstArrival = "00:00";


function calculateMinutesAway(trainFreq, firstArrival) {
    // Assumptions
    //var trainFreq = 0;

    //DEFAULT TIME
    //var firstArrival = "00:00";

    console.log("Train Frequency in Minutes: ", trainFreq);
    console.log("Initial Arrival Time: ", firstArrival)

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstArrival, "HH:mm").subtract(1, "years");
    console.log("First Time COnverted: ", firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    console.log(nextTrain);
    return tMinutesTillTrain
}

function calculateArrivalTime(trainFreq, firstArrival) {
    // Assumptions
    //var trainFreq = 0;

    //DEFAULT TIME
    //var firstArrival = "00:00";

    console.log("Train Frequency in Minutes: ", trainFreq);
    console.log("Initial Arrival Time: ", firstArrival)

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstArrival, "HH:mm").subtract(1, "years");
    console.log("First Time COnverted: ", firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var currentArrival = moment(nextTrain).format("hh:mm");

    console.log(nextTrain);
    return currentArrival;
}






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
    authDomain: "hw7-trainscheduler.firebaseapp.com",
    databaseURL: "https://hw7-trainscheduler.firebaseio.com",
    projectId: "hw7-trainscheduler",
    storageBucket: "",
    messagingSenderId: "718008007220",
    appId: "1:718008007220:web:7b3aafedbfcfe91dd2e861"
};


firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstArrival = $("#first-arrival-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    //for testing purposes
    //firstArrival = "12:00";

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        arrival: firstArrival,
        frequency: trainFreq,
    };



    console.log("NEW TRAIN: ", newTrain)
    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.arrival);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#freq-input").val("");
    $("#first-arrival-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().frequency;
    var firstArrival = childSnapshot.val().arrival;

    var minutesAway = calculateMinutesAway(trainFreq, firstArrival);
    var arrivalTime = calculateArrivalTime(trainFreq, firstArrival);

    

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(arrivalTime);
    console.log(minutesAway);


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(arrivalTime),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
