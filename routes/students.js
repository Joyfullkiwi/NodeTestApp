var express = require('express');
var router = express.Router();
var Handler = require('../handlers/student.js');

module.exports = function (models) {

    var handler = new Handler(models);

    router.get('/', handler.getStudents);

    router.get('/getWithLookup', handler.getWithLookup);

    router.get('/:id', handler.getStudents);

    router.post('/', handler.createStudent);

    router.patch('/:id', handler.updateStudents);

    router.delete('/:id', handler.deleteStudent);

    return router;

};
