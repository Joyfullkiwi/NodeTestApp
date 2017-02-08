var ejs = require('ejs');
var mongoose = require('mongoose');
var profileSchema = mongoose.Schemas.profile;


var Module = function (models) {
    "use strict";
    var ProfileModel = models.get('user', profileSchema);

    this.createProfile = function (res, req, next) {

        var body = req.body;
        var profile = new ProfileModel(body);
        profile.save(function (err, profile) {
            if(err){
                return next(err);
            }
            res.status(200).send({success:profile});
        });
    };

    this.getProfile = function (res, req, next) {

        var query = req.query;
        var criteria = query.
        ProfileModel.find(criteria).populate('friends', 'firstName lastName').exec(function (err, students) {
            if(err){
                return next(err);
            }
            res.status(200).send(students);

        })
    };

    this.updateProfile = function (res, req, next) {
        var id = req.params.id;
        var body = req.body;
        ProfileModel.update({_id: id}, {$set: body},{new:true}).exec(function (err, data) {
            if (err) {
                throw err;
            }
            res.status(200).send(data);
        });
    };
    this.removeProfile = function (res, req, next) {
        var id = req.params.id;
        ProfileModel.remove({_id: id}).exec(function (err, data) {
            if (err) {
                throw err;
            }


            res.sendStatus(200).send(data);
        });
    };
};


module.exports = Module;