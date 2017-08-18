Template.home.onCreated(function(){
    this.createOn = new ReactiveVar(false);
});
Template.home.events({
  "click #create": function(event, template){
    console.log(template);
     Template.instance().createOn.get() ? Template.instance().createOn.set(false) : Template.instance().createOn.set(true);
  }
});
Template.home.helpers({
  createOn: function(){
    return Template.instance().createOn.get();
  }
});
