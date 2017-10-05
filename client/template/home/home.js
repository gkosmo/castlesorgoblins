Template.home.onCreated(function(){
    var self = this;
    self.createOn = new ReactiveVar(false);
    self.userDMgames  = new ReactiveVar(false);
	self.userPLgames  = new ReactiveVar(false);
    self.autorun(function(){
	self.subscribe('userPLgames');
	self.subscribe('chatChannel', "public");

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
  publicOn: function(){
  var a =  Template.instance().userDMgames.get();
 var b = Template.instance().userPLgames.get();
var c =   Template.instance().createOn.get();
  if( a || b || c ) {
    return false;
  } else {
    return true;
  }
  },
  lobbyId:function(){
    return "public"
  }
});


  Template.messages.helpers({
    messages: function() {
      var lobbyId = Template.instance().lobbyId.get();
      return Messages.find({lobbyId: lobbyId}, { sort: { time: -1}, limit: 20}).fetch();
  }
});

  Template.messages.onCreated(function(){
      var self = this;
      console.log("created messages");
      console.log(self.data);
      if($.isEmptyObject(self.data.lobbyId) )
      {  self.lobbyId = new ReactiveVar('public'); }
      else {
        self.lobbyId = new ReactiveVar(self.data.lobbyId);
      }

});
  Template.input.events = {
    'keydown input#message' : function (event,template) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user()){
      var name = Meteor.user().username;}
        else{
      var name = 'Anonymous';}

      if(template.data.game) {
        var lobbyId = template.data.game._id;
      } else {
        var lobbyId = "public";
      }

        var message = document.getElementById('message');
        if (message.value != '') {
						if(message.value.length>57) {
				alert("Message too long");
			}
			else{
		var d = new Date();
		var chat = {name:name, value:message.value, time:d, lobbyId:lobbyId};
		Meteor.call("chat",chat, function(error, result){
		if (error) {
		}
      });

          document.getElementById('message').value = '';
          message.value = '';
	}}
       }
    }
  };
