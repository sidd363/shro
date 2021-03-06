'use strict';

// User routes use users controller
var users = require('../controllers/users'),
    config = require('meanio').loadConfig();

module.exports = function(MeanUser, app, auth, database, passport) {

  app.route('/logout')
    .get(users.signout);
  app.route('/users/me')
    .get(users.me);

  // Setting up the users api
  app.route('/register')
    .post(users.create);

  app.route('/forgot-password')
    .post(users.forgotpassword);

  app.route('/reset/:token')
    .post(users.resetpassword);

  // Setting up the userId param
  app.param('userId', users.user);

  // AngularJS route to check for authentication
  app.route('/loggedin')
    .get(function(req, res) {
      console.log("req.user logged in", req.user);
      res.send(req.isAuthenticated() ? req.user : '0');
    });

  // Setting the local strategy route
  app.route('/login')
    .post(passport.authenticate('local', {
      failureFlash: true
    }), function(req, res) {
      console.log("req.user", req.user);
      res.send({
        user: req.user
      });
    });

  // AngularJS route to get config of social buttons
  app.route('/get-config')
    .get(function (req, res) {
      // To avoid displaying unneccesary social logins
      var clientIdProperty = 'clientID';
      var defaultPrefix = 'DEFAULT_';
      var socialNetworks = ['facebook','linkedin','twitter','github','google']; //ugly hardcoding :(
      var configuredApps = {};
      for (var network in socialNetworks){
        var netObject = config[socialNetworks[network]];
        if ( netObject.hasOwnProperty(clientIdProperty) ) {
              if (netObject[clientIdProperty].indexOf(defaultPrefix) === -1 ){
                configuredApps[socialNetworks[network]] = true ;
              }
        }
      }
      res.send(configuredApps);
    });

};
