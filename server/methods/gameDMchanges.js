Meteor.methods({
  addThisFriend:function(username, game){
    var usernameThisUser = Meteor.users.find({ _id: this.userId }, {
      fields: { username: 1 }}).fetch()[0].username;

     if( game.creatorId == this.userId  && username != usernameThisUser ) {
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
      throw new Meteor.Error("couldn't add user, you need to be Game Master or you are Already and can't be a caracter, sorry ! ",
  "Only game masters can do this ! ");
    }

   },
  deleteGame: function(game){
    for (var i = 0; i< game.members.length; i++){
       console.log(game.members[i]);
       var idPlayer = Meteor.users.find({username:game.members[i].userId}).fetch()[0]._id;
       console.log(idPlayer);
  PlayerGameList.update(
  { playerId: idPlayer },
  { '$pull':
    { 'games':
       { 'gameId': game._id }
     }
   });
  }
    return  Game.remove({_id: game._id});
  },
  addDMNote: function(note){
    note.dm_id = this.userId;
    note.created_at = Date.now();
    DMNotes.insert(note);
  }

});
