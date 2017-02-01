var ejs = require('ejs');
var mongoose = require('mongoose');
var groupSchema = mongoose.Schemas.group;


var Module = function (models) {
    "use strict";
    var GroupModel = models.get('group', groupSchema);

    this.createGroup = function (req, res, next) {
        var body =req.body;
        GroupModel.create(body, function (err, data) {
            if(err){
                return next(err);
            }
            res.status(200).send(data);
        });
    };

    this.updateGroup = function (req, res, next) {
        GroupModel.update(req.params.id, req.body).exec(function (err, data){

            if(err){
                return next(err);
            }
            res.status(200).send(data);
        });
    };

    this.removeGroup = function (req, res, next) {
        GroupModel.remove(req.params).exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.sendStatus(200).send(data);
        });
    };

};


module.exports = Module;