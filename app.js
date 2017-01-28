module.exports = function (db) {
  'use strict';

  var http = require('http');
  var https = require('https');
  var express = require('express');
  var fs = require('fs');
  var path = require('path');
 // var redis = require('redis');
  var socket = require('socket.io');
  var io;
  var server;

  var bodyParser = require('body-parser');
  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  var redisSessionStore = require('connect-redis')(session);
 // var path = npmpath
  var app = express();

  //var redisClient = redis.createClient({
    
 // });
//  var IO = io.listen(app)

  //var io = require('./helpers/sockets')(httpServer);

  var MemoryStore = require('connect-mongo')(session);
  var sessionOptions = require('./config/session')(db, MemoryStore);

  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json({strict: false, inflate: true, limit: 1024 * 1024 * 200}));
  app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200})); // https://www.npmjs.com/package/body-parser
//app.use(express.static(path.join(_dirname,'public))); statuchno
  app.use(cookieParser('StudentKey'));

  server = http.createServer(app);
  //io = socket.server();
  //path
  app.use(session(sessionOptions));

  require('./routes/index')(app, db);

  return app;
};