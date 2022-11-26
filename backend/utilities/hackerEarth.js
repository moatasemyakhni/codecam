// execute code
require('dotenv').config();
const HackerEarth = require('hackerearth-v4-node');

/**********************/
// .env variables
const HACKER_EARTH_CLIENT_SECRET = process.env.HE_CLIENT_SECRET;
/**********************/

const hackerEarthConfiguration = {
    clientSecret: HACKER_EARTH_CLIENT_SECRET,
    memory_limit: 10000,
    time_limit: 2,
};

const hackerEarth = new HackerEarth(hackerEarthConfiguration);

module.exports = {
    hackerEarthConfiguration,
    hackerEarth,
}