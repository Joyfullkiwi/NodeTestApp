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

        var id = req.params.id;
        var body = req.body;

        StudentModel.findOneAndUpdate({_id: id}, {$set : body}).exec(function (err, student) {
            if (err) {
                console.log(err);
                return next(err);
            }

            res.status(200).send(student);

        });

    };





    this.removeStudent = function (req, res, next) {
        var id = req.params.id;
        StudentModel.remove({_id: id})
            .exec(function (err, data) {
                if (err) {
                    //res.status(500).send({error: 'error: ' + err});
                    return next(err);
                }
                console.log('data: ' + data);
                res.status(200).send(data);

            });
    };
    
    this.createComment = function (req, res, next) {

    }

};


module.exports = Module;