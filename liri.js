require('dotenv').config();

//require keys.js file (contains keys taken from .env file)
const keys = require('./keys.js');

//console.log(keys.spotify)
//twitter and spotify libraries
const twitter = require('twitter');
const Spotify = require('node-spotify-api');
const client = new twitter(keys.twitter);
const spotify = new Spotify(keys.spotify);

//command
let doTheThing = process.argv[2];
//song for spotify format '<x>'
let songInput = process.argv[3];

//remove the <>
let songName = songInput.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

//params for twitter
const params = {
    q: 'meowmeow_maddy',
    count: 20,
};

//twitter callback function to include in client.get
function searchTweets(err, tweets, response){
    const tweeteys = tweets.statuses;
    for (let i =0; i < tweeteys.length; i++){
        //variables for tweet time created and text of tweet
        let created = tweeteys[i].created_at
        let text = tweeteys[i].text;
        console.log(`${created} : ${text}`);
    }
};

//spotify business
spotify.search({ type: 'track', query: songName, limit:5}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    let musicArray = data.tracks.items;
    //console.log(musicArray);
    for (let i=0; i<musicArray.length; i++){
        let artist = musicArray[i].album.artists[0].name;
        let songName =musicArray[i].name;
        let previewLink = musicArray[i].preview_url;
        let album = musicArray[i].album.name;
        console.log(`${songName} by ${artist} on album: ${album}. Preview link: ${previewLink}`); 
    }
});



//switch case to evaluate user input
// switch (doTheThing){
//     case 'my-tweets':
//     //from docs: client.get(path, params, callback);
//     client.get('search/tweets', params, searchTweets);
//     break;

//     case 'spotify-this-song':
//     console.log('ruh roh');
//     break;

//     case 'movie-this':
//     console.log('moooovies');
//     break;

//     case 'do-what-it-says':
//     console.log('ok');
//     break;

//     default:
//     console.log('Something has gone awry!');
// };