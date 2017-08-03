var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

var friends = [
    {
         name: "Amanda",
         photo: "http://i.imgur.com/efd8cya.jpg",
         survey: [5, 5, 1, 2, 3, 4, 1, 1, 5, 1]
     },
     {
         name: "Nick",
         photo: "http://i.imgur.com/efd8cya.jpg",
         survey: [3, 3, 2, 2, 4, 3, 2, 4, 3, 2]
     },
     {
         name: "Matt",
         photo: "http://i.imgur.com/efd8cya.jpg",
         survey: [1, 3, 3, 1, 2, 2, 3, 4, 1, 5]
     },
     {
         name: "Jessie",
         photo: "http://i.imgur.com/efd8cya.jpg",
         survey: [5, 1, 5, 2, 3, 3, 2, 1, 5, 3]
     }
];


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/assets",express.static(path.join(__dirname, "app/public")));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
  res.json(friends);
});

app.post("/api/new", function(req, res) {
  	var newSurvey = req.body;
    var lowestFriend;
    var hold;
    
    for(var i = 0; i < friends.length; i++){
        var total = 0;
        for(var j = 0; j < newSurvey.survey.length; j++){
            total = total + Math.abs(newSurvey.survey[j] - friends[i].survey[j]);
            console.log(i + ": " + total);
        }
        if(hold == undefined || hold > total){
            hold = total;
            lowestFriend = i;
        }
        
    }
  	console.log(friends[lowestFriend]);

  	res.json(friends[lowestFriend]);
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
