const db = require('./index');

module.exports = {
  addEntry: (body, callback) => {
    db.create({date: body.date, body: body.body, status: body.status}, (err, data) => {
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
  }
}