Template.newgame.onCreated(function(){
  var self = this;
  self.attributesPlayers = new ReactiveVar([]);
  self.autorun(function(){
  });
});
Template.newgame.events({
  "click #addAttribute": function(event, template){
    var attrList = Template.instance().attributesPlayers.get();
    console.log(attrList);
      attrList.push($('#attributeName').val());
      console.log($('#attributeName').val());
      console.log(attrList);
      return Template.instance().attributesPlayers.set(attrList);
  },
  "click #createGame":function(event, template){
    var game = {}
    game.name = $('#gameName').val();
    game.description= $('#gameDescription').val();
    game.private = template.find('#privateGame').checked;
    game.attributeList = Template.instance().attributesPlayers.get();
    game.members = [];
    console.log(game);
    Meteor.call("createGame",game, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
         console.log("yey");
      }
    });
  }
});
Template.newgame.helpers({
  attributesPlayers: function(){
    return Template.instance().attributesPlayers.get();
  }
});
