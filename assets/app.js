// var firebaseConfig = {
//     apiKey: "AIzaSyBEYpJHJBkRq2gmG9xEwYPSZmeX9mUpUNo",
//     authDomain: "jtwheat-b989b.firebaseapp.com",
//     databaseURL: "https://jtwheat-b989b.firebaseio.com",
//     projectId: "jtwheat-b989b",
//     storageBucket: "jtwheat-b989b.appspot.com",
//     messagingSenderId: "900933981143",
//     appId: "1:900933981143:web:612ee4f1a1a0486dcb3192",
//     measurementId: "G-D2H1J8KEK5"
//   };

//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
//     firebase.analytics();

    // Initialize Firebase
$("#update") .on("click", function(){document.location.reload(true);
})
var firebaseConfig = {
    apiKey: "AIzaSyBEYpJHJBkRq2gmG9xEwYPSZmeX9mUpUNo",
    authDomain: "jtwheat-b989b.firebaseapp.com",
    databaseURL: "https://jtwheat-b989b.firebaseio.com",
    projectId: "jtwheat-b989b",
    storageBucket: "jtwheat-b989b.appspot.com",
    messagingSenderId: "900933981143",
    appId: "1:900933981143:web:612ee4f1a1a0486dcb3192",
    measurementId: "G-D2H1J8KEK5"
  };
  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();
  
  // submit button
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // variables for the user Input
    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var trnStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trnFrequency = $("#frequency-input").val().trim();
    console.log(trnStart);
  
    //creates new data
    var newTrn = {
      name: trnName,
      destination: trnDestination,
      start: trnStart,
      frequency: trnFrequency
    };
  
    // sends to my firebase
    database.ref().push(newTrn);
  
    // tes
    console.log(newTrn.name);
    console.log(newTrn.destination);
    console.log(newTrn.start);
    console.log(newTrn.frequency);
  
    alert("train successfully added");
  
    // clears the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // converts firebase data to html on DOM
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    //Train variables
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnStart = childSnapshot.val().start;
    var trnFrequency = childSnapshot.val().frequency;
  
    // test
    console.log(trnName);
    console.log(trnDestination);
    console.log(trnStart);
    console.log(trnFrequency);


    var trnStartConverted = moment(trnStart, "HH:mm");
    console.log(trnStartConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trnStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trnFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trnFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
    // // Prettify the train start
    var trnStartPretty = moment.unix(trnStart).format("HH:mm");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trnName),
      $("<td>").text(trnDestination),
      $("<td>").text(trnFrequency + "  minutes"),
      $("<td>").text (trnStartPretty),
      $("<td>").text(tMinutesTillTrain+ "  minutes"),
      $("<td>").text(moment(nextTrain).format("HH:mm"))
      
    );
    
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });