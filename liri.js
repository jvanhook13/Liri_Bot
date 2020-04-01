require("dotenv").config()
var axios = require(`axios`)
var inquirer = require(`inquirer`)
var Spot = require(`node-spotify-api`)
var fs = require('fs')

var arg = process.argv.slice(3).join()
var command = process.argv[2]

var searchTerm = "";


var keys = require("./keys")
// console.log("keys" , keys)

var spotify = new Spotify(keys.spotify)
console.log(spotify, "herpa derpa")

function Spotify(spotify) {

    this.spotify = spotify
    // console.log("herpa" , spotify)



}

function spotSearch() {

    if (searchTerm === "") {

        searchTerm = "Ace of Base The Sign"

    }

    spotify.search({
            type: 'track',
            query: searchTerm,
            limit: 1
        }, function (err, data) {

            if (err) {

                return console.log("Error", err)

            }

            var track = data.tracks.items
            console.log("track", track)
            

        }


    )
}

function concertSearch() {}

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

    case `do=what-it-says`:

        randomSearch()

        break;



}