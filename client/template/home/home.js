Template.home.onCreated(function(){
  var self = this;
  self.createOn = new ReactiveVar(false);
  self.userDMgames  = new ReactiveVar(false);
  self.userPLgames  = new ReactiveVar(false);
  self.autorun(function(){
    self.subscribe('userDMgames');
    self.subscribe('userPLgames');
  });
});
Template.home.events({
  "click #create": function(event, template){
     Template.instance().createOn.get() ? Template.instance().createOn.set(false) : Template.instance().createOn.set(true);
     Template.instance().userDMgames.set(false);
     Template.instance().userPLgames.set(false);

  },
  "click #userDMgames":function(event, template){
    Template.instance().createOn.set(false);
    Template.instance().userPLgames.set(false);
    Template.instance().userDMgames.get() ? Template.instance().userDMgames.set(false) : Template.instance().userDMgames.set(true);
  },
  "click #userPLgames":function(event, template){
    Template.instance().createOn.set(false);
     Template.instance().userDMgames.set(false);
    Template.instance().userPLgames.get() ? Template.instance().userPLgames.set(false) : Template.instance().userPLgames.set(true);
  }
});
Template.home.helpers({
  createOn: function(){
    return Template.instance().createOn.get();
  },
  userDMgamesOn: function(){
    return Template.instance().userDMgames.get();
  },
  userPLgamesOn: function(){
    return Template.instance().userPLgames.get();
  },
  userDMgames: function(){
    return Game.find({creatorId: Meteor.userId()});
  },
  userPLgames: function(){
    return PlayerGameList.find({gameName:gameName});
  }
});
