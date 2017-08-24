Template.gameCardsList.events({
  "click #gameName": function(event, template){
     console.log(this.game);
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
