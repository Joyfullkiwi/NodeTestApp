module.exports = function (app, db) {
  'use strict';
  var models = require('../helpers/models.js')(db);
  var userRouter = require('./user')(models);

  app.use('/users', userRouter);

  function errHandler(err, req, res, next) {
    var status = err.status || 500;
    var msg;

    if (err.status != 200) {
      msg = err.message;
    }

    if (process.env.NODE_ENV === 'production') {
      res.status(status).send({error: msg});
    } else {
      res.status(status).send({error: msg + '\n' + err.stack});
    }
  }

  app.use(errHandler);

};


