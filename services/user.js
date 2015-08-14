// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
   // console.log(req.body);
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New chatter added to the locker room!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

exports.findUser = function(username,callback){

  User.findOne({ username: username }, function (err, user) {
        if (err) { return callback(err); }
  
        // No user found with that username
        if (!user) { return console.log('no user found') }
          return callback(user);
        });
     // });
};

exports.update = function(user,post){
    console.log('services/update');
    user.posts.push(post);
    User.findOneAndUpdate({_id: user['_id']}, user, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return console.log(doc);
    });
};