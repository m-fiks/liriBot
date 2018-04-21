require('dotenv').config();

//require keys.js file (contains keys taken from .env file)
const keys = require('./keys.js');

const request = require('request');
//console.log(keys.spotify)
//twitter and spotify libraries
const twitter = require('twitter');
const Spotify = require('node-spotify-api');
const omdb = require('omdb');

const client = new twitter(keys.twitter);
const spotify = new Spotify(keys.spotify);

//command
let doTheThing = process.argv[2];

let input = process.argv[3];

//params for twitter
const params = {
    q: 'meowmeow_maddy',
    count: 20,
};

// switch case to evaluate user input
switch (doTheThing){
    case 'my-tweets':
    //from docs: client.get(path, params, callback);
    client.get('search/tweets', params, searchTweets);
    break;

    case 'spotify-this-song':
    songSearch();
    break;

    case 'movie-this':
    movieSearch();
    break;

    case 'do-what-it-says':
    console.log('ok');
    break;

    default:
    console.log('Something has gone awry!');
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
function songDisplay (err, data){
    if (err) {
        return console.log(err);
      }
      let musicArray = data.tracks.items;
      //console.log(musicArray);
      for (let i=0; i<musicArray.length; i++){
          let artist = musicArray[i].album.artists[0].name;
          let songName =musicArray[i].name;
          let previewLink = musicArray[i].preview_url;
          let album = musicArray[i].album.name;
          console.log(`${songName} by ${artist} on album: ${album}.`);
          if (previewLink !== null){
            console.log(`Preview link: ${previewLink}`)
          };
      };
};

function songSearch () {
  //song for spotify format '<x>'
  let songName;
  //console.log(input);
  if (input !== undefined){
       //remove the <>
      songName = input.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
      
  } else {
      songName = 'Barbie Girl'
  };
    spotify.search({ type: 'track', query: songName, limit:5}, songDisplay);
};

//omdb business
function movieSearch() {
    //default to Mr.Nobody
    let key = keys.OMDB.api_key;
    let movieTitle;
    if (input !== undefined){
        movieTitle = songName = input.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    } else{
        movieTitle = 'Mr+Nobody';
    }
    let URL = 'https://www.omdbapi.com/?t=' + movieTitle + '&plot=short&apikey=' + key;
    request(URL, function (err, res, body){
        if (!err){
            let title = JSON.parse(body).Title;
            let year = JSON.parse(body).Year;
            let rating = JSON.parse(body).imdbRating;
            let rottenTom = JSON.parse(body).Ratings[1].Value;
            let country = JSON.parse(body).Country;
            let lang = JSON.parse(body).Language;
            let plot = JSON.parse(body).Plot;
            let actors = JSON.parse(body).Actors;
            console.log(`Title: ${title}, Made: ${year}, IMDB rating: ${rating}, Rotten Tomatoes rating: ${rottenTom}`);
            console.log(`Made in: ${country}, Language: ${lang}`)
            console.log(`Plot: ${plot} Actors: ${actors}`)
            }
        else{
            console.log(`Something went wrong! Please try again, or try another movie!`);
        }

     
    });
};