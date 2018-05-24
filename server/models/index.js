const dotenv = require('dotenv');

dotenv.config();

const dataBaseLink = require('../models/dataBaseLink');

dataBaseLink.connect();

