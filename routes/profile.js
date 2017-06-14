var express = require('express');
var router = express.Router();
var http = require('http');
var Vainglory = require('vainglory');
var firebase = require('firebase');
// require('firebase/auth');
// require('firebase/database');
// Load the full build.
const _ = require('lodash');
const request = require('request');
const fb = firebase.initializeApp({
    databaseURL: 'https://halcyonity-55c5d.firebaseio.com',
    serviceAccount: '../google-services.json', //this is file that I downloaded from Firebase Console
});


const options = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'sg',
  title: 'semc-vainglory',
};

const listHeroes = ["ringo", "gwen", "baptiste",
                    "baron", "blackfeather", "celeste",
                    "idris", "kestrel", "samuel",
                    "saw","skaarf","skye","vox","alpha","glaive","grumpjaw",
                    "joule","koshka","krull",
                    "ozo","petal","reim",
                    "rona","taka","adagio",
                    "ardan","catherine","flicker","fortress",
                    "lance","lyra","phinn"];

const heroes = [];
heroes["ringo"] = "Carry";
heroes["gwen"] = "Carry";
heroes["baptiste"] = "Carry";
heroes["baron"] = "Carry";
heroes["blackfeather"] = "Carry";
heroes["celeste"] = "Carry";
heroes["idris"] = "Carry";
heroes["kestrel"] = "Carry";
heroes["samuel"] = "Carry";
heroes["saw"] = "Carry";
heroes["skaarf"] = "Carry";
heroes["skye"] = "Carry";
heroes["vox"] = "Carry";
heroes["alpha"] = "Jungler";
heroes["glaive"] = "Jungler";
heroes["grumpjaw"] = "Jungler";
heroes["joule"] = "Jungler";
heroes["koshka"] = "Jungler";
heroes["krull"] = "Jungler";
heroes["ozo"] = "Jungler";
heroes["petal"] = "Jungler";
heroes["reim"] = "Jungler";
heroes["rona"] = "Jungler";
heroes["taka"] = "Jungler";
heroes["adagio"] = "Captain";
heroes["ardan"] = "Captain";
heroes["catherine"] = "Captain";
heroes["flicker"] = "Captain";
heroes["fortress"] = "Captain";
heroes["lance"] = "Captain";
heroes["lyra"] = "Captain";
heroes["phinn"] = "Captain";

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

router.get('/getAllMatchByPlayerName/:ign', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const playerNames = [req.params.ign];
    var now = new Date();
    var minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 368);

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
        playerNames: [playerNames],
        teamNames: [],
      },
    };

    vainglory.matches.collection(queryOptions).then((matches) => {
      if (matches.errors) {
        // return console.log(matches);
        res.send(matches);
      }
      // console.log(matches);
      // console.log(matches.data.length);
      // console.log(" first data " , matches.data[0].attributes.createdAt);
      // console.log(" last data " , matches.data[ (matches.data.length - 1 )].attributes.createdAt);
      matches.playedHeroes = [];
      matches.playedHeroesGrouped = {};
      matches.scoreDetail = {win:0, lose:0};
      matches.totalSide = {blue:0,red:0};

      matches.match.map(e=>{
        e.playerMatch = {};
        e.side = null;
        // e.playedHeroes = [];

        e.matchRoster.forEach(each=>{

          each.rosterParticipants.forEach(player=>{

            if(player.participantPlayer.data.attributes.name == playerNames){
              e.playerMatch = player;
              e.side = each.data.attributes.stats.side;
              if(each.data.attributes.stats.side == "left/blue"){
                matches.totalSide.blue += 1;
                if(player.data.attributes.stats.winner){
                  matches.scoreDetail.win += 1;
                }else{
                  matches.scoreDetail.lose += 1;
                }
              }else{
                matches.totalSide.red += 1;
                if(player.data.attributes.stats.winner){
                  matches.scoreDetail.win += 1;
                }else{
                  matches.scoreDetail.lose += 1;
                }
              }

              matches.playedHeroes.push(player.data.attributes.actor);
            }
          })
        })
      })

      matches.playedHeroesGrouped = _.groupBy(matches.playedHeroes);
      // matches.favouriteHeroe = null;
      matches.listPlayedHeroes = [];
      Object.keys(matches.playedHeroesGrouped).forEach(function(key) {
        matches.listPlayedHeroes.push({role: heroes[matches.playedHeroesGrouped[key][0].replace("*", "").replace("*", "").toLowerCase()],hero:matches.playedHeroesGrouped[key][0].replace("*", "").replace("*", ""), totalPlayed: matches.playedHeroesGrouped[key].length })
        // console.log(key, obj[key]);
      });
      matches.listPlayedHeroes = _.orderBy(matches.listPlayedHeroes, ['totalPlayed'], ['desc']);
      // matches.match.forEach(each)
      matches.listTotalPlayByRole = [{role:"Jungler", totalPlayed:0},{role:"Captain", totalPlayed:0}, {role:"Carry", totalPlayed:0}];
      var Jungler = 0;
      var Captain = 0;
      var Carry = 0;
      matches.listPlayedHeroes.forEach(e=>{
        if(e.role == "Jungler"){
          Jungler += e.totalPlayed;
          matches.listTotalPlayByRole[0].totalPlayed = Jungler;
        }else if(e.role == "Captain"){
          Captain += e.totalPlayed;
          matches.listTotalPlayByRole[1].totalPlayed = Captain;
        }else if(e.role == "Carry"){
          Carry += e.totalPlayed;
          matches.listTotalPlayByRole[2].totalPlayed = Carry;
        }
      });
      matches.listPlayedAllHeroes = [];
      listHeroes.forEach(e=>{
        var a = _.find(matches.listPlayedHeroes, function(o) {
          return o.hero.toLowerCase() == e;
        });
        if(a != undefined){
          matches.listPlayedAllHeroes.push({hero:e, totalPlayed: a.totalPlayed});
        }else{
          matches.listPlayedAllHeroes.push({hero:e, totalPlayed: 0});
        }
      })
      matches.listPlayedAllHeroes = _.orderBy(matches.listPlayedAllHeroes, ['totalPlayed'], ['desc']);
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


router.get('/getPlayerByName/:ign/:deviceId', function(req, res, next){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const playerNames = [req.params.ign];
    const deviceId = [req.params.deviceId];

    var ref = fb.database().ref("/email");
    ref.once("value")
      .then(function(snapshot) {
      console.log(snapshot.val());

    });
    vainglory.players.getByName(playerNames).then((player) => {
      if (player.errors) return;

      fb.database().ref('/users/' + deviceId).set(player);
      fb.database().ref('/players/' + player).set(player);
      // console.log(player.stats);
      res.send(player);
    }).catch((errors) => {
      console.log(errors);
      res.send(errors);
    });
});



module.exports = router;
