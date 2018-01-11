// LOAD DATA
var friendsData = require("../data/friends");

// ROUTING
module.exports = function(app) {
  
  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests and Friend Finding Logic
  // CHANGE TO SET TO RANDOM PICK IF TWO PEOPLE ARE EQUALLY AS LIKELY TO BE FRIENDS ****************************
  app.post("/api/friends", function(req, res) { 
    var friendFound = ["", 0, 0];
    
    for(var j = 0; j < friendsData.length; j++) {
        // higher number is worse link to friendship
        var unlikelyPoints = 0;
        for(var k = 0; k < 10; k++) {
            unlikelyPoints += Math.floor(parseFloat(friendsData[j].scores[k]) - parseFloat(req.body["scores[]"][k]));
        }
        if(unlikelyPoints < friendFound[1]) {
            friendFound[0] = friendsData[j].name;
            friendFound[1] = unlikelyPoints;
            friendFound[2] = j;
        }
        //console.log(unlikelyPoints); // TEST
    }

    res.json(friendsData[friendFound[2]]);
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