// LOAD DATA
// ===============================================================================

var friendsData = require("../data/friends");

// ROUTING
// ===============================================================================

module.exports = function(app) {
  
    // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // FRIEND FINDING LOGIC!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  app.post("/api/friends", function(req, res) {

    
    var friendFound = ["", 0, 0];
    
    for(var j = 0; j < friendsData.length; j++) {
        var unlikelyPoints = 0; // higher number is worse link to friendship
        for(var k = 0; k < 10; k++) { //Math.floor
            unlikelyPoints += Math.floor(parseFloat(friendsData[j].scores[k]) - parseFloat(req.body["scores[]"][k]));
        }
        if(unlikelyPoints < friendFound[1]) {
            friendFound[0] = friendsData[j].name;
            friendFound[1] = unlikelyPoints;
            friendFound[2] = j;
        }
        console.log(unlikelyPoints); // TEST
    }
    
    console.log(friendsData[friendFound[2]]); // TEST
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



// Complete, just need to change functionality