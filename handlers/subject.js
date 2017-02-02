var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var subjectSchema = mongoose.Schemas.subject;

var Module = function (models) {

    var SubjectModel = models.get('subject',subjectSchema);

    this.createSubject = function (req, res, next) {
        var body = req.body;
        SubjectModel.create(body, function (err, data) {
            if(err){
                return next(err);
            }
            res.status(200).send(data);
        })

    };

    this.updateSubject = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        SubjectModel.findOneAndUpdate({_id: id}, {$set: body},{new:true}).exec(function (err, result) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.status(200).send(result);
            }
        });
    };


    this.removeSubject = function (req, res, next) {
        var id = req.params.id;
        SubjectModel.remove({_id: id})
            .exec(function (err, respons) {
                if (err) {
                    res.status(500).send({error: 'error: ' + err});
                    return next(err);
                }
                console.log('data: ' + respons);
                res.status(200).send(respons);
            });
    };




};

module.exports = Module;