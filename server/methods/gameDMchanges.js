Meteor.methods({
  addThisFriend:function(username, game){
    var member = {
    userId: username,
    name: username,
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

  },
  deleteGame: function(game){
    return Game.remove({_id: game._id});
  }
});
