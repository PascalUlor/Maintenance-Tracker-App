const { Client } = require('pg');

const client = new Client();

const seed = () => {
  const qry = `DROP TABLE IF EXISTS requests;
  CREATE TABLE requests (
    id SERIAL primary key,
    userId int,
    location text,
    details text
  );
  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    id SERIAL primary key,
    userId int,
    location text,
    details text
  );
  DROP TABLE IF EXISTS status;
  CREATE TABLE status (
    
  );
  INSERT INTO requests (userId, location, details) VALUES (1, 'Lagos', 'Eko ooni baje');`;
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
