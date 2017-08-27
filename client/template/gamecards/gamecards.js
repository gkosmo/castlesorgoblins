Template.gameCardsList.events({
  "click #gameName": function(event, template){
     Template.instance().game.set(this.game);
     return  Template.instance().gameOn.set(true);
  }
});

Template.gameCardsList.helpers({
  gameLobbyOn: function(){
    return Template.instance().gameOn.get();
  },
  gameVar:function(){
    return Template.instance().game.get();
  }
});

Template.gameCardsList.onCreated(function(){
    var self = this;
    self.game = new ReactiveVar();
    self.gameOn = new ReactiveVar(false);
    self.autorun(function(){

    });
});

Template.gameLobby.helpers({
  userIsDM: function(){
    return this.game.creatorId == Meteor.userId();
  },
  userIsPlayer: function(){
    var a = false;
    for (var i = 0; i < this.game.members.length; i++ ){
      if( this.game.members[i].userId == Meteor.user().username ) { a = true;}
    }
      return a;
  }
});
