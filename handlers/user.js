var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var userSchema = mongoose.Schemas.user;
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();

var Module = function (models) {
    var UserModel = models.get('user', userSchema);
    this.get = function (req, res, next) {
        var template = ejs.compile('<h4>User: <%= user %>, Time: <%=time%></h4>');

        res.status(200).send(template({user: 'Ann', time: req.time}));
    };

    this.createUser = function (req, res, next) {
        var body = req.body;
        var shaSum = crypto.createHash('sha256');
        var pass = req.body.pass;
        var login = req.body.login;
        var finstname = req.body.firstName;
        var lastname = req.body.lastName;
        var err;

        if (!login || !login.length) {
            err = new Error("Bad Pass or Username");
            err.status = 400;

            return next(err);
        }

        shaSum.update(pass);

        body.pass = shaSum.digest('hex');

        var user = new UserModel(body);

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });

    };

    this.login = function (req, res, next) {
        var data = req.body;
        var userName = req.body.login;
        var pass = req.body.pass;
        var shaSum = crypto.createHash('sha256');
        var session = req.session;
        var err;

        UserModel.findOne({login: userName}, function (err, user) {
            if (err) {
                return next(err);
            }

            shaSum.update(pass);

            if (!user || user.pass !== shaSum.digest('hex')) {
                err = new Error("Bad Pass or Username");
                err.status = 400;

                return next(err);
            }

            if (data.rememberMe === 'true') {
                session.rememberMe = true;
            } else {
                delete session.rememberMe;
                session.cookie.expires = false;
            }

            session.loggedIn = true;
            session.uId = user._id;
            session.uName = user.login;

            res.status(200).send(user);
        })

    };

    this.getWithLookup = function (req, res, next) {
        var collection = 'users';

        UserModel.aggregate([/*{
         $match: {
         firstName: 'Petro',
         age      : {$gte: 18}
         }
         }, */{
            $project: {
                firstName: 1,
                lastName : 1,
                age      : 1,
                fullName : {$concat: ['$firstName', ' ', '$lastName']},
                admin    : 1
            }
        }, {
            $lookup: {
                from        : collection,
                localField  : 'admin',
                foreignField: '_id',
                as          : 'lookupAdmin'
            }
        }, {
            $project: {
                firstName  : 1,
                lastName   : 1,
                age        : 1,
                admin      : 1,
                lookupAdmin: {$arrayElemAt: ['$lookupAdmin', 0]}
            }
        }, {
            $project: {
                firstName              : 1,
                lastName               : 1,
                age                    : 1,
                admin                  : 1,
                'lookupAdmin.firstName': 1,
                'lookupAdmin.lastName' : 1,
                'lookupAdmin._id'      : 1
            }
        }, {
            $group: {
                _id  : null,
                count: {$sum: 1},
                admin: {$push: '$admin'},
                age  : {$addToSet: '$age'}
            }
        }], function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send(result);
        });
    };

    this.getUsers = function (req, res, next) {
        var query = req.query;

        var criteria = query.age ? {age: {$gt: parseInt(query.age, 10)}} : {};

        UserModel.find(criteria).populate('friends', 'firstName lastName').exec(function (err, users) {
            if (err) {
                return next(err);
            }

            res.status(200).send(users);

            mailer.sendEmail({});
        });
    };

    this.getUserById = function (req, res, next) {
        var id = req.params.id;

        UserModel.findOne({_id: id}).exec(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        })
    };

    this.deleteUser = function (req, res, next) {
        var id = req.params.id;

        UserModel.remove({_id: id}).exec(function (err, respons) {
            if (err) {
                return next(err);
            }

            res.status(200).send(respons);
        })
    };

    this.updateUser = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;

        // UserModel.update({_id : id}, {$set : body}, {new: true}).exec(function (err, user) {
        UserModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        })
    };

    // this.getUserByParam = function (req, res, next) {
    //     var param = req.params.param;
    //
    //     res.status(200).send({key: param});
    //
    // };
};

module.exports = Module;