Template.gameGamesList.onCreated(function(){
    var self = this;
    self.gamep = new ReactiveVar();
	  self.gameVar = new ReactiveVar();
    self.gameOn = new ReactiveVar(false);
    self.autorun(function(){
	self.subscribe('userPLgames');
  self.subscribe('userPLAgames');
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
},
  gamep: function(){
   var lolMao = Template.instance().gamep.get();
 var a = Game.find({_id:lolMao}).fetch()[0];
 return a ;
 },

});


Template.gameGamesList.events({
  "click .gameNames": function(event, template){
	var a = event.target.id;

     Template.instance().gamep.set(a);
     return  Template.instance().gameOn.set(true);
  },
});
