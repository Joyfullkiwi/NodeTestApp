var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var postSchema = mongoose.Schemas.post;
var nodemailer = require('nodemailer');
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();

var Module = function (models) {
    "use strict";
    var PostModel = models.get('post', postSchema);
    var CategoryModel = models.get('category',categorySchema);

   this.createPost = function (req,res,next) {
       var body = req.body;
       body.author = req.user._id;
       PostModel.create(body,function (err,data) {
           if(err){
               return next(err);
           }
           res.status(200).send(data);
       });
   };
    this.getPost = function (req, res, next) {
        var projection = {tags: 1, title: 1, body: 1, author: 1, created: 1, url: 1, category:1};
        //TODO:add options for pagination
        console.log(req.query);
        PostModel.find(req.query, projection)
            .lean()
            .populate('author', '-_id username firstName lastName')
            .populate( 'category', 'name')
            .exec(function (err, data) {
                if (err) {
                    return next(err);
                   // res.status(500).send({error: "Can\'t find Post"});
                }
                res.send(data);

            });
    };

    this.getPostById = function (req, res, next) {
        PostModel.findOne({_id: req.params._id}, function (err, data) {
            if (err) {
                return next(err);
               // res.status(500).send({error: "Can\'t find Post"});
            }
            PostModel.populate(data, {
                path: 'author',
                select: 'firstName lastName username'
            }, function (err, data) {
                res.status(200).send(data);
            });
        });
    };

    this.updatePost = function (req, res, next) {
        try {
            delete req.body._id;
            PostModel.update({_id: req.params._id}, req.body, function (err, result) {
                if (err) {
                    console.log(err);

                   // res.status(500).send({message: {error: "Can\'t update Post"}});
                    return next(err);
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (err) {

        }
    };

    this.removePost = function (req, res, next) {
        PostModel.remove(req.params)
            .exec(function (err, data) {
                if (err) {
                    res.status(500).send({error: 'error: ' + err});
                }
                else {
                    console.log('data: ' + data);
                    //res.status(200).send({success: data + ' Post have been removed'});
                    return next(err);
                }
            });
    };

    this.createComment = function (req, res, next) {
        res.send({message: 'Comments not implemented'})
    };



};


module.exports = Module;