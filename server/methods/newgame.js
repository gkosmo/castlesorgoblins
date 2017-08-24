Meteor.methods({
  'createGame':function(doc){
    console.log("hey hey enter creategame");
     check(doc.name, String);
     check(doc.description, String);
     for(var i = 0; i < doc.attributeList.length; i ++){
       check(doc.attributeList[i], String);
     }
     doc.creatorId = this.userId;
     doc.members= [];
     return Game.insert(doc);
  }

});

