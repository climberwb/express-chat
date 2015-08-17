// https://www.npmjs.com/package/express-socket.io-session
// USE THIS: https://github.com/invisiblejs/socketio-auth
require('./db/connect');
var socket_io = require('socket.io');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var postRoutes = require('./routes/post');
var userRoutes = require('./routes/user');
var passport = require('passport');
var Auth = require('./services/auth.js');
var User = require('./services/user.js');
//var unirest = require('unirest');
var Post = require('./services/post');
var app = express();
var cookie = require('cookie');

app.use(bodyParser.json());
app.use(passport.initialize());

var server = http.Server(app);
var io = socket_io(server);



//app.use('/auth/login',)
app.use('/', userRoutes);
app.use('/', postRoutes);
app.get('/', Auth.isAuthenticated, function(req, res) {
    //console.log(res.req.user);
   res.sendFile('index.html', {root: __dirname + '/public/'});

});
app.use(express.static('public'));
app.use('*', function(req, res) {
            res.status(404).json({ message: 'Not Found' });
        });
//  session = require("express-session")({
//     secret: "my-secret",
//     resave: true,
//     saveUninitialized: true
//   }),
//   sharedsession = require("express-socket.io-session");


// // Attach session
// app.use(session);

// // Share session with io sockets
// io.use(sharedsession(session));
var connectedList=[]
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// var ary = ['three', 'seven', 'eleven'];

// ary.remove('seven');    

io.on('connection', function (socket) {
   // console.log(client.request.headers.cookie);
   // console.log(socket.handshake);
   //  socket.handshake.session.userdata = socket;
  // console.log(socket.request.headers.authorization);
   console.log(Buffer("aGVsbG86SGVsbG8h=", 'base64').toString('ascii'));
   console.log('load');

  //socket.auth = false;
    //socket.on('authentication', function(data) {
        
    var userEncrypted3 = socket.request.headers.authorization.split(' ')[1];
    var userDecrypt3 = Buffer(userEncrypted3+"=", 'base64').toString('ascii');
    console.log(userDecrypt3);
    var user3 = userDecrypt3.split(':');
    var userName3 = user3[0];
    var userPwd3 = user3[1];
    var connectedUsers = function(user){
        connectedList.push(user);
        return connectedList.unique();
    }
    var disconnectUsers = function(user){
        var cncArr = connectedList.unique();
         cncArr.remove(user);
         console.log(cncArr);
         return cncArr;
    }
     socket.broadcast.emit('connectedUser',connectedUsers(userName3));
     
     Post.list(function(posts){
         socket.emit('connection', posts); },
            function(err){
              console.log(err);  
            }
        );
        
     socket.on('disconnect', function () {
      console.log(userName3);
      socket.broadcast.emit('connectedUser',disconnectUsers(userName3));
      //online = online - 1;
     });
     
    socket.on('typing', function(boolean) {
        var userEncrypted = socket.request.headers.authorization.split(' ')[1];
        var userDecrypt = Buffer(userEncrypted+"=", 'base64').toString('ascii');
      
        var user = userDecrypt.split(':');
        var userName = user[0];
        var userPwd = user[1];
        socket.broadcast.emit('typing', userName);
    });
    socket.on('message', function(message) {
        //  unirest.post('https://chat-room-climberwb.c9.io/posts')
        //  .header('Accept', 'application/json')
        //  .send({ "message": message }) //TODO why is send not sending any information??
        //   .end(function(response) {
        //       console.log('inside the response');
        //         console.log(response.body);
        //       });
      //  var userEncrypt = socket.request.headers.authorization.split(' ')[1].split(':');
     // console.log(Buffer(socket.request.headers.authorization+"=", 'base64').toString('ascii'));
      //console.log(socket.request.headers.authorization.split(' ')[1]);
        var userEncrypted2 = socket.request.headers.authorization.split(' ')[1];
        var userDecrypt2 = Buffer(userEncrypted2+"=", 'base64').toString('ascii');
        console.log(userDecrypt2);
        var user2 = userDecrypt2.split(':');
        var userName2 = user2[0];
        var userPwd2 = user2[1];
        User.findUser(userName2, function(myUser){ // THIS LINE HAS THE ERR
        //console.log(userObject);
            
            
            Post.save(message,myUser,function(posts){
                User.update(myUser,posts);
                
                socket.broadcast.emit('message', userName2+': '+message);
            },
                function(err){
                   console.log(err);  
                }
            );
        });
       
        console.log('Received message:', message);

    });
    
    
   // });   
});

 
server.listen(8080);




////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// Other server test code for shopping cart
///////////////////////////////////////////////////////////////////////////////////////////////

// require('./db/connect');
// var express = require('express');
// var bodyParser = require('body-parser');
// var postRoutes = require('./routes/post');
// var app = express();

// app.use(bodyParser.json());
// app.use(express.static('public'));

// app.use('/', postRoutes);
// app.use('*', function(req, res) {
//     res.status(404).json({ message: 'Not Found' });
// });

// app.listen(8080, function() {
//     console.log('Listening on port 8080');
// });

// exports.app = app; 