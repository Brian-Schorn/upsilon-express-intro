$(function(){
  console.log('document loaded');

  getSongs();

  $('#addSong').on('submit', addSong);


});


function addSong(event) {
  //Stops browser from refreshing
  event.preventDefault();
  $('#errorZone').empty();

  var songData = $(this).serialize();
  // console.log(songData);
  $(this).closest('form').find("input[type=text], textarea").val("");

  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    success: getSongs,
    error: displayFailed

  });

}

function getSongs() {
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });
}


function displayFailed(errorText) {
  console.log(errorText);
  $('#errorZone').text(errorText.responseText);
}

function displaySongs(songs) {
  console.log(songs);
  $('#songs').empty();
  songs.forEach(function(song){
    if(song.hasOwnProperty('dateAdded')){
      $('#songs').append('<li>' + song.title + ". By: " + song.artist + '. From: ' + song.album + '. Date Added: ' + song.dateAdded + '</li>');
    }else{
      $('#songs').append('<li>' + song.title + ". By: " + song.artist + '. From: ' + song.album + '</li>');
  }

  });
}
