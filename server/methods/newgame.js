Meteor.methods({
  'createGame':function(doc){
    console.log("hey hey enter creategame");
     check(doc.name, String);
     check(doc.description, String);
     for(var i = 0; i < doc.attributeList.length; i ++){
    //   check(doc.attributeList[i], attributeSchema);
     }
     doc.creatorId = this.userId;
     doc.members= [];
     doc.status = "Just Created";
     return Game.insert(doc);
  }

});

var attributeSchema = new SimpleSchema({
  name: {
    type: String,
    label:' Attribute Name'
  },
  point: {
    type: Number,
    label:'Attribute Point'
  },
  description: {
    type: String,
    label: "description"
  }
});
