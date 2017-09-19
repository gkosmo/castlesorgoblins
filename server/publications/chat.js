Meteor.publish('messPost', function () {
return  Messages.find({}, { sort: { time: -1},limit:20});
});


Meteor.publish('chatChannel', function (lobbyId) {
return  Messages.find({lobbyId: lobbyId }, { sort: { time: -1}});
});
