Template.home.onCreated(function(){
    var self = this;
    self.createOn = new ReactiveVar(false);
    self.userDMgames  = new ReactiveVar(false);
	self.userPLgames  = new ReactiveVar(false);
    self.autorun(function(){
	self.subscribe('userPLgames');
	self.subscribe('messPost');

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
  }
});


  Template.messages.helpers({
    messages: function() {
var messagesDisplay = [];
var messList = Messages.find({}, { sort: { time: -1}}).fetch();
for (var i = 0; i < 20; i++) {
	messagesDisplay.push(messList[i]);
}
    return  messagesDisplay;

  }});

  Template.input.events = {
    'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user()){
      var name = Meteor.user().username;}
        else{
      var name = 'Anonymous';}
        var message = document.getElementById('message');
        if (message.value != '') {
var d = new Date();
		var chat = {name:name, value:message.value, time:d};
Meteor.call("chat",chat, function(error, result){
 if (error) {
}
      });

          document.getElementById('message').value = '';
          message.value = '';
        }
      }
    }
  };

