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
        delete req.body._id;
        TeacherModel.update({_id: req.params._id}, req.body, function (err, result) {
            if (err) {
                console.log(err);

                return next(err);
            } else {
                res.status(200).send(result);
            }
        });
    };

    this.removeTeacher = function (req, res, next) {
        TeacherModel.remove(req.params)
            .exec(function (err, data) {
                if (err) {
                    res.status(500).send({error: 'error: ' + err});
                }
                else {
                    console.log('data: ' + data);
                    return next(err);
                }
            });
    };



};

module.exports = Module;