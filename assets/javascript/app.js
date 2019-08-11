var firebaseConfig = {
    apiKey: "AIzaSyBY0Jh3B4zYgHFFt623BhOo713XfSGTaUI",
    authDomain: "homework-7-27f87.firebaseapp.com",
    databaseURL: "https://homework-7-27f87.firebaseio.com",
    projectId: "homework-7-27f87",
    storageBucket: "",
    messagingSenderId: "224618162611",
    appId: "1:224618162611:web:9287150f26582991"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// console.log(firebase);


var database = firebase.database();


$("#add-train-btn").on("click", function (event) {
    // console.log('hello');

    event.preventDefault();

    //Grabs user input and stores in a variable
    var train = $("#train-name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var frequency = $("#freq-input").val().trim();
    var firstTime = $("#firstTrain-input").val().trim();

    //Creates local "temporary" object for holding employee data
    var trainInfo = {
        formtrain: train,
        formdestination: destination,
        formfrequency: frequency,
        formfirsttime: firstTime
    };

    //Uploads data to the database
    database.ref().push(trainInfo);

    //Logs everything to the console
    // console.log(trainInfo.formtrain);
    // console.log(trainInfo.formdestination);
    // console.log(trainInfo.formfrequency);
    // console.log(trainInfo.formfirsttime);
    // console.log(trainInfo.dateAdded);

    alert("Train Sucessfully Added");

    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#freq-input").val("");
    $("#firstTrain-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var train = childSnapshot.val().formtrain;
    var destination = childSnapshot.val().formdestination;
    var frequency = childSnapshot.val().formfrequency;
    var firstTime = childSnapshot.val().formfirsttime;

    // console.log(train);
    // console.log(destination);
    // console.log(frequency);
    // console.log(firstTime);


    // Assumptions
    var tFrequency = (frequency);
    // console.log(frequency);

    // Time is 3:30 AM
    var firstTime = (firstTime);
    // console.log(firstTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    var newRow = $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)


    );

    $("#train-table > tbody").append(newRow);

});