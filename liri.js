require("dotenv").config()
var axios = require(`axios`)
var chalk = require('chalk')
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

        console.log(chalk.red("Please enter a band name"))

    }

    queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get((queryURL))

        .then(function (response) {



            // console.log("artist", response)

            var venue = response.data[0].venue.name
            var location = response.data[0].venue.city
            var dates = response.data[0].datetime

            console.log(chalk.blue("\n******************" + "\n" + "\nVenue is:" + venue + "\n" + "\nLocation is:" + location + "\n" + "\nDate:" + dates + "\n" + "\n***************"))


        })
}

function movieSearch() {

    var movie = arg.replace(",", "+")

    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

    axios.get((queryURL))

        .then(function (response) {

            console.log(response.data)

            var title = response.data.Title
            console.log(title)
            var year = response.data.Year
            console.log(year)
            var imbdRating = response.data.Ratings[0].value
            var rotten = response.data.Ratings[1].value
            var country = response.data.Country
            var language = response.data.Language
            var plot = response.data.Plot
            var actors = response.data.Actors

            console.log(chalk.inverse("\n******************" + "\n" + "\nMovie is:" + title + "\n" + "\nYear released:" + year + "\n" + "\nIMBD Rating:" + imbdRating + "\n" + "\nRotten Tomatoes Rating is:" + rotten + "\n" + "\nCountry of Origin:" + country + "\n" + "\nLanguage:" + language + "\n" + "\nPLot:" + plot + "\n" + "\nActors are:" + actors + "\n" + "\n***************"))




        })




}

function randomSearch() {

    fs.readFile("random.txt" , "utf8" , function (err, data) {


        if (err) {

            console.log(chalk.red(err, "ERROR"))



        }

        var contents = data.split(",")


        console.log("an array" , contents)

       let [command , arg] = contents 

       console.log(command, "command")
       console.log(arg , "arg7")

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
        



    })



}

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