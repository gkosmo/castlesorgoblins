Meteor.methods({
  addThisFriend:function(username, game){
     if( game.creatorId == this.userId ) {
    var member = {
    userId: username,
    name: username,
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
					  console.log(playerGameList);
	PlayerGameList.insert({playerId:idPlayer, playerName:username, games:[ playerGameList]
	});
	}
	else {
	PlayerGameList.update({_id:friendGameList[0]._id},{ $push: {games:playerGameList}});
  
	     }
    return  Game.update({_id:game._id},{ $push: {
            members: member
        } });
    } else {
      throw new Meteor.Error("couldn't add user, you need to be Game Master ",
  "Only game masters can do this ! ");
    }

  },
  deleteGame: function(game){
    return Game.remove({_id: game._id});
  }

});
