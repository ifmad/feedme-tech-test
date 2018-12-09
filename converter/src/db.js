Promise = require('bluebird');
const { MongoClient } = require('mongodb');

let connection;

Promise.delay(5000)
  .then(() => MongoClient.connect('mongodb://mongo/events', { useNewUrlParser: true })
    .then((conn) => {
      connection = conn;
      console.log('Connected to mongodb.');
    }));

const save = function save(events) {
  return events.map(event => connection.db('events').collection(event.type).insertOne({ ...event, type: undefined }));
}

module.exports = { save };
