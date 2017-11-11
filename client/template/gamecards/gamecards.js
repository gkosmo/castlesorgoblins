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
    if( self.data.game.members[i].userId == Meteor.user().username && self.data.game.members[i].name !== '' ) {
      a = true;}
    }
    self.game = new ReactiveVar(self.data.game);
    self.userCompleteCaracter = new ReactiveVar(a);
    self.autorun(function(){
   Tracker.afterFlush(function(){
          self.subscribe("")
           self.subscribe("chatChannel", self.game.get()._id);
       });
	   console.log(self.game);
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
    },
    userCompleteCaracter: function(){
      return Template.instance().userCompleteCaracter.get();
    }
  });
Template.gameLobbyDM.events({
  "click #addNote": function(event, template){
    note= {};
    note.title = template.find("#titleDMNote").value;
    note.message = template.find("#messageDMNote").value;
    note.folder = template.find("#folderDMNote").value;
    note.gameId = template.data.game._id;
    note.public = $("#publicNote").is(":checked");
    console.log(note.public + "dfdsf sdfsdfs ");
    Meteor.call('addDMNote', note, function (error, result) {
      if(error){
        console.log(error.message);
      } else {
           template.find("#titleDMNote").value = "";
     template.find("#messageDMNote").value = "";
     template.find("#folderDMNote").value = "";

      }

    });
  },
  "click #deleteGame":function(event,template){
    var parentView = Blaze.currentView.parentView.parentView.parentView.parentView.parentView.parentView.templateInstance();
     Meteor.call("deleteGame", template.data.game , function(error, result){
       if(error){
       }
       if(result){
         parentView.gameOn.set(false);
       }
     });
  },
  "click .openFolder":function(event, template){
  // var a = event.inner.text;
   var b = event.currentTarget.dataset.target;
  // console.log(a);
   let c = template.openFolder.get();
   if(isInArray(b, c)){
    var index = c.indexOf(b);
    c.splice(index, 1);
   }else {
    c.push(b);
   }
   template.openFolder.set(c);
  },
  "click .deleteDMNote": function(event, template){
       console.log("ezlrjsdfdsfdse");

      var note = event.currentTarget.dataset.target;
      console.log(note);
    let c = template.openFolder.get();
   if(isInArray(note, c)){
    c.splice(index, 1);
   }
   console.log("ezlrjhljzke");
   template.openFolder.set(c);
   console.log(note);

   Meteor.call('deleteDMnote', note, function(error, result){
    if(error){
      console.log(error);
    } if( result){
      console.log(result)
    }

   })
  }
});
Template.gameLobbyDM.onCreated(function(){
  var self = this;
  self.editMemberOn = new ReactiveVar(false);
  self.editMember = new ReactiveVar();
  self.openFolder = new ReactiveVar([]);
  self.autorun(function(){
     self.subscribe('DM_Notes', self.data.game._id);
   });
});
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
Template.gameLobbyDM.helpers({
  DMOn: function(){
      return true;
  },
  editMember: function(){
     return Template.instance().editMember.get();
  },
  editMemberOn: function(){
     return Template.instance().editMemberOn.get();
  },
    userDMNotes: function(){
       arr = DMNotes.find({}, {fields: {folder: 1 }}).fetch();
       var folders = [];
       for (var i = arr.length - 1; i >= 0; i--) {
         if(isInArray(arr[i].folder, folders)){

         }else {
          folders.push(arr[i].folder);
         }
      }
      return folders;
    },
    openFolder: function(note){
      var result = false;
      var arrayNotes = Template.instance().openFolder.get();
      for (var i = arrayNotes.length - 1; i >= 0; i--) {
         if(note === arrayNotes[i]){
          result = true;
         }
       }
    return result;
    },
    openFolders:function(note){
      return  DMNotes.find({folder: note});

  }
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
        player.xp = "20";
        var parentView = Blaze.currentView.parentView.parentView;
        Meteor.call("playerCreation", player, template.data.gameId, function(error, result){
          if(error){
            $('#messagePlayerChange').text("problem on server" + error.message );
          }
          if(result){

             $('#messagePlayerChange').text("Player Fully Created ");
               parentView.parentView.templateInstance().editMemberOn.set(false)
           }
         });
      },
      "click #addAttribute": function(event, template){
        var attrList = Template.instance().attributesPlayers.get();
          var attName =  $('#attributeName').val();
          var attDescr = $('#attributeDescription').val();
          var attrMaxPoint = parseInt($("#attributeMaxPoint").val());
          attrList.push({ name: attName, description: attDescr, point: attrMaxPoint});
          return Template.instance().attributesPlayers.set(attrList);
      }
});

Template.presentMembers.onCreated(function(){
	var self = this;
	self.stat = new ReactiveVar([]);
});


Template.presentMembers.events({
	"click .playerDropdown" : function(event, template){
		var z = event.target.innerHTML;
		var a = template.data.members.length;		
		for( let i = 0; i < a; i++){
			var b = template.data.members[i].name;
			if (b==z){
			return Template.instance().stat.set(template.data.members[i]);				
			}
			else {
			}
		}
	}
	});

	  Template.presentMembers.helpers({
		  playerStatz:function(){
			var a = Template.instance().stat.get();
		  console.log(a);
			  return [a] ;
  }	  
	  });