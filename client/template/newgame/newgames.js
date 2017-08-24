Template.newgame.onCreated(function(){
  var self = this;
  self.attributesPlayers = new ReactiveVar([]);
  self.autorun(function(){
  });
});
Template.newgame.events({
  "click #addAttribute": function(event, template){
    var attrList = Template.instance().attributesPlayers.get();
    console.log(attrList);
      attrList.push($('#attributeName').val());
      console.log($('#attributeName').val());
      console.log(attrList);
      return Template.instance().attributesPlayers.set(attrList);
  }
});
Template.newgame.helpers({
  attributesPlayers: function(){
    return Template.instance().attributesPlayers.get();
  }
});
