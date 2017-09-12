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
  },
  description: {
    type: String,
    label: "description"
  }
});
var attributePersonnalSchema = new SimpleSchema({
  name: {
    type: String,
    label:' Attribute Name'
  },
  point: {
    type: Number,
    label:'Attribute Point'
  },
  description: {
    type: String,
    label: "description"
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
  },
  range: {
    type: String,
    label: "Range"
  },
  description: {
    type: String,
    label: "description"
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
  attributesGeneral: {
    type: Array,
    label: "General Attributes"
  },
  "attributesGeneral.$":{
    type: attributeSchema
  },
  attributesPersonnal: {
    type: Array,
    label: "Personnal Attributes"
  },
  "attributesPersonnal.$":{
    type: attributePersonnalSchema
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
  },
  history: {
    type: String,
    label: "History of this player "
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
    label: "description"
  },
  members: {
    type: Array,
    label: "Members"
  },
  "members.$": {
    type: playerSchema
  },
  attributeList: {
    type: Array,
    label: "List of Attributes"
  },
  "attributeList.$": {
    type: attributeSchema
  },
  private: {
    type: Boolean,
    label: "private"
  },
  status: {
    type: String,
    label: "Status"
  }

}));
