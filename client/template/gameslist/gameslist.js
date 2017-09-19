Template.gameGamesList.onCreated(function(){
  var self = this;
  self.gameVar = new ReactiveVar();
  self.gameOn = new ReactiveVar(false);
  self.autorun(function(){
    self.subscribe('userPLgames');
  });
});

Template.gameGamesList.helpers({
  games: function(){
    return PlayerGameList.find().fetch()[0];
  },
  gameItselfOn: function(){
    return Template.instance().gameOn.get();
  },
  gameVar: function(){
    return Template.instance().gameVar.get();
  }
});

Template.gameGamesList.events({
  "click #gameNames": function(event, template){
    Template.instance().gameVar.set(this.game);
    console.log(this.game, "finding game");
    return  Template.instance().gameOn.set(true);
  },
});
});

Template.myGames.events({

});

Template.playerGame.helpers({
  attributeList: function(){
	var a = Game.find({_id:self.lolMao}).fetch()[0].attributeList;
    return a;
  },
	nameOfGame: function(){
	var a = Game.find({_id:self.lolMao}).fetch()[0].name;
	return a;
} 
});