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
  "click .gameNames": function(event, template){
	var a = event.target.id;
	self.lolMao = event.target.id;
     Template.instance().gameVar.set(this.game);
     return  Template.instance().gameOn.set(true);
  },
});

Template.myGames.helpers({
	membres:function(){
var a=[];
    for (var i = 0; i < Game.find({_id:self.lolMao}).fetch()[0].members.length; i++ ){
 a[i]=Game.find({_id:self.lolMao}).fetch()[0].members[i].userId;
    }
return a;
},
   gameattributeList: function(){
	var a = Game.find({_id:self.lolMao}).fetch()[0].attributeList;
    return a;
  },
   game_id: function(){
	var a = Game.find({_id:self.lolMao}).fetch()[0]._id;
	return a;
  },
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