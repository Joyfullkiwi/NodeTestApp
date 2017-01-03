var express = require('express');
var router = express.Router();
var Handler = require('../handlers/subject.js');

module.exports = function (models) {

    var handler = new Handler(models);

    router.get('/', handler.getSubjects);

    router.get('/getWithLookup', handler.getWithLookup);

    router.get('/:id', handler.getSubjects);

    router.post('/', handler.createSubject);

    router.patch('/:id', handler.updateSubjects);

    router.delete('/:id', handler.deleteSubject);

    return router;

};