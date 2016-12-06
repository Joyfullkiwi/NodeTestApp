'use strict';

module.exports = function (connection, Store) {
    return {
        name             : 'key',
        key              : 'StudentKey',
        secret           : 'qwertyuiopasdfghkl',
        saveUninitialized: true,
        resave           : false,
        store            : new Store({
            mongooseConnection: connection
        }),

        cookie: {
            httpOnly: true,
            maxAge  : 31 * 24 * 60 * 60 * 1000 // One month
        }
    };
};
