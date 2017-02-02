var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var teacherShema = mongoose.Schemas.teacher;

var Module = function (models) {

    var TeacherModel = models.get('teacher',teacherShema);

    this.createTeacher = function (req, res, next) {
        var body = req.body;
        TeacherModel.create(body, function (err, data) {
            if(err){
                return next(err);
            }
            res.status(200).send(data);
        })

    };

    this.updateTeacher = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        TeacherModel.findOneAndUpdate({_id: id}, {$set: body},{new:true}).exec(function (err, result) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.status(200).send(result);
            }
        });
    };


    this.removeTeacher = function (req, res, next) {
        var id = req.params.id;
        TeacherModel.remove({_id: id})
            .exec(function (err, respons) {
                if (err) {
                    res.status(500).send({error: 'error: ' + err});
                    return next(err);
                }
                console.log('data: ' + respons);
                res.status(200).send(respons);
            });
    };

    this.getTeachers = function (req, res, next) {
        var query = req.query;

        var criteria =  query.groups;

        TeacherModel.find(criteria).populate('groups', 'firstName lastName').exec(function (err, users) {
            if (err) {
                return next(err);
            }
            res.status(200).send(users);
        });
    };

    this.getTeacherById = function (req, res, next) {
        var id = req.params.id;

        TeacherModel.findOne({_id: id}).exec(function (err, teacher) {
            if (err) {
                return next(err);
            }

            res.status(200).send(teacher);
        })
    };


};

module.exports = Module;