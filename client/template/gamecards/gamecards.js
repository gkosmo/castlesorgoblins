Template.gameCardsList.events({
  "click #gameName": function(event, template){
     Template.instance().game.set(this.game);
     return  Template.instance().gameOn.set(true);
  },
  "click #deleteGame":function(event,template){
     Meteor.call("deleteGame", template.game.get() , function(error, result){
       if(error){
         console.log("error", error);
       }
       if(result){
         template.gameOn.set(false);

        return  console.log('deleted');
       }
     });
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
      self.subscribe('userDMgames');

    });
});

Template.gameLobby.onCreated(function(){
  var self= this;
  var a = false;
  for (var i = 0; i < self.data.game.members.length; i++ ){
    console.log(self.data.game.members[i]);
    if( self.data.game.members[i].userId == Meteor.user().username && self.data.game.members[i].name !== '' ) {
      a = true;}
    }
    self.userCompleteCaracter = new ReactiveVar(a);

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
    },
    userCompleteCaracter: function(){
      return Template.instance().userCompleteCaracter.get();
    }
  });
