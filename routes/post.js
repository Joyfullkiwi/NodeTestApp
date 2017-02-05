var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post.js');
var expressSession = require('../handlers/expressSession');

module.exports = function (models) {
    var handler = new Handler(models);

    router.post('/',handler.createPost);

    router.get('/', handler.getPost);

    router.put('/',handler.updatePost);

    router.get('/:id', handler.getPostById);

    router.delete('/',handler.removePost);


    return router;
};