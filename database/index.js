const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bulletJournal');

const bulletJournalSchema = new mongoose.Schema({
  date: String,
  body: String,
  type: String,
  status: String,
});

const BulletJournal = mongoose.model('BulletJournal', bulletJournalSchema);

module.exports = BulletJournal;