var ejs = require('ejs');
var mongoose = require('mongoose');
var profileSchema = mongoose.Schemas.profile;


var Module = function (models) {
    "use strict";
    var ProfileModel = models.get('user', userSchema);

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

    };
    this.updateProfile = function (res, req, next) {

    };
    this.removeProfile = function (res, req, next) {

    };
};


module.exports = Module;