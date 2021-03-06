var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var categorySchema = mongoose.Schemas.category;
var nodemailer = require('nodemailer');
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();

var Module = function (models) {
    "use strict";
    var CategoryModel = models.get('category',categorySchema);

    this.createCategory = function (req, res, next) {
        var body =req.body;
        CategoryModel.create(body, function (err, data) {
            if(err){
                return next(err);
            }
            res.status(200).send(data);
        });
    };
    
    this.updateCategory = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        CategoryModel.findOneAndUpdate({_id: id}, {$set: body},{new:true}).exec(function (err, data){

            if(err){
                return next(err);
            }
            res.status(200).send(data);
        });
    };



    this.removeCategory = function (req, res, next) {
        var id = req.params.id;
        Category.remove({_id: id}).exec(function (err, data) {
            if (err) {
                res.status(500).send({error: 'error: ' + err});
                return next(err);
            }
            res.sendStatus(200).send(data);
        });
    };
    this.getCategoryById = function (req, res, next) {
        Category.findById(req.params._id)
            .exec(function (err, data) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(data);
            });
    };

    this.getCategory = function (req, res, next) {
        var projection = {}, query = {};

        /*Category.find(query ,projection)
            .exec(function (err, data) {
                if (err) {
                    throw err;
                }

                res.status(200)
                    .send(data);
            });*/
    };


};


module.exports = Module;