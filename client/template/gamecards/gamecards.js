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
Template.gameLobbyDM.events({

  "click #deleteGame":function(event,template){
    console.log(template);
     Meteor.call("deleteGame", template.data.game , function(error, result){
       if(error){
         console.log("error", error);
       }
       if(result){

        return  console.log('deleted');
       }
     });
  }
});
Template.gameLobbyDM.onCreated(function(){
  var self = this;
  self.editMemberOn = new ReactiveVar(false);
  self.editMember = new ReactiveVar();
});
Template.gameLobbyDM.helpers({
  DMOn: function(){
      return true;
  },
  editMember: function(){
    console.log(Template.instance().editMember.get());
     return Template.instance().editMember.get();
  },
  editMemberOn: function(){
  console.log(  Template.instance().editMemberOn.get() );
     return Template.instance().editMemberOn.get();
  },

});
Template.presentMemberDM.events({
  "click .editMember": function(event, template){

    var parentView = Blaze.currentView.parentView.parentView.parentView.parentView.parentView.parentView.parentView;

 parentView.templateInstance().editMember.set(template.data.member);
 parentView.templateInstance().editMemberOn.set(true);
    }

});
Template.editMemberDM.onCreated(function(){
  var self = this;
  self.attributesPlayers = new ReactiveVar([]);
  self.autorun(function(){
  });
});
Template.editMemberDM.events({
  "click #changePlayer": function(event, template){
        var player = {};
        player.userId = template.data.member.userId;


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
