var express = require('express');
var router = express.Router();
var Handler = require('../handlers/admin.js');
var expressSession = require('../handlers/expressSession');

module.exports = function (models) {
    var handler = new Handler(models);

    router.get('/students/');

    router.delete('/users/:id');



    return router;
};