module.exports = function (db) {
  'use strict';
  var express = require('express');
  var bodyParser = require('body-parser');
  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  var app = express();
  var MemoryStore = require('connect-mongo')(session);
  var sessionOptions = require('./config/session')(db, MemoryStore);

  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json({strict: false, inflate: true, limit: 1024 * 1024 * 200}));
  app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200})); // https://www.npmjs.com/package/body-parser

  app.use(cookieParser('StudentKey'));
  app.use(session(sessionOptions));

  require('./routes/index')(app, db);

  return app;
};