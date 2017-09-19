Meteor.publish("userPLgames", function(){
   return PlayerGameList.find({playerId: this.userId});
});
Meteor.publish("userPLAgames", function(argument){
  return Game.find({});
});
