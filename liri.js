require("dotenv").config()
var axios = require(`axios`)
var chalk = require('chalk')
var request = require(`request`)
var Spotify = require(`node-spotify-api`)
var fs = require('fs')


var arg = process.argv.slice(3).join()

console.log("arg", arg)

var command = process.argv[2]

var searchTerm = arg;

console.log("arg1", arg)


var keys = require("./keys")
// console.log("keys" , keys)

var spotify = new Spotify(keys.spotify)
console.log(spotify, "herpa derpa")

function Spotify(spotify) {

    this.spotify = spotify
    // console.log("herpa" , spotify)



}

function spotSearch() {

    if (arg === "") {

        searchTerm = "Ace of Base The Sign"

    }

    searchTerm = arg
    console.log("arg3", arg)
    console.log("search", searchTerm)

    spotify.search({
            type: 'track',
            query: searchTerm,
            limit: 1
        }, function (err, data) {

            if (err) {

                return console.log("Error", err)

            }

            var track = data.tracks.items[0]
            console.log("THIS ONE", track)
            var artist = track.album.artists[0].name
            var song = track.name
            var link = track.album.artists[0].href
            var album = track.album.name
            var popular = track.popularity
            console.log(chalk.green("\n******************" + "\n" + "\nArtist is:" + artist + "\n" + "\nSong is:" + song + "\n" + "\nLink:" + link + "\n" + "\nAlbum is:" + album + "\n" + "\nPopularity is:" + popular + "\n" + "\n***************"))



        }


    )
}


function concertSearch() {





    var artist = arg.replace(",", "+")
    console.log("artist1", artist)

    if (arg === "") {

        console.log("PLease enter a band name")

    }

    queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get((queryURL))
    
    .then(function (response) {

            // queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

            console.log("artist", response)

            var venue = response.data[0].venue.name
            var location = response.data[0].venue.city
            var dates = response.data[0].datetime

            console.log(chalk.blue("\n******************" + "\n" + "\nVenue is:" + venue + "\n" + "\nLocation is:" + location + "\n" + "\nDate:" + dates + "\n" + "\n***************"))

        
    })
    }

function movieSearch() {}

function randomSearch() {}

switch (command) {

    case `concert-this`:
        concertSearch()

        break;

    case "spotify-this":

        spotSearch()

        break;

    case `movie-this`:

        movieSearch()

        break;

    case `do-what-it-says`:

        randomSearch()

        break;



}