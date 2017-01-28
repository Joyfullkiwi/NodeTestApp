var ejs = require('ejs');
var mongoose = require('mongoose');
var profileSchema = mongoose.Schemas.profile;


var Module = function (models) {
    "use strict";
    var ProfileModel = models.get('user', userSchema);

    this.createProfile = function (res, req, data) {



    };
    this.getProfile = function (res, req, next) {

    };
    this.updateProfile = function (res, req, next) {

    };
    this.removeProfile = function (res, req, next) {

    };
};


module.exports = Module;