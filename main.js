var config = {
    apiKey: "AIzaSyCcPFcbAjIsgXGQwE-A3AcOXkeD40qypE8",
    authDomain: "train-tracker.firebaseapp.com",
    databaseURL: "https://train-tacker.firebaseio.com",
    projectId: "train-tacker",
    storageBucket: "train-tracker.appspot.com",
  };

firebase.initializeApp(config);

var database = firebase.database();

//button for adding train
$("#submit").on("click", function(event){
    event.preventDefault();

    //Grabs User Input
    var trainName = $("#trainName-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTrain = $("#firstTrain-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    console.log("Train Name: ", trainName);
    console.log("Destination: ", trainDestination);
    console.log("First Train: ", trainFirstTrain);
    console.log("Frequency: ", trainFrequency);

    //temporary object to hold train information
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: trainFirstTrain,
        frequency: trainFrequency,
    };

    //push information to db
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train information successfully added");

    //Clearing out the text boxes
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

//create event for adding train to db and row in HTML when entry is added 
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //store everything as variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTrain = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;
    
    console.log("Train Name: ", trainName);
    console.log("Destination: ", trainDestination);
    console.log("First Train: ", trainFirstTrain);
    console.log("Frequency: ", trainFrequency);

    var firstTimeConverted = moment(trainFirstTrain, "HH:mm").subtract(1, "years");
    console.log("first time converted: ", firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);
    
    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
      var nextArrival = moment().add(tMinutesTillTrain, "minutes").format('LT');
      console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

//Create New Row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#train-table > tbody").append(newRow);
})

// function(errorObject) {
//   console.log("The read failed: " + errorObject.code);