const { Client } = require('pg');

const client = new Client();

const connect = () => {
  client.connect()
    .then(() => {
      console.log('connection established');
    // query here
    });
};

module.exports = { connect };
