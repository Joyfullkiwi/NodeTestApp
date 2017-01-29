/*global process*/
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var connection;
var app;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('./config/' + process.env.NODE_ENV);

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME);
connection = mongoose.connection;


connection.once('connected', function () {
    connection.mongoose = mongoose;
    require('./models/index.js');

    app = require('./app')(connection);
    //routes
    var userRouter = require('./routes/user');




    console.log('====================================================================');
    console.log('Database was successfully connected "' + 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '"');

    app.listen(process.env.APP_PORT, function () {
        console.log('Server successfully started at port ' + process.env.APP_PORT + ' in ' + process.env.NODE_ENV + '...');
        console.log('====================================================================\n');
    });
});

connection.on('error', function (err) {

    console.error(err);
});

