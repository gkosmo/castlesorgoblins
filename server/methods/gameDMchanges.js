Meteor.methods({
  addThisFriend:function(username, game){
    game = Game.findOne({_id: game._id});
    var notDoneYet = true;
    for( var i = 0; i < game.members.length; i++){
          if (username == game.members[i].userId) { notDoneYet = false }
     }
     if( game.creatorId == this.userId  && notDoneYet ) {
    var member = {
    userId: username,
    name: "",
    attributesGeneral: [],
    attributesPersonnal: [],
    weapons: [],
    race: '',
    class:'',
    alignment: '',
    xp: 0,
    personality: '',
    deepWishes: '',
    weakness: '',
    history: '' };
	  var friendGameList = PlayerGameList.find({playerName:username}).fetch();
		var idPlayer = Meteor.users.find({username:username}).fetch()[0]._id;
		var gameId = game._id;
		var gameName = game.name;
		var gameStatus = game.status;
		var playerGameList = {
			gameId:gameId,
			gameName:gameName,
			gameStatus:gameStatus
		};
					  console.log(playerGameList,"   first test");

	if (friendGameList.length == 0) {
	          PlayerGameList.insert({playerId:idPlayer, playerName:username, games:[ playerGameList]});
	}
	else {
	   PlayerGameList.update({_id:friendGameList[0]._id},{ $push: {games:playerGameList}});
	     }
    return  Game.update({_id:game._id},{ $push: {members: member} });
  } else {
      throw new Meteor.Error("couldn't add user, you need to be Game Master ",
  "Only game masters can do this ! or You have alredy added a player...");
    }

  },
  deleteGame: function(game){
    return Game.remove({_id: game._id});
  }

});
