Template.friends.helpers({
    listUser: function(){
		console.log(Meteor.users.find({}).fetch());
        return Meteor.users.find({});
    }
});