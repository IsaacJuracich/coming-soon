process.on('uncaughtException', function(err) {
    console.error(err);
    console.log("Node NOT Exiting...");
  });
  
  (async () => {
    const fs = require("fs")
    const path = require("path")
    var bodyParser = require('body-parser')
  
    const express = require('express')
    const http = require('http')
  
    const app = express()
  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(require('cors')())
    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "127.0.0.1:5000");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      }
    app.use(allowCrossDomain)
    app.use(express.static(__dirname + "/static"))

    app.use(async (req, res, next) => {

    })
    const httpServer = http.createServer(app)
    httpServer.listen(3000, () => {
      console.log('HTTP Server running on port 3000')
    });
  })()
  