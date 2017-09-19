Meteor.publish('messPost', function () {
return  Messages.find({}, { sort: { time: -1},limit:20});
});


