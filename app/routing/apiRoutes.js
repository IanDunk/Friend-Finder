// LOAD DATA
var friendsData = require("../data/friends");

// ROUTING
module.exports = function(app) {
  
  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });









  // NEEDS FIXING

  // API POST Requests and Friend Finding Logic
  // CHANGE TO SET TO RANDOM PICK IF TWO PEOPLE ARE EQUALLY AS LIKELY TO BE FRIENDS ****************************
  app.post("/api/friends", function(req, res) { 
    var friendFound = [50, 0];
    
    for(var j = 0; j < friendsData.length; j++) { // LOGIC MESSED UP ACTUALLY!!!
        // higher number is worse link to friendship
        var unlikelyPoints = 0;
        // WORKING
        for(var k = 0; k < 10; k++) {
            unlikelyPoints += Math.abs(parseFloat(friendsData[j].scores[k]) - parseFloat(req.body.scores[k])); // changed "scores[]"
        }
        // WORKING
        if(unlikelyPoints < friendFound[0]) {
            //friendFound[0] = friendsData[j].name; // DONT NEED
            friendFound[0] = unlikelyPoints;
            friendFound[1] = j;
        }
        console.log(unlikelyPoints); // TEST
    }

    // ADDING TO FRIENDS LIST -- ADD A VALIDATION !!!!!!!!!!!
    friendsData.push(req.body);
    res.json(friendsData[friendFound[1]]);
  });














  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });
};



// COMPLETE ******************
// JUST NEED TO ADD NEW FRIEND WHEN BUTTON CLICKED