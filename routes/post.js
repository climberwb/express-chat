var express = require('express');
var Post = require('../services/post');
var passport = require('passport');
var router = express.Router();
var Auth = require('../services/auth');

router.route('/posts')
 // .post(authController.isAuthenticated, beerController.postBeers)
  .get(Auth.isAuthenticated, function( req,res){
    Post.list(function(posts) {
        console.log('inside posts');
        console.log(posts);
        console.log(res);
        res.status(200).json(posts);
    }, function(err) {
        res.status(400).json(err);
        console.log(err);
    });
    //res.json({'post':'message'}) THIS WORKS
});

// router.get('/posts', function( req,res){
//     Post.list(function(posts) {
//         console.log('inside posts');
//         console.log(posts);
//         console.log(res);
//         res.status(200).json(posts);
//     }, function(err) {
//         res.status(400).json(err);
//         console.log(err);
//     });
//     //res.json({'post':'message'}) THIS WORKS
// });

// router.post('/posts', function(req, res) {
//     console.log(req.body);
//     Post.save(req.body.message, function(post) {
//         console.log('inside services/post')
//         res.status(201).json(post);
//     }, function(err) {
//         res.status(400).json(err);
//     });
// });

module.exports = router;

// // Create endpoint handlers for /beers
// router.route('/beers')
//   .post(authController.isAuthenticated, beerController.postBeers)
//   .get(authController.isAuthenticated, beerController.getBeers);

// // Create endpoint handlers for /beers/:beer_id
// router.route('/beers/:beer_id')
//   .get(authController.isAuthenticated, beerController.getBeer)
//   .put(authController.isAuthenticated, beerController.putBeer)
//   .delete(authController.isAuthenticated, beerController.deleteBeer);