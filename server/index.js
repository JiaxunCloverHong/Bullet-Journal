const express = require('express');
const path = require('path');
const db = require('../database/models.js');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.get('/bulletJournal/:date', (req, res) => {
  db.getData(req.params.date, (err, data) => {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

app.post('/bulletJournal', (req, res) => {
  db.addEntry(req.body, (err, data) => {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

app.put('/bulletJournal', (req, res) => {
  db.changeStatus(req.body, (err, data) => {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app;
