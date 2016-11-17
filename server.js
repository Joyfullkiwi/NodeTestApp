'use strict';
var mongoose = require('mongoose');//pidkl

var port = 3030;
var connection;

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
require('./config/' + process.env.NODE_ENV);

//mongodb://host:port/name  //persuj param u metodi
mongoose.connect('mongoose://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME);
connection=mongoose.connection;

connection.once('connected',function () {
    var app = require('./app')();

    app.listen(port, function () {
        console.log('==============================================================');
        console.log('server start success on port=' + port + ' in ' + process.env.NODE_ENV);
        console.log('==============================================================\n');
    });
});

connection.on('connected',function (err) {
console.error(err)
});
