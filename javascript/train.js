$( document ).ready(function() {
  
// initialize firebase


// trainame = name      destination = dest
// frequency = freq
//


submitBtn
  var config = {
    apiKey: "AIzaSyBhj7aOizmWo6Ph4pIjFRP6LzyrPDyDl3o",
    authDomain: "homework-7-e73f5.firebaseapp.com",
    databaseURL: "https://homework-7-e73f5.firebaseio.com",
    projectId: "homework-7-e73f5",
    storageBucket: "homework-7-e73f5.appspot.com",
    messagingSenderId: "805422567180"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

// a var to represent the database
 var database = firebase.database();

// button to submit the user given info
$("#submitBtn").on("click", function(event) {
  event.preventDefault(); //no button reset

  //set user input values to variables
  var trainName = $("#trainame").val().trim();

  var destination = $("#destination").val().trim();

  //converts user input to usable info
  var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");

  var frequency = $("#frequency").val().trim();
  
  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));

  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTime);
  // console.log(frequency);
  // console.log(currentTime);



  //gathers together all our new train info
  var newTrain = {

    train: trainName,
    trainOut: destination,
    trainIn: firstTime,
    interval: frequency
  };


  //uploads newTrain to firebase
  database.ref().push(newTrain);
  //*push* adds to info already in firebase. *set* overwrites preexisting info
  
  //clears elements before adding new text
  $("#trainame").val("");
  $("#destination").val("");
  $("#firstTime").val("");
  $("#frequency").val("");

  //supposed to prevent from moving to a new page... idk how
  //return false;

}); //end of onclick

//figure out what this does
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
    //store in variables
    var trainName = childSnapshot.val().train;
    var destination =childSnapshot.val().trainOut;
    var firstTime = childSnapshot.val().trainIn;
    var frequency = childSnapshot.val().interval;

//    console.log(trainName);
//    console.log(destination);
//    console.log(firstTime);
//    console.log(frequency);

    //makes first train time neater
    var trainTime = moment.unix(firstTime);
    console.log(trainTime);
    //calculate difference between times
    var difference = moment.utc(moment().diff(moment(trainTime,"DD/MM/YYYY HH:mm:ss"), "minutes"))
    console.log(difference)

    //time apart(remainder)
    var restAferLastTrain = difference % frequency;
    console.log(restAferLastTrain);

    //minutes until arrival
    var nextTrain = frequency - restAferLastTrain;

    //next arrival time
    var nextArrival = moment().add(nextTrain, "minutes").format('hh:mm');

    //adding info to DOM table 
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + nextTrain + "</td></tr>");
    console.log(nextArrival);
    console.log(nextTrain);

});
});


// var nextTrain = moment(frequency).diff(moment(restAferLastTrain),"minutes");









