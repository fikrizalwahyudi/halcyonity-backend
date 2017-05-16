var express = require('express');
var router = express.Router();
var http = require('http');
var Vainglory = require('vainglory');

const request = require('request');

const options = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'sg',
  title: 'semc-vainglory',
};

const vainglory = new Vainglory('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNDZjMjBiMC1kY2RiLTAxMzQtNWUwMC0wMjQyYWMxMTAwMDQiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNDg3OTUzNTI0LCJwdWIiOiJzZW1jIiwidGl0bGUiOiJ2YWluZ2xvcnkiLCJhcHAiOiJjNDZhNjBmMC1kY2RiLTAxMzQtNWRmZi0wMjQyYWMxMTAwMDQiLCJzY29wZSI6ImNvbW11bml0eSIsImxpbWl0IjoxMH0.WS7uFSYlDnFALFN5CgEY7kYeBQskl1I9qRsmdpNxhH0', options);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Set the headers
  AUTH_STRING = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNDZjMjBiMC1kY2RiLTAxMzQtNWUwMC0wMjQyYWMxMTAwMDQiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNDg3OTUzNTI0LCJwdWIiOiJzZW1jIiwidGl0bGUiOiJ2YWluZ2xvcnkiLCJhcHAiOiJjNDZhNjBmMC1kY2RiLTAxMzQtNWRmZi0wMjQyYWMxMTAwMDQiLCJzY29wZSI6ImNvbW11bml0eSIsImxpbWl0IjoxMH0.WS7uFSYlDnFALFN5CgEY7kYeBQskl1I9qRsmdpNxhH0";
  const headers = {
      'Accept':       'application/vnd.api+json',
      'Content-Type': 'application/json',
      'Authorization': AUTH_STRING,
      'X-TITLE-ID':'semc-vainglory'
  }
 // var body = JSON.stringify({
 //    "transaction_details": {
 //    "order_id": "ORDER-222222",
 //    "gross_amount": 10000
 //    }
 //  })
  // Configure the request
  var options = {
      url: 'https://api.dc01.gamelockerapp.com/shards/sg/players?filter[playerNames]=volkerz',
      method: 'GET',
      headers: headers
  }
  request(options, function (error, response, body) {
          // Print out the response body
        res.send(body);
  })
});

router.get('/getMatchById', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const matchId = '1d8efb8e-37fe-11e7-9e57-02ff607182ab';
    vainglory.matches.single(matchId).then((match) => {
      // console.log(match.assets) // array of asset
      // If you'd like to resolve telemetry data
      res.send(match);
    }).catch((err) => console.error(err));
});

router.get('/getPlayerByName', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const playerNames = ['volkerz'];

    vainglory.players.getByName(playerNames).then((player) => {
      if (player.errors) return;
      console.log(player.id);
      console.log(player.stats);
      res.send(player);
    }).catch((errors) => {
      console.log(errors);
    });
});

router.get('/getAllMatchByPlayerName', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var now = new Date();
    var minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 168);

    /* defaults */
    var queryOptions = {
      page: {
        offset: 0,
        limit: 50,
      },
      sort: '-createdAt', // -createdAt for reverse
      filter: {
        'createdAt-start': minus3Hours.toISOString(), // ISO Date
        'createdAt-end': now.toISOString(), // ISO Date
        playerNames: ['volkerz'],
        teamNames: [],
      },
    };

    vainglory.matches.collection(queryOptions).then((matches) => {
      if (matches.errors) {
        // return console.log(matches);
        res.send(matches);
      }
      // console.log(matches);
      console.log(matches.data.length);
      console.log(" first data " , matches.data[0].attributes.createdAt);
      console.log(" last data " , matches.data[ (matches.data.length - 1 )].attributes.createdAt);
      res.send(matches);
    }).catch((errors) => {
      console.log(errors);
    });

});

router.get('/getAllMatch', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var now = new Date();
    var minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 24);

    /* defaults */
    var queryOptions = {
      page: {
        offset: 0,
        limit: 50,
      },
      sort: 'createdAt', // -createdAt for reverse
      filter: {
        'createdAt-start': minus3Hours.toISOString(), // ISO Date
        'createdAt-end': now.toISOString(), // ISO Date
        playerNames: [],
        teamNames: [],
      },
    };

    vainglory.matches.collection(queryOptions).then((matches) => {
      if (matches.errors) {
        // return console.log(matches);
        res.send(matches);
      }
      // console.log(matches);
      res.send(matches);
    }).catch((errors) => {
      console.log(errors);
    });

});


router.get('/getPlayerByName/:ign', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const playerNames = [req.params.ign];

    vainglory.players.getByName(playerNames).then((player) => {
      if (player.errors) return;
      console.log(player.id);
      console.log(player.stats);
      res.send(player);
    }).catch((errors) => {
      console.log(errors);
      res.send(errors);
    });
});



module.exports = router;
