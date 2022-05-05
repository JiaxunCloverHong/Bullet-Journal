const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bulletJournal');

const bulletJournalSchema = new mongoose.Schema({
  date: String,
  body: String,
  entry_type: String,
  status: { type: String, default: 'new' },
  moved: { type: String, default: 'none'}
});

const BulletJournal = mongoose.model('BulletJournal', bulletJournalSchema);

module.exports = BulletJournal;