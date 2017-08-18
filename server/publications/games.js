Meteor.publish("userDMgames", function(){
   return Game.find({creatorId: this.userId});
});
