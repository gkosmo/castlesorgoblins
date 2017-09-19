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
        if ( event.target.innerText == template.data.game.members[i].userId ) {
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
Template.newPlayer.onCreated(function(){
  var self = this;
  self.attributesPlayers = new ReactiveVar([]);
  self.autorun(function(){
  });
});
Template.newPlayer.helpers({
  attributesPlayers: function(){
    return Template.instance().attributesPlayers.get();
  }
});
Template.newPlayer.events({
  "click #addPlayer": function(event, template){
        var player = {};
        player.name = $("#playerName").val();
        player.class = $("#playerClass").val();
        player.race = $("#playerRace").val();
        player.alignment = $("#playerAlignment").val();
        player.personality = $("#playerPersonality").val();
        player.deepWishes = $("#playerDeepWishes").val();
        player.weakness = $("#playerWeakness").val();
        player.history = $("#playerHistory").val();
        player.attributesGeneral = [];
        for( let i = 0; i < template.data.attributeList.length; i++){
           var attr = {};
           attr.name = template.data.attributeList[i].name;
           attr.description = template.data.attributeList[i].description;
           let idAttr = "#"+ attr.name;
           attr.point = $(idAttr).val();
           
           player.attributesGeneral.push(attr);
        }
        player.attributesPersonnal =  Template.instance().attributesPlayers.get();
        player.weapons = [];
        player.xp = 20;
        // example of updated element of array
         // db.bruno.insert({"array": [{"name": "Hello", "value": "World"}, {"name": "Joker", "value": "Batman"}]})
        // db.bruno.update({"array.name": "Hello"}, {$set: {"array.$.value": "Change"}})
        Meteor.call("playerCreation", player, template.data.gameId, function(error, result){
          if(error){
            $('#messagePlayerCreation').text("problem on server" + error.message );
            console.log("error", error);
          }
          if(result){
            $('#messagePlayerCreation').text("Player Fully Created ");
          }
        });
      },
      "click #addAttribute": function(event, template){
        var attrList = Template.instance().attributesPlayers.get();
          var attName =  $('#attributeName').val();
          var attDescr = $('#attributeDescription').val();
          var attrMaxPoint = parseInt($("#attributeMaxPoint").val());
          attrList.push({ name: attName, description: attDescr, point: attrMaxPoint});
          console.log(attrList);
          return Template.instance().attributesPlayers.set(attrList);
      }
});
