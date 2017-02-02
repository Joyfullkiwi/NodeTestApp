var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var markSchema = mongoose.Schemas.mark;


var Module = function (models) {


    var MarksModel = models.get('mark', markSchema);

    //by teacher
    this.createMark = function (req, res, next) {
        var body = req.body;
        MarksModel.create(body, function (err, data) {
            if(err){
                return next(err);
            }
            res.status(200).send(data);
        })

    };


    this.getMark = function (req, res, next) {
        var query = req.query;

       // var criteria =  query.

       /* MarksModel.find(criteria).populate().exec(function (err, users) {
            if (err) {
                return next(err);
            }
            res.status(200).send(users);
        });*/
    };


};

module.exports = Module;