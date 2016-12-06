function authenticatedUser(req, res, next) {
    var err;

    if (req.session && req.session.loggedIn && req.session.uId) {
        next();
    } else {
        err = new Error('UnAuthorized');
        err.status = 401;
        next(err);
    }
}

exports.authenticatedUser = authenticatedUser;
