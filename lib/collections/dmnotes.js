DMNotes = new Mongo.Collection('dm_notes');
DMNotes.attachSchema(new SimpleSchema({
  gameId: {
    type: String,
    label: "Game ID",
  },
  dm_id: {
    type: String,
    label: 'Dm\'s ID'
  },
  title: {
    type: String,
    label: 'Title'
  },
  message: {
    type: String,
    label: 'Message'
  },
  folder: {
    type: String,
    label: 'Folder'
  },
  created_at: {
    type: Date,
    label: 'Created at '
  }
}));
