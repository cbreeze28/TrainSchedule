//firebase config/api key
var config = {
    apiKey: "AIzaSyCJKS5xCVT7F7KvhqmAOK0vrjgYSsPUJnI",
    authDomain: "trainschedule-84f89.firebaseapp.com",
    databaseURL: "https://trainschedule-84f89.firebaseio.com",
    projectId: "trainschedule-84f89",
    storageBucket: "trainschedule-84f89.appspot.com",
    messagingSenderId: "181973669809"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#adminSubmit").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = { 
        name:   trainName,
        destination:    destination,
        firstTime:  firstTrain,
        frequency:  frequency,
};
database.ref().push(newTrain);

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");
    return false;
});

database.ref().on("child_added", function(childSnapShot, prevChildKey) {
    console.log(childSnapShot.val());
        
        var trainNameFire = childSnapShot.val().name;
        var destinationFire = childSnapShot.val().destination;
        var firstTrainFire = childSnapShot.val().firstTrain;
        var frequencyFire = childSnapShot.val().frequency;

    
        //lets do some math
        var diffTime = moment().diff(moment(firstTrainFire), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % frequencyFire;
        console.log(tRemainder);

        var tMinutesTillTrain = frequencyFire - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        $("#trainTable > tbody").append("<tr><td>" + trainNameFire + "</td><td>" + destinationFire + "</td><td>" + frequencyFire + "</td><td>" + nextTrain + "</td></td>" + tMinutesTillTrain + "</td></tr>");
    });
