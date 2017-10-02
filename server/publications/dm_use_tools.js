Meteor.publish("DM_Notes", function(game){
  return DMNotes.find({gameId: game});
});
