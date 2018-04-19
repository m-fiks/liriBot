require('dotenv').config();

//require keys.js file (contains keys taken from .env file)
const keys = require('./keys.js');

//console.log(keys.spotify)
//twitter and spotify libraries
const twitter = require('twitter');
const spotify = require('node-spotify-api');
const client = new twitter(keys.twitter);
const music = new spotify(keys.spotify);

//command
let doTheThing = process.argv[2];

//params for twitter
const params = {
    q: 'meowmeow_maddy',
    count: 20,
};

//callback function to include in client.get
function searchTweets(err, tweets, response){
    const tweeteys = tweets.statuses;
    for (let i =0; i < tweeteys.length; i++){
        //variables for tweet time created and text of tweet
        let created = tweeteys[i].created_at
        let text = tweeteys[i].text;
        console.log(`${created} : ${text}`);
    }
};



//switch case to evaluate user input
switch (doTheThing){
    case 'my-tweets':
    //from docs: client.get(path, params, callback);
    client.get('search/tweets', params, searchTweets);
    break;

    case 'spotify-this-song':
    console.log('ruh roh');
    break;

    case 'movie-this':
    console.log('moooovies');
    break;

    case 'do-what-it-says':
    console.log('ok');
    break;

    default:
    console.log('Something has gone awry!');
};