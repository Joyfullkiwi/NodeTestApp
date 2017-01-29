module.exports = function (db) {
  'use strict';
  var express = require('express');

  var https = require('https');
  var app = express();

  var http = require('http').Server(app);
  var fs = require('fs');
  var path = require('path');
  var socket = require('socket.io');
  var server;

  var bodyParser = require('body-parser');
  var session = require('express-session');
  var cookieParser = require('cookie-parser');

  var MemoryStore = require('connect-mongo')(session);
  var sessionOptions = require('./config/session')(db, MemoryStore);
  var io = require('socket.io')(http);

  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json({strict: false, inflate: true, limit: 1024 * 1024 * 200}));
  app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200})); // https://www.npmjs.com/package/body-parser
//app.use(express.static(path.join(_dirname,'public))); statuchno
  app.use(cookieParser('StudentKey'));


  app.use(session(sessionOptions));

  require('./routes/index')(app, db);

  return app;
};