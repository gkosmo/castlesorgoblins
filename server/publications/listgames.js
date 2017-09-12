Meteor.publish("userPLgames", function(){
   return PlayerGameList.find({playerId: this.userId});
});
