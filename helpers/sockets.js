/**
 * Created by Asus on 14.01.2017.
 */
var redis = require('redis');
var debug = require('debug');

var io;

function onError(err) {
    'use strict';
    if(err) {
        return console.log(err.message || err);
    }
    
}
module.exports = function (server) {
    'use strict';
    if(io){
        debug('Return changed socket.io');
        return io;
    };

    debug('Initialize socket.io');

    var adapter= require('socket.io-redis');
    var pub = redis.createClient(
        parseInt(process.env.SOCKET_DB_PORT),
         process.env.SOCKET_DB_HOST,
        {
            return_buffers: true
        }
    );

    io = require('socket.io')(
        server,//1p server 2 options
        {
            transport:['websocket']//na kakom protokole budet slushat server ili pollling
            //cherez etot protokol server po defolty razreshaet soedinenie dla klienta
        }
    );
    io.adapter(
        adapter({
            //pubClient:pub,
            //subClient:sub
        })
    );
};