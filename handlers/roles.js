
var constants = require('../constants/mainConstants');

function isAdmin(req, res, next) {
    var err;
    if (req.roles.type == constants.ROLES.ADMIN) {

    } else {
        err = new Error('is not admin');
        next(err);
    }

}
exports.isAdmin = isAdmin;

function isStudent(req,res, next) {
    var err;
    if (req.roles.type == constants.ROLES.STUDENT) {

    } else {
        err = new Error('is not student');
        next(err);
    }

}
exports.isStudent = isStudent;

function isTeacher(req,res, next) {
    var err;
    if (req.roles.type == constants.ROLES.TEACHER) {

    } else {
        err = new Error('is not teacher');
        next(err);
    }

}
exports.isTeacher = isTeacher;

