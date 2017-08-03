var friends = require("../data/friends");

module.exports = function(app){


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
    
}