import winston from 'winston';
import database from './database';

const { Client } = require('pg');

const client = new Client();

const seed = () => {
  const qry = database;
  client.query(qry, (err, result) => {
    if (err) {
      winston.log(err.toString());
    } else {
      winston.log(result);
    }
  });
};

const connect = () => {
  client.connect()
    .then((err) => {
      winston.log('connection established');
      // query goes here
      if (!err) {
        seed();
      }
    });
};

connect();

module.exports = {
  query: (text, params, callback) => client.query(text, params, callback),
};
