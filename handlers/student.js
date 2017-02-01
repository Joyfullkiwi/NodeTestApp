var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var studentSchema = mongoose.Schemas.student;

var Module = function (models) {

    var StudentModel = models.get('student', studentSchema);

    this.createStudent = function (req, res, next) {
        var body = req.body;
        StudentModel.create(body, function (err, data) {
            if(err){
                return next(err);
            }
            res.status(200).send(data);
        })

    };


    // this.editStudent = function (req, res, next) {

    this.getStudent = function (req, res, next) {
        var query = req.query;
        var criteria = query.age ? {age: {$gt: parseInt(query.age, 20)}} : {};
        StudentModel.find(criteria).populate('friends', 'firstName lastName').exec(function (err, students) {
            if(err){
                return next(err);
            }
            res.status(200).send(students);

        })
    };

    this.getStudentById = function (req, res, next) {
        StudentModel.findOne({_id: req.params._id}, function (err, data) {
            if (err) {
                return next(err);
                // res.status(500).send({error: "Can\'t find stu"});
            }
            StudentModel.populate(data, {
                select: 'firstName lastName'
            }, function (err, data) {
                res.status(200).send(data);
            });
        });
    };

    this.updateStudent = function (req, res, next) {
        try {
            delete req.body._id;
            StudentModel.update({_id: req.params._id}, req.body, function (err, result) {
                if (err) {
                    console.log(err);

                    return next(err);
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (err) {

        }
    };

    this.removeStudent = function (req, res, next) {
        StudentModel.remove(req.params)
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