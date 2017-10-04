Meteor.methods({
  playerStatDis:function(playerStatDis){
 PlayerStats.insert({
        name: playerStatDis.name,
      class: playerStatDis.class,
      race: playerStatDis.race,
          });

  }
});