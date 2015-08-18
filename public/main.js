$(document).ready(function() {
    var input = $('input');
    var messages = $('#messages');
    var socket = io();
    var addMessageEvent = function(postId){
        document.getElementById(postId).getElementsByTagName('a')[0].addEventListener("click", function(event) {
           
          event.preventDefault();
          socket.emit('delete',postId);
            
        });
    }
    var addMessage = function(message,post,messenger,curUsrStat) {
        console.log(messenger, post);
       if(curUsrStat){
            messages.append('<div id='+post['_id'] +'>' +messenger+': '+ message + ' <a href="#"><i class="fa fa-trash-o"></i></a> </div>');
            addMessageEvent(post['_id']);
       }else{
           messages.append('<div id='+post['_id'] +'>' +messenger+': '+ message + ' </div>');
       }
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
    }
    
    var deleteListener = function(){
         $('#messages div a ').on('click',function(event){
            event.preventDefault();
            //alert('dfed');
           var messageId = $(this).parent().attr('id')//.parentNode;//.attr( 'id' );
           socket.emit('delete',messageId);
      
         });
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
        //addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message', addMessage);
    //////////////////////////////////////////////////////////
    var loadMessage = function(posts,currentUser){
        
        posts.forEach(function(post){
           if(post['_user'].username ==currentUser ){
                messages.append('<div id='+post['_id']+'>' +  post['_user'].username+': '+post.message+ ' <a href="#"><i class="fa fa-trash-o"></i></a> </div>');
           }else{
               messages.append('<div id='+post['_id']+'>'+post['_user'].username+":  " + post.message + '</div>');
           }
        });
       deleteListener();
    }
    var loadUser = function(users){
         console.log(users);
        $('#connected p span').remove();
        users.forEach(function(user){
            $('#connected p').append('<span>'+' '+user+'</span>');
        });
    }
    var deleteMessage = function(messageId){
        console.log(messageId);
        $('#'+messageId).remove();
    }
    socket.on('connection',loadMessage);
    //socket.emit('connectedUser',function(){return;})//TODO added code
    socket.on('connectedUser',loadUser); 
    socket.on('delete',deleteMessage);
    
});