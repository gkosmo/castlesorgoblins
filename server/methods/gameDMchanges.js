Meteor.methods({
  addThisFriend:function(username, game){
     if( game.creatorId == this.userId ) {
    var member = {
    userId: username,
    name: "",
    attributesGeneral: [],
    attributesPersonnal: [],
    weapons: [],
    race: '',
    class:'',
    alignment: '',
    xp: 0,
    personality: '',
    deepWishes: '',
    weakness: '',
    history: '' };
    console.log(member);
    console.log(Game.findOne({_id:game._id}));
    return  Game.update({_id:game._id},{ $push: {
            members: member
        } });
    } else {
      throw new Meteor.Error("couldn't add user, you need to be Game Master ",
  "Only game masters can do this ! ");
    }
  },
  deleteGame: function(game){
    return Game.remove({_id: game._id});
  }
});
