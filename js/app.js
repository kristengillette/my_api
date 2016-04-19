//Find albums with "run" in them
var spotifyAPI = "https://api.spotify.com/v1/search";
var albumHTML = "";
var spotifyAlbumAPI = "https://api.spotify.com/v1/albums/";
var search = "run";

//function to get individual album api:
function getAlbumInfo(callback) {
    $.getJSON(spotifyAPI, {
        q: search,
        type: "album"
    }, function(data) {
        var array = [];
        $.each(data.albums.items, function(i, album) {
            array.push(spotifyAlbumAPI + album.id);
        });
        callback(array);
    });
}

getAlbumInfo(function(result) {

    //get additional info from api to create photo list:   
    function createAlbumList() {
        $.each(result, function(i, album) {
            $.getJSON(result[i], {
                q: search,
                type: "album"
            }, function(data) {
                albumHTML += '<li data-name="' + data.artists[0].name + '">';
                albumHTML += '<a href="' + data.images[0].url + '" data-lightbox="albums" data-title="';
                albumHTML += 'Album Name: ' + data.name + '</br>';
                albumHTML += 'Artist Name: ' + data.artists[0].name + '</br>';
                albumHTML += 'Release Date: ' + data.release_date + '</br>';
                albumHTML += 'SpotifyURL: ' + data.external_urls.spotify + '</br>';
                albumHTML += '">';
                albumHTML += '<img src="' + data.images[0].url + '"></a></li>';
                $('.albums').html(albumHTML);
            });
        });
    }
    createAlbumList();
});

//Find movies with "run" in them
var OMDBAPI = "http://www.omdbapi.com/?";
var movie = "run";
var movieHTML = "";
$.getJSON(OMDBAPI, {
    s: movie,
    r: "json"
}, function(data) {
    $.each(data.Search, function(i, movie) {
        movieHTML += '<li data-name="' + movie.Year + '">';
        movieHTML += '<a href="' + movie.Poster + '" data-lightbox="albums" data-title="';
        movieHTML += 'Title: ' + movie.Title + '</br>';
        movieHTML += 'Release Date: ' + movie.Year + '</br>';
        movieHTML += '">';
        movieHTML += '<img src="' + movie.Poster + '" alt="' + movie.Title + '"></a></li>';
        $('.movies').html(movieHTML);
    });
});


$('#artist-sort').click(function() {
    tinysort('ul.albums>li', { attr: 'data-name' });
});

$('#album-sort').click(function() {
    tinysort('ul.albums>li', { selector: 'img', attr: 'alt' });
});

$('#year-sort').click(function() {
    tinysort('ul.movies>li', { attr: 'data-name' });
});

$('#title-sort').click(function() {
    tinysort('ul.movies>li', { selector: 'img', attr: 'alt' });
});
