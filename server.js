var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var songs = require('./data.json');
var app = express();
var testTitle;

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
  console.log('req.body:' + req.body);
  // var x = req.body.title;
  // console.log(x);
  if(req.body.title != ""){
    if(req.body.artist != ""){
      if(req.body.album != ""){
        console.log("Valid Entry");
        testTitle = req.body.title;
        if(songs.every(isDuplicate)){
          console.log("Did not match any other song titles");
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();

          if(dd<10) {
            dd='0'+dd
          }

          if(mm<10) {
            mm='0'+mm
          }

          req.body.dateAdded = mm+'/'+dd+'/'+yyyy;
          songs.push(req.body);
          res.sendStatus(200);
        }else{
          console.log("Your entry appears to be a duplicate");
          res.sendStatus(400);
        }
      }else{
        console.log("Invalid Entry on Album");
        res.sendStatus(400);
      }
    }else{
      console.log("Invalid Entry on Artist");
      res.sendStatus(400);
    }
  }else{
    console.log("Invalid Entry on Title");
    res.sendStatus(400);
  }
});

app.listen(3000);

function isDuplicate(element, index, array){
  return element.title != testTitle;
}
