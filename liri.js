//Variables
require("dotenv").config();
// var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify)
var filteredSearch = process.argv.splice(3).join("+");
var searchCriteria = process.argv[2];

// Conditional statements checking for user searchCriteria.
if (searchCriteria === "concert-this"){
    concertThis(filteredSearch)
}
    // else if (searchCriteria === "spotify-this-song"){
    // spotifyThatSong(filteredSearch)
    // }
        // else if (searchCriteria === "do-what-it-says"){
        // var index = 0;
        // readFileByIndex(index);
        // }
            // else if (searchCriteria === "concert-this"){
            // concertThis(filteredSearch)
            // }
   
// This will take what is output to the terminal and saves to the log.txt file.
function logToFile (data){
fs.appendFile("log.txt", "\n" + data, function(err){
    
    if(err){
        console.log(err);
    }
})

}

    // Movie search function that takes in user input to work with OMDB API.
    // function movieSearch (movieTitle){
        
    //     if (movieTitle){
    //     axios.get("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=trilogy").then(function(response){
    //         var res = response.data;
    //         var movieArr = []
        
    //         var title = res.Title;
    //         var releaseDate = res.Released;
    //         var RTrating = JSON.stringify(res.Ratings[1].Value);
    //         var producer = res.Production;
    //         var language = res.Language;
    //         var plot = res.Plot;
    //         var cast = res.Actors;

            // Pushing responses to an array to be transferred to the log function, to save to the log.txt file.
            
    //         movieArr.push("\n");
    //         movieArr.push("Title: " + title);
    //         movieArr.push("Release date: " + releaseDate);
    //         movieArr.push("Rotten Tomatoes rating: " + RTrating);
    //         movieArr.push("Producer: " + producer);
    //         movieArr.push("Language: " + language);
    //         movieArr.push("Plot: " + plot);
    //         movieArr.push("Cast: " + cast);
    //         movieArr.push("Logged search: " + timeStamp);

        
        
    //     console.log("Title: " + title);
    //     console.log("Release Date: " + releaseDate);
    //     console.log("Rotten Tomatoes Rating: " + RTrating);
    //     console.log("Producer: " + producer);
    //     console.log("Language: " + language);
    //     console.log("Plot: " + plot);
    //     console.log("Actors: " + cast);
    //     console.log("Logged search: " + timeStamp);

    //     logToFile(movieArr);
        
    //     });
    // }
    //         else if(!movieTitle){
    //             movieTitle = "Mr. Nobody"
    //             axios.get("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=trilogy").then(function(response){
    //                 var res = response.data;
    //                 var movieArr = [];
    //                 var title = res.Title;
    //                 var releaseDate = res.Released;
    //                 var RTrating = JSON.stringify(res.Ratings[1].Value);
    //                 var producer = res.Production;
    //                 var language = res.Language;
    //                 var plot = res.Plot;
    //                 var cast = res.Actors;

    //                 movieArr.push("\n");
    //                 movieArr.push("Title: " + title);
    //                 movieArr.push("Release date: " + releaseDate);
    //                 movieArr.push("Rotten Tomatoes rating: " + RTrating);
    //                 movieArr.push("Producer: " + producer);
    //                 movieArr.push("Language: " + language);
    //                 movieArr.push("Plot: " + plot);
    //                 movieArr.push("Cast: " + cast);
    //                 movieArr.push("Logged search: " + timeStamp);

    //                 logToFile(movieArr);
                
    //             console.log("Logged search: " + timeStamp);
    //             console.log("Title: "+title);
    //             console.log("Release Date: "+releaseDate);
    //             console.log("Rotten Tomatoes Rating: "+RTrating);
    //             console.log("Producer: "+producer);
    //             console.log("Language: "+language);
    //             console.log("Plot: "+plot);
    //             console.log("Actors: "+cast);
                
                
    //             });
    //         }
    // };

        // This is function opens a link to a backstreet boys song after the user inputs "do-what-it-says".
        // function spotifyAPI(songName){
        
        //             spotify
        //             .request('https://api.spotify.com/v1/search?q='+songName+'&type=track,playlist')
        //             .then(function(data){
        //                 var spotifyURL = data.tracks.items[0].album.external_urls.spotify;
        //                 require("openurl").open(spotifyURL)
                        
                    
                    
        //             });
                
                    
        // };

            // This function accesses the spotify api to output artist,song,album information, as well as a link to the song and a time stamp.
            // function spotifyThatSong(songName){
            //     if (songName){
            //     spotify
            //         .request('https://api.spotify.com/v1/search?q='+songName+'&type=track,playlist')
            //         .then(function(data){
            //             var musicArr = [];
            //             var artist = data.tracks.items[0].album.artists[0].name;
            //             var song = data.tracks.items[0].name;
            //             var album = data.tracks.items[0].album.name;
            //             var spotifyURL = data.tracks.items[0].album.external_urls.spotify;
                        
            //             musicArr.push("\n");
            //             musicArr.push("Artist: " + artist);
            //             musicArr.push("Song: " + song);
            //             musicArr.push("Album: " + album);
            //             musicArr.push("URL: " + spotifyURL);
            //             musicArr.push("Logged search: " + timeStamp + ",");

            //             logToFile(musicArr);

                        
            //             // console.log(test);
                        
            //             console.log("Artist: "+ artist);
            //             console.log("Song: "+ song);
            //             console.log("Link to song: "+ spotifyURL);
            //             console.log("Album: "+ album);
            //             console.log("Logged search: " + timeStamp);
            //         })
            //         .catch(function onError(error) {   
                            
            //         console.log(error);  });
            //         }
            //         // Make default if filteredSearch is empty ("The Sign" by Ace of Base)
            //         else{spotifyThatSong("Ace of Base")}
                        
                    
                        
                    
            // };

                // This function accesses the bandintown API to output name of venue, venue location,and the date of the event.
                // function readFileByIndex(i) {
                //         fs.readFile("random.txt", "utf8", function (err, data){
                //             if(err){
                //                 console.log(err)
                //             }
                //             data = data.split(",")[i];
                //             data = data.split(" ").join("+");
                            
                //             spotifyAPI(data)
                //         })
                // };
                    // This function retrieves concert dates from the bandsintown api to output upcoming concerts based on artists searched in terminal.
                    function concertThis(concertSearch){

                        if(concertSearch.length === 0){
                            console.log("Sorry, no upcoming events available.");

                        }

                        else if (concertSearch.length > 0){

                        // // This accesses the bands in town API for upcoming events.
                        axios.get("https://rest.bandsintown.com/artists/"+ concertSearch +"/events?app_id=codingbootcamp")
                        .then(function(response){
                            
                            var numberOfEvents = response.data.length;

                            
                            console.log("\nCurrent Time: " + timeStamp);
                            console.log("\nNumber of upcoming events found for\n "+concertSearch.split("+").join(" ")+": " + numberOfEvents);
                            

                            for(var i = 0; i < numberOfEvents; i++){
                            var concertArr = [];
                            var artists = response.data[i].lineup[0];    
                            var venue = response.data[i].venue.name;
                            var locationCountry = response.data[i].venue.country;
                            var locationRegion = response.data[i].venue.region;
                            var locationCity = response.data[i].venue.city;
                            var dates = response.data[i].datetime;

                            concertArr.push("\n");
                            concertArr.push("Artist/Band: " + artists);
                            concertArr.push("Venue: " + venue);
                            concertArr.push("Country: " + locationCountry);
                            concertArr.push("Region: " + locationRegion);
                            concertArr.push("City: " + locationCity);
                            concertArr.push("Event Dates: " + dates);
                            concertArr.push("Logged search: " + timeStamp + ",");

                            logToFile(concertArr);


                            
                        
                            console.log("\n")
                            console.log("Artist/Band: " + artists)
                            console.log("Venue: " + venue);
                            console.log("Location: " + locationCountry,locationRegion,locationCity);
                            console.log("Event dates: " + moment(dates).format('MMMM Do YYYY, h:mm:ss a'));

                            }
                        })
                        .catch(function onError(error) {   
                            
                            console.log(error);  });     
                        }
                    }

