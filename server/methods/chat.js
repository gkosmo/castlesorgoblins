Meteor.methods({
  chat:function(chat){
var a = chat.time;
console.log(chat.time);
 Messages.insert({
        name: chat.name,
      message: chat.value,
      time: chat.time,
      lobbyId: chat.lobbyId
          });

  }
});
