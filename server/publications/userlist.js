Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({}); 	  console.log("test1");
  } else {
    this.ready();
  }
});
