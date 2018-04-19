require('dotenv').config();

//require keys.js file (contains keys taken from .env file)
const keys = require('./keys.js');

console.log(keys.spotify)
//twitter and spotify libraries
const twitter = require('twitter');
const spotify = require('node-spotify-api');

const client = new twitter(keys.twitter);
const music = new spotify(keys.spotify);

console.log(client, music);