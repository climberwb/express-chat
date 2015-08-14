var express = require('express');
var router = express.Router();
var passport = require('passport');
var Auth = require('../services/auth');
var User = require('../services/user');
// Load required packages

var User = require('../services/user');



// Create endpoint handlers for /users
// router.route('/users')
//   .post(User.postUsers)
//   .get(User.getUsers);
 
 router.route('/users')
  .post(User.postUsers)
  .get(Auth.isAuthenticated, User.getUsers);
 
 
//  router.post('/users', function(req, res) {
//       console.log(req.body);
//     User.postUsers(req, function(post) {
//         console.log('inside services/post');
//       //  console.log(res.body);
//         //router.get('/users',function(){})
//         console.log(Auth.isAuthenticated);
//         res.status(201).json(post);
//     }, function(err) {
//         res.status(400).json(err);
//     })//.get(''Auth.isAuthenticated, User.getUsers);
// });
  //router.route('/users/login').get('../auth/login.html');
  
  module.exports = router;
  
//   exports.postUsers = function(req, res) {
//     console.log(req.body);
//   var user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });

//   user.save(function(err) {
//     if (err)
//       res.send(err);

//     res.json({ message: 'New chatter added to the locker room!' });
//   });
// };