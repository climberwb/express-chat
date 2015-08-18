var Post = require('../models/post');

exports.save = function(message,user, callback, errback) {
    console.log('inside services/posts/save');
    //console.log(message);
    Post.create({ message: message, _user: user.id }, function(err, post) {
        if (err) {
            console.log(err);
            errback(err);
            return;
        }
        console.log(post);
        callback(post);
    });
};

exports.delete = function(postId,callback,errback){
   Post.find({ _id: postId },function(err,docs){
    docs[0].remove();  //Remove all the documents that match!
      if (err) {
            console.log(err);
            errback(err);
            return;
        }
       // console.log(posts);
       //TODO update user posts with this code User.findOneAndUpdate({_id: docs.user['_id']},,)
        callback(docs);
});
}

exports.list = function(callback, errback) {
    console.log('inside list');
    Post.find(function(err, posts) {
        // if(posts ==null){
        //     console.log("null");
        // }
        if (err) {
            console.log(err);
            errback(err);
            return;
        }
       // console.log(posts);
        callback(posts);
    }).populate('_user');
};

