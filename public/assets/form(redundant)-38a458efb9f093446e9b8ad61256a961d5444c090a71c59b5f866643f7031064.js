function validateRequired() {
 
   if( document.input.name.value == "" )
   {
     document.input.name.focus() ;
	 $(document.input.name).css('border-color', 'red');
     $("span.namebox").html("<div>Please enter a username</div>");
     return false;
   } else {
    $("span.namebox").html("");
    $(document.input.name).css('border-color', '#aacfe4');
   }
   if( document.input.password.value == "" )
   {
     document.input.password.focus() ;
	 $(document.input.password).css('border-color', 'red');
	 $("span.passwordbox").html("<div>Please enter a password</div>");
     return false;
   } else {
    $("span.passwordbox").html("");
    $(document.input.password).css('border-color', '#aacfe4');
   }
   if ( document.input.password.value != document.input.cpassword.value )
   { 
	document.input.cpassword.focus();
	$(document.input.cpassword).css('border-color', 'red');
   	$("span.cpasswordbox").html("<div>Passwords don't match!</div>");  	
     return false; 
   } else {
    $("span.cpasswordbox").html("");
    $(document.input.cpassword).css('border-color', '#aacfe4');
   }
   if( document.input.email.value == "" )
   {
     document.input.email.focus() ;
	 $(document.input.email).css('border-color', 'red');
     $("span.emailbox").html("<div>Please enter your email</div>");
     return false;
	 }
	 else
	 {
     var ret = validateEmail();
     if( ret == false )
     {
     return false;
     }
	 }
   return( true );
}


function validateEmail() {
 
   var emailID = document.input.email.value;
   atpos = emailID.indexOf("@");
   dotpos = emailID.lastIndexOf(".");
   if (atpos < 1 || ( dotpos - atpos < 2 )) 
   {
       document.input.email.focus() ;
	$("span.emailbox").html("<div>Please enter a valid email</div>");
       return false;
   } else {
    $("span.emailbox").html("");
    $(document.input.email).css('border-color', '#aacfe4');
   }
   if ( document.input.email.value != document.input.cemail.value )
   { 
	document.input.cemail.focus();
	$(document.input.cemail).css('border-color', 'red');
   	$("span.cemailbox").html("<div>Email doesn't match!</div>");  	
     return false; 
   } else {
    $("span.cemailbox").html("");
    $(document.input.cemail).css('border-color', '#aacfe4');
   }
   return( true );
}

