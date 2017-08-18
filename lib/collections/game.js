Game = new Mongo.Collection('game');
var equipmentSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name of equipment "
  },
  description:{
    type: String,
    label: "description"
  }
});
var attributeSchema = new SimpleSchema({
  name: {
    type: String,
    label:' Attribute Name'
  },
  point: {
    type: Number,
    label:'Attribute Point'
  }
});
var weaponSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Weapons Name"
  },
  atkBonus: {
    type: Number,
    label: "attack Bonus"
  },
  atkType: {
    type: String,
    label: "attack type"
  }
});
var playerSchema =  new SimpleSchema({
  userId: {
    type: String,
    label:"User Id"
  },
  name: {
    type: String,
    label: "Name"
  },
  attributes: {
    type: Array,
    label: "Attributes"
  },
  "attributes.$":{
    type: attributeSchema
  },
  weapons: {
    type: Array,
    label: "weapons"
  },
  "weapons.$": {
    type: weaponSchema
  },
  class:{
    type: String,
    label: "class"
  },
  race: {
    type: String,
    label: "race"
  },
  alignment: {
    type: String,
    label: "alignment"
  },
  xp: {
    type: Number,
    label: "experience points"
  },
  personality: {
    type: String,
    label: "Personality"
  },
  deepWishes: {
    type: String,
    label: "Deepest Wish"
  },
  weakness: {
    type: String,
    label: "Ultimate Weakness"
  }
});
Game.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Game Name",
    max: 50
  },
  creatorId:{
    type: String,
    label: "creator"
  },
  description: {
    type: String,
    label: "description",
    autoform: {
      afFieldInput: {
        type: 'textangular'
    // froala options goes here
      }
    }
  },
  members: {
  type: Array,
  label: "Members"
  },
  "members.$": {
    type: playerSchema
  }

}));
