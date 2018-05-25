import database from './database';

const { Client } = require('pg');

const client = new Client();

const seed = () => {
  const qry = database;
  client.query(qry, (err, result) => {
    if (err) {
      console.log(err.toString());
    } else {
      console.log(result);
    }
  });
};

const connect = () => {
  client.connect()
    .then((err) => {
      console.log('connection established');
      // query goes here
      if (!err) {
        seed();
      }
    });
};

module.exports = {
  connect,
  query: (text, params, callback) => client.query(text, params, callback)
};
