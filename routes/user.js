var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user.js');
var expressSession = require('../handlers/expressSession');

module.exports = function (models) {
  var handler = new Handler(models);

  // router.use(expressSession.authenticatedUser);

  router.get('/', handler.getUsers);

  router.get('/getWithLookup', expressSession.authenticatedUser, handler.getWithLookup);

  router.get('/:id', expressSession.authenticatedUser, handler.getUserById);
  /////

  router.post('/',/*expressSession.authenticatedUser*/handler.createUser);

  router.post('/login', handler.login);

  router.post('/register',handler.register);

  router.post('/activate/:regKey', handler.activateRegistration);

  router.post('/reset', handler.resetPass);

  router.post('/reset/:resKey');

  router.post('/logout',handler.logout);


  //router.post('/forgot'. handler.forgotPassword);
  //router.post('/changepass', handler.changePassword);

  router.patch('/:id', expressSession.authenticatedUser, handler.updateUser);

  router.delete('/:id', handler.deleteUser);

  // router.get('/:param', handler.getUserByParam);

  return router;
};