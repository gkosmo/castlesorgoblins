PlayerGameList = new Mongo.Collection('pgl');
var gameListSchema = new SimpleSchema ({
	gameId: {
    type: String,
    label:"Game's Id"
  },
    gameName: {
    type: String,
    label:"Game's Name"
  },
    gameStatus: {
    type: String,
    label:"Game's Status"
  }
});
PlayerGameList.attachSchema(new SimpleSchema({
  playerId: {
    type: String,
    label: "Users's ID",
  },
  playerName:{
    type: String,
    label: "Users's name"
  },
  games: {
    type: Array,
    label: "User's game list"
  },
  "games.$": {
	  type: gameListSchema
  }
}));
