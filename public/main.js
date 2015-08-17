$(document).ready(function() {
    var input = $('input');
    var messages = $('#messages');
    var socket = io();
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    var typing = function(user){
        $('#typing ul li.'+user+'-typing').remove();
        var id = Math.random();
        $('#typing ul').append('<li class='+user+'-typing id='+id+'>' + user+" is typing..." + '</li>');
        var x =window.setTimeout(function() {
            if(document.getElementById(id)){
                document.getElementById(id).remove();
            }
        }, 1000);

       // alert(user+" is typing...");
    }
    
    $(this).on('keydown',function(event){
      
       var userIsTyping = function(){
           return true;
       }
       socket.emit('typing',userIsTyping);
    });
    
    socket.on('typing',typing);
    
    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message', addMessage);
    //////////////////////////////////////////////////////////
    var loadMessage = function(posts){
        console.log(posts);
        posts.forEach(function(post){
           if(post['_user']){
                messages.append('<div>' +  post['_user'].username+': '+post.message+ '</div>');
           }else{
               messages.append('<div>' + post.message + '</div>');
           }
        });
    }
    var loadUser = function(users){
         console.log(users);
        $('#connected p span').remove();
        users.forEach(function(user){
            $('#connected p').append('<span>'+' '+user+'</span>')
        });
    }
    socket.on('connection',loadMessage);
    //socket.emit('connectedUser',function(){return;})//TODO added code
    socket.on('connectedUser',loadUser); 
});