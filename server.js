var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var songs = require('./data.json');
var app = express();

//Makes everything in the public folder visible
app.use(express.static('public'));
//Coverts any URL Encoded body into a javascript object
app.use(bodyParser.urlencoded({extended: true}));

//Respond to get request with the full file name/path of index.html in the public folder
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Responds to get request for data with the songs array of objects
app.get('/songs', function(req, res) {
  res.send(songs);
});

app.post('/songs', function(req, res){
  console.log('req.body:', req.body);
  songs.push(req.body);
  res.sendStatus(200);
});

app.listen(3000);
