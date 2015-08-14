$( document ).ready(function() {
  var newAccount = function(usname,paswd){
    $.ajax({
      url: '/users',
      type: 'POST',
      data: JSON.stringify({username:usname, password:paswd}),
      dataType: 'json',
      contentType: 'application/json',
      success: function(){console.log({success:'success'});
        window.location.href='/';
      },
      error:function(){console.log({error:'error'})}
    });
  }
  $("#submit").click(function(e) {
    //alert('df');
    e.preventDefault();
    var userName = document.getElementsByTagName('input')[0].value;
    var passWord = document.getElementsByTagName('input')[1].value;
    newAccount(userName,passWord);
  });
});
