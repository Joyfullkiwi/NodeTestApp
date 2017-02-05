var ejs = require('ejs');
var mongoose = require('mongoose');
var crypto = require('crypto');
var userSchema = mongoose.Schemas.user;
var sendMail = require('../helpers/mailer');


var Module = function (models) {
    var UserModel = models.get('user', userSchema);
    this.get = function (req, res, next) {
        var template = ejs.compile('<h4>User: <%= user %>, Time: <%=time%></h4>');

        res.status(200).send(template({user: 'Ann', time: req.time}));
    };

    this.changePassword = function (req, res, next) {

        var newpass = req.body.pass;
        var id = req.params.id;

        var shaSum = crypto.createHash('sha256');
        shaSum.update(newpass);
        var hashedPassword = shaSum.digest('hex');

        UserModel.update({_id: id},{$set: {pass:hashedPassword}},{upsert:false},
            function (err, user) {
                if(err){
                    console.log('Change password done for account ' + id);
                    return next(err);
                }
                res.status(200).send(user);
            }
        );

    };

    /*this.forgotPassword = function (req, res, next) {

        var email = req.body.email;
        var to;
        var subject;
        var text;
        var html;
        var resetPasswordUrl;

        var user = UserModel.findOne({_email:email}, function findAccount(err,user) {
            if (err) {
                return next(err);
            }

            to = email;
            subject = "Hello " + myName;
            text =  '';
            html = '<b> hello! </b>';
            sendMail(to, subject, text, html);
        });
    };*/
    this.createUser = function (req, res, next) {
        var body = req.body;
        var shaSum = crypto.createHash('sha256');
        var pass = req.body.pass;
        var login = req.body.login;
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
            //admin
            if (user.isAdmin) {
                req.session.isAdmin = true;
            }

            res.status(200).send(user);
        })

    };

    this.register = function (req, res, next) {

        var body = req.body;

        if (body.email) {
            UserModel.findOne({
                'email': body.email
            }, function (err, user) {
                if (err) {
                    next(err);
                }
                if (user) {
                    return res.status(200).send({fail: 'Email Allready Registered'});
                } else {
                    var user = new UserModel(req.body);
                    var shaSum = crypto.createHash('sha256');

                    if (user.password) {
                        shaSum.update(user.password);
                        user.password = shaSum.digest('hex');
                    }

                    if(!body.friends) {
                        var shaSum1 = crypto.createHash('sha256');

                        shaSum1.update(String(Date.now()));
                        user.registrationKey = shaSum1.digest('hex');

                        var origin = req.headers.referer;
                        var to = body.email;
                        var subject = "Account registration confirmation";
                        var text = user.registrationKey;
                        var html = "<b>" + origin + "#myApp/activate/" + user.registrationKey + "</b>";

                        sendMail(to, subject, text, html);
                    }

                    user.save(function (err, _user) {
                        if (err) {
                            return next(err);
                        }

                        if(_user.friends && _user.friends.length) {
                            var friendId = _user.friends[0];
                            var newfriend = {_id: _user._id};
                            UserModel.findByIdAndUpdate(friendId, {$addToSet: {"friends": newfriend}}, {new: true}, function (err, response) {
                                if (err) {
                                    return next(err);
                                }
                            });
                        }

                        return res.status(200).send({success: true});
                    });
                }
            });
        } else {
            return res.status(200).send({fail: 'Specify Email'});
        }
    };

    this.activateRegistration = function (req, res, next) {

        var regKey = req.params.regKey;

        UserModel.findOne({
            'regKey': regKey
        }, function (err, user) {
            if (err) {
                next(err);
            }
            if (!user) {
                return res.status(200).send({fail: "User allready activated or doesn't exist"});
            } else {

                user.regKey = undefined;

                user.save(function (err, _user) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send({success: true});
                });
            }
        });
    };

    this.resetPass = function (req, res, next) {

        var email = req.body.email;
        if (email) {
            UserModel.findOne({
                'email': email
            }, function (err, user) {
                if (err) {
                    next(err);
                }
                if (!user) {
                    return res.status(200).send({fail: 'Email Not Registered'});
                } else {
                    var shaSum = crypto.createHash('sha256');
                    shaSum.update(String(Date.now()));
                    user.reskey = shaSum.digest('hex');

                    user.save(function (err, _user) {
                        if (err) {
                            return next(err);
                        }

                        var to = body.email;
                        var subject = "Password recovery";
                        var text =  user.reskey;
                        var html = "<b>"  + "/#reset/" + text + "</b>";

                        sendMail(to, subject, text, html);

                        res.status(200).send({success: true});

                    });
                }
            });
        } else {
            return res.status(200).send({fail: 'Enter Email'});
        }
    };

    this.resetKeyword = function (req, res, next) {

        var body = req.body;
        var resKey = req.params.resKey;
        var pass = req.body.pass;
        var shaSum;

        if (pass) {
            UserModel.findOne({
                'resKey': resKey
            }, function (err, user) {
                if (err) {
                    next(err);
                }
                shaSum = crypto.createHash('sha256');
                shaSum.update(pass);
                pass = shaSum.digest('hex');

                if (user) {
                    user.pass = pass;
                    user.reskey = undefined;
                    user.save(function (err, _user) {
                        if (err) {
                            return next(err);
                        }
                        return res.status(200).send({success: true});
                    });
                } else {
                    return res.status(200).send({fail: 'Reset key isnt valid'});
                }
            });

        } else {
            return res.status(200).send({fail: 'No password has entered'});
        }

    };

    this.logout = function (req, res, next) {
        if (req.session) {
            req.session.destroy();
        }
        res.status(200).send({success: true});
       // res.redirect('/#login');
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