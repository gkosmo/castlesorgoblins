import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({}); 	  console.log("test1");
  } else {
    this.ready();
  }
});