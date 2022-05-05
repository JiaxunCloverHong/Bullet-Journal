const db = require('./index');

module.exports = {
  addEntry: (body, callback) => {
    db.create({date: body.date, body: body.body, entry_type: body.entry_type}, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },
  getData: (date, callback) => {
    db.find({date: date}, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },
  changeStatus: (body, callback) => {
    db.update({_id: body._id}, {status: body.status}, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },
  editEntry: (body, callback) => {
    db.update({_id: body._id}, {entry_type: body.entry_type, body: body.body, status: 'new'}, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },
  deleteEntry: (id, callback) => {
    db.deleteOne({_id: id}, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },
  moveEntry: (body, callback) => {
    db.update({_id: body._id}, {moved: body.moved}, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  }
}