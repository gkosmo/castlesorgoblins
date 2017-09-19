Meteor.methods({
  'createGame':function(doc){
     check(doc.name, String);
     check(doc.description, String);
     for(var i = 0; i < doc.attributeList.length; i ++){
    //   check(doc.attributeList[i], attributeSchema);
     }
     doc.creatorId = this.userId;
     doc.members= [];
     doc.status = "Just Created";
     return Game.insert(doc);
  },
  "playerCreation":function(player, game){
    // example of updated element of array
     // db.bruno.insert({"array": [{"name": "Hello", "value": "World"}, {"name": "Joker", "value": "Batman"}]})
    // db.bruno.update({"array.name": "Hello"}, {$set: {"array.$.value": "Change"}})
   //db.students.update(
   //    { _id: 4, "grades.grade": 85 },
   //    { $set: { "grades.$.std" : 6 } }
   // )
    var username =  Meteor.users.findOne({ _id: this.userId }).username
    player.userId= username;
    return Game.update({_id: game, "members.userId":username}, {$set: {  "members.$": player   }})
  }

});
//
// var attributeSchema = new SimpleSchema({
//   name: {
//     type: String,
//     label:' Attribute Name'
//   },
//   point: {
//     type: Number,
//     label:'Attribute Point'
//   },
//   description: {
//     type: String,
//     label: "description"
//   }
// });
