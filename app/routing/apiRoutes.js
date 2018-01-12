// LOAD DATA
var friendsData = require("../data/friends");

// ROUTING
module.exports = function(app) {
  
  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests and Friend Finding Logic
  // ADD A VALIDATION IN FUTURE...
  app.post("/api/friends", function(req, res) { 
    
    // Most related friend placeholder
    var friendFound = [50, 0];
    
    // cycles through each friend and compares it to the user input object
    for(var j = 0; j < friendsData.length; j++) {
        
        // higher number is worse link to friendship
        var unlikelyPoints = 0;
        
        // Calculates how many points the user has against the friend they're being compared to
        for(var k = 0; k < req.body.scores.length; k++) {
            unlikelyPoints += Math.abs(parseFloat(friendsData[j].scores[k]) - parseFloat(req.body.scores[k])); // changed "scores[]"
        }
        
        // If equal matches, pick a random one to keep
          //  Unfortunatly this method will eventually lose the friends from the top
          //  due to too many chances being 'rolled', especially if this program is used by 
          //  millions of people with many having the same question answers.
          //  Replace in the future. Ok on small scale. 
        if(unlikelyPoints <= friendFound[0]) {
            if(unlikelyPoints === friendFound[0]) {
              if(Math.random() < 0.5) {
                friendFound[0] = unlikelyPoints;
                friendFound[1] = j;
              }
            } else {
              friendFound[0] = unlikelyPoints;
              friendFound[1] = j;
            }
        }
        
        // TEST allows user to see point differences for each friend via server-side console
        console.log(friendsData[j].name + "'s unlikely points: " + unlikelyPoints);
    }

    // TEST just separating the different logs and displaying winning match
    console.log("\n" + friendsData[friendFound[1]].name + "\n");

    // Adding to friends list and returning the most likely friend match object
    friendsData.push(req.body);
    res.json(friendsData[friendFound[1]]);
  });

};
