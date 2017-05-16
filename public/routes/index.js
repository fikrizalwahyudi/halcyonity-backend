var express = require('express');
var router = express.Router();
var http = require('http');
const request = require('request');

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

module.exports = router;
