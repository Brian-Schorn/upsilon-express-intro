$(function(){
  console.log('document loaded');

  getSongs();

  $('#addSong').on('submit', addSong);


});


function addSong(event) {
  //Stops browser from refreshing
  event.preventDefault();

  var songData = $(this).serialize();
  console.log(songData);

  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    success: getSongs

  });
}

function getSongs() {
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });
}


function displaySongs(songs) {
  console.log(songs);
  $('#songs').empty();
  songs.forEach(function(song){
    $('#songs').append('<li>' + song.title + ". By: " + song.artist + '. From: ' + song.album + '</li>')

  });
}
