var ejs = require('ejs');
var mongoose = require('mongoose');
var groupSchema = mongoose.Schemas.group;


var Module = function (models) {
    "use strict";
    var GroupModel = models.get('group', groupSchema);

//by admin & teacher
    this.createGroup = function (req, res, next) {
        var body =req.body;
        var group = new GroupModel(body);
        GroupModel.find({groupName: body.groupName}, function (err, data) {
            if(err){
                console.log(err);
                res.send(500, { error: 'Group.create find error' });
                return next(err);
            }
            if(data.length > 0){
                res.send(400, { error: 'An group with the same name is already exists' });
            }
            if (data.length === 0) {

               group.save(function (err, group) {
                    if(err){
                        return next(err);
                    }
                    res.status(200).send({success:group});

                });

            }

        });
        
       // function saveData(data) {
       // }
    };

    this.updateGroup = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        GroupModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, data){

            if(err){
                return next(err);
            }
            res.status(200).send(data);
        });
    };

    this.removeGroup = function (req, res, next) {
        var id = req.params.id;
        GroupModel.remove({_id: id}).exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.sendStatus(200).send(data);
        });
    };



};


module.exports = Module;