Template.userList.helpers({
    listUser: function(){
		console.log(Meteor.users.find({}).fetch());
        return Meteor.users.find({});
    }
});
Template.userList.events({
  "click #addThisFriend": function(event, template){
     var doneAlready = false;
     for( var i = 0; i < template.data.game.members.length; i++){
        if ( Meteor.users.findOne({ _id: Meteor.userId() }).username == template.data.game.members[i].userId ) {
           doneAlready = true;
           $('#messageAddingUser').text("added already..");
        }
     }
     if (!doneAlready){
       Meteor.call("addThisFriend", event.target.innerText, template.data.game, function(error, result){
        if(error){
            $('#messageAddingUser').text("problem on server" + error.message );
        }
        if(result){
             $('#messageAddingUser').text("Well done ! ");
        }
      });
     }
     setTimeout(function(){
     $('#messageAddingUser').text("");
    },3000);
  }
});
Template.userList.onCreated(function(){
  var self = this;
  self.attributesPlayers = new ReactiveVar([]);
  self.autorun(function(){
    self.subscribe('userData');
  });
});
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
      var attName =  $('#attributeName').val();
      var attDescr = $('#attributeDescription').val();
      var attrMaxPoint = parseInt($("#attributeMaxPoint").val());
      attrList.push({ name: attName, description: attDescr, point: attrMaxPoint});
      console.log(attrList);
      return Template.instance().attributesPlayers.set(attrList);
  },
  "click #createGame":function(event, template){
    var game = {};
    game.name = $('#gameName').val();
    game.description= $('#gameDescription').val();
    game.private = template.find('#privateGame').checked;
    game.attributeList = Template.instance().attributesPlayers.get();
   var parentView = Blaze.currentView.parentView.parentView;
   game.members = [];
   var parentInstance = parentView.templateInstance();
    Meteor.call("createGame",game, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
         console.log("yey");
         // replace parentVariable with the name of the instance variable
              parentInstance.createOn.set(false);
              parentInstance.userDMgames.set(true);

      }
    });

  }
});
Template.newgame.helpers({
  attributesPlayers: function(){
    return Template.instance().attributesPlayers.get();
  }
});
