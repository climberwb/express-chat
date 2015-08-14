var mongoose = require('mongoose');
var User = require('./user');
var PostSchema = new mongoose.Schema({
    message: { type: String, required: true },
    _user: { type: String, ref: 'User',required:true, unique:true } //, TODO add this to schema http://mongoosejs.com/docs/populate.html
 
});

var Post = mongoose.model('Post', PostSchema);
console.log('MODEL');
module.exports = Post;