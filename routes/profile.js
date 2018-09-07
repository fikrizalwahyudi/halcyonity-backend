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
                    "joule","koshka","krul",
                    "ozo","petal","reim",
                    "rona","taka","adagio",
                    "ardan","catherine","flicker","fortress",
                    "lance","lyra","phinn", "grace", "reza", "curnwalker", 'lorelai'];

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
heroes["krul"] = "Jungler";
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
heroes["grace"] = "Captain";
heroes["reza"] = "Jungler";
heroes["lorelai"] = "Captain";

const vainglory = new Vainglory('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNjgyNjUyMC03ZTljLTAxMzUtNjRiYS0zNjdmN2QwZjllMWQiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTA1NzM4MjYyLCJwdWIiOiJzZW1jIiwidGl0bGUiOiJ2YWluZ2xvcnkiLCJhcHAiOiJjNDZhNjBmMC1kY2RiLTAxMzQtNWRmZi0wMjQyYWMxMTAwMDQiLCJzY29wZSI6ImNvbW11bml0eSIsImxpbWl0IjoxMDB9.qGKhfB4Ak_lk1M1po0oPaF1EQxdNSOGhDEkgsP2V1N8', options);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Set the headers
  AUTH_STRING = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNjgyNjUyMC03ZTljLTAxMzUtNjRiYS0zNjdmN2QwZjllMWQiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTA1NzM4MjYyLCJwdWIiOiJzZW1jIiwidGl0bGUiOiJ2YWluZ2xvcnkiLCJhcHAiOiJjNDZhNjBmMC1kY2RiLTAxMzQtNWRmZi0wMjQyYWMxMTAwMDQiLCJzY29wZSI6ImNvbW11bml0eSIsImxpbWl0IjoxMDB9.qGKhfB4Ak_lk1M1po0oPaF1EQxdNSOGhDEkgsP2V1N8";
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

router.post('/getMatchDetailStats', function(req, res){
  console.log(req.body.strUrl);
  console.log(req.body);
});

router.get('/getDataTest', function(req,res){
  res.send("hahahaha");
});

//tell express what to do when the /about route is requested
router.post('/test', function(req, res){
  //mimic a slow network connection
  // setTimeout(function(){

  //     res.send(JSON.stringify({
  //         firstName: req.body.firstName || null,
  //         lastName: req.body.lastName || null
  //     }));

  // }, 1000)

  var url = "https://cdn.gamelockerapp.com/semc-vainglory/sg/2017/11/20/04/15/7e2ce278-cda9-11e7-b2e4-0a586460a7e3-telemetry.json";

  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
          res.setHeader('Content-Type', 'application/json');
          // console.log(body) // Print the json response
          var listKillActor;
          var listLearnAbility;
          var listHero = _.filter(body, function(item){
            // item.type
            return item.type === 'HeroSelect';
          });
          var listLearnAbility = _.filter(body, function(item){
            // item.type
            return item.type === 'LearnAbility';
          });
          // listKillActor.forEach(e=>{
          //   // console.log("ini", e);
          // })
          listKillActor = _.filter(body, function(item){
            // item.type
            return item.type === 'KillActor' ;
          });


          // listKillActor = _.filter(listKillActor, { 'type': 'KillActor' });
          // console.log(listKillActor);
          listKillActor = listKillActor.sort(function compare(a, b) {
            var dateA = new Date(a.time);
            var dateB = new Date(b.time);
            return dateA - dateB;
          });

          listHero.map(e=>{
            var arr = [];
            var arrAbility=[];
            listLearnAbility.forEach(ability=>{
              if(ability.payload.Actor === e.payload.Hero){
                arrAbility.push(ability.payload.Ability);
              }
            })
            e.payload.crystalLastHit = false;
            e.payload.krakenLastHit = [];
            for (var i = 0; i < listKillActor.length; i++) {
              if(listKillActor[i].payload.Actor == e.payload.Hero && listKillActor[i].payload.Killed === "*VainCrystalAway*"){
                e.payload.crystalLastHit = true;
              }

              if(listKillActor[i].payload.Actor == e.payload.Hero && listKillActor[i].payload.Killed === "*Kraken_Jungle*"){
                e.payload.krakenLastHit.push(1);
              }

              if(listKillActor[i].payload.Actor == e.payload.Hero && listKillActor[i].payload.TargetIsHero === 1){
                arr.push(1);
              }else if(listKillActor[i].payload.Killed == e.payload.Hero && listKillActor[i].payload.TargetIsHero === 1){
                arr.push(0);
              }

              // Iterate over numeric indexes from 0 to 5, as everyone expects.
              // console.log(listKillActor[i]);
            }
            // console.log("arr", arr);
            console.log("arrAbility"), arrAbility;
            let streaks = arr.reduce((res, n) => (n ? res[res.length-1]++ : res.push(0), res), [0]);
            e.payload.killStreak = Math.max(...streaks)
            e.payload.abilityBuild = arrAbility;
            // e.payload.killStreakArray = arr;
          })
          // console.log("Max Streak", Math.max(...streaks));
          console.log("list  HERO", listHero);
          // console.log("arr", arr);
          res.send(listHero);
      }
  })
  //debugging output for the terminal
  console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
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

    vainglory.region('sg').players.getByName(playerNames).then((player) => {
      if (player.errors) return;
      console.log(player.id);
      console.log(player.stats);
      res.send(player);
    }).catch((errors) => {
      console.log(errors);
    });
});


router.get('/getAllMatchByPlayerName/:ign/:server', function(req,res,next){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    const playerNames = [req.params.ign];
    const server = [req.params.server];
    // const patch = [req.params.patch];
    var now = new Date();
    const minus28days = new Date();
    minus28days.setDate(now.getDate() - 28);
    // ;
    // var minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 368);

    /* defaults */
    var queryOptions = {
      page: {
        offset: 0,
        limit: 50,
      },
      sort: '-createdAt', // -createdAt for reverse
      filter: {
        // 'createdAt-start': minus28days.toISOString(), // ISO Date
        // 'createdAt-end': now.toISOString(), // ISO Date
        // gameMode: ['ranked'],
        playerNames: [playerNames],
        teamNames: [],
      },
    };

    vainglory.region(server[0]).matches.collection(queryOptions).then((matches) => {
      var params = {
        ign : playerNames[0],
        server: server[0],
        offset:matches.match.length,
        limit:50
      }
      getAnotherMatch(params).then(e=>{
        console.log("before", matches.data.length);
        console.log("before", matches.match.length);
        matches.match = matches.match.concat(e.match);
        matches.data = matches.data.concat(e.data);
        console.log("after", matches.match.length);
        console.log("after", matches.data.length);
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

      });

    }).catch((errors) => {
      console.log(errors);
    });

});

function getAnotherMatch(data) {
  // console.log(data);
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  const playerNames = data.ign;
  const server = data.server;
  const offsetData = data.offset;
  const limitData = data.limit;
  var now = new Date();
  const minus28days = new Date();
  minus28days.setDate(now.getDate() - 28);
  // ;
  // var minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 368);

  /* defaults */
  var queryOptions = {
    page: {
      offset: offsetData,
      limit: limitData,
    },
    sort: '-createdAt', // -createdAt for reverse
    filter: {
      // 'createdAt-start': minus28days.toISOString(), // ISO Date
      // 'createdAt-end': now.toISOString(), // ISO Date
      // gameMode: ['ranked'],
      playerNames: [playerNames],
      teamNames: [],
    },
  };

  return vainglory.region(server).matches.collection(queryOptions).then((matches) => {
    console.log(matches);
    if (matches.errors) {
      // return console.log(matches);
      return matches;
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
    // res.send(matches);
    return matches;
  }).catch((errors) => {
    console.log(errors);
    return errors;
  });
}

router.get('/getAllMatchByPlayerName/:ign/:server/:offset/:limit', function(req,res,next){

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


      const playerNames = [req.params.ign];
      const server = [req.params.server];
      const offsetData = [req.params.offset];
      const limitData = [req.params.limit];
      var now = new Date();
      const minus28days = new Date();
      minus28days.setDate(now.getDate() - 28);
      // ;
      // var minus3Hours = new Date(new Date() * 1 - 1000 * 3600 * 368);

      /* defaults */
      var queryOptions = {
        page: {
          offset: offsetData,
          limit: limitData,
        },
        sort: '-createdAt', // -createdAt for reverse
        filter: {
          // 'createdAt-start': minus28days.toISOString(), // ISO Date
          // 'createdAt-end': now.toISOString(), // ISO Date
          // gameMode: ['ranked'],
          playerNames: [playerNames],
          teamNames: [],
        },
      };

      vainglory.region(server[0]).matches.collection(queryOptions).then((matches) => {
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

router.get('/getAllMatchByPlayerName/:ign', function(req,res,next){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    const playerNames = [req.params.ign];
    // const server = [req.params.server];
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

    vainglory.region('sg').matches.collection(queryOptions).then((matches) => {
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


router.get('/getPlayerByName/:ign/:deviceId/:server', function(req, res, next){


    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const playerNames = [req.params.ign];
    const deviceId = [req.params.deviceId];
    const server = [req.params.server];
    console.log(server[0]);
    console.log(playerNames[0]);
    console.log(deviceId[0]);

    // var ref = fb.database().ref("/email");
    // ref.once("value")
    //   .then(function(snapshot) {
    //   console.log(snapshot.val());
    //
    // });
    vainglory.region(server[0]).players.getByName(playerNames).then((player) => {
      if (player.errors) return;

      fb.database().ref('/users/' + deviceId[0]).set(player);
      fb.database().ref('/players/' + playerNames[0]).set(player);
      // console.log(player.stats);
      res.send(player);
    }).catch((errors) => {
      console.log(errors);
      res.send(errors);
    });
});

router.get('/getPlayerByName/:ign', function(req, res, next){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const playerNames = [req.params.ign];
    // const deviceId = [req.params.deviceId];

    // var ref = fb.database().ref("/email");
    // ref.once("value")
    //   .then(function(snapshot) {
    //   console.log(snapshot.val());
    //
    // });
    vainglory.players.getByName(playerNames).then((player) => {
      if (player.errors) return;

      fb.database().ref('/users/oldVersion').set(player);
      fb.database().ref('/players/' + playerNames).set(player);
      // console.log(player.stats);
      res.send(player);
    }).catch((errors) => {
      console.log(errors);
      res.send(errors);
    });
});



module.exports = router;
