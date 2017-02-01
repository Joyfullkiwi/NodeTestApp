var ejs = require('ejs');
var mongoose = require('mongoose');
var profileSchema = mongoose.Schemas.profile;


var Module = function (models) {
    "use strict";
    var ProfileModel = models.get('user', profileSchema);

    this.createProfile = function (res, req, next) {

        var body = req.body;
        var profile = new ProfileModel(body);

        if (req.session.uId) {

            profile.createdBy.user = req.session.uId;
            profile.editedBy.user = req.session.uId;

        }


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
        ProfileModel.update(req.params.id, req.body).exec(function (err, data) {
            if (err) {
                throw err;
            }
            res.status(200).send(data);
        });
    };
    this.removeProfile = function (res, req, next) {
        ProfileModel.remove(req.params).exec(function (err, data) {
            if (err) {
                throw err;
            }


            res.sendStatus(200).send(data);
        });
    };
};


module.exports = Module;