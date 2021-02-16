
function validator(event){
    event.preventDefault() 
    var pw=document.getElementById("pwsd").value;
    var com_pw=document.getElementById("confirm_password").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    if(pw != com_pw){
        document.getElementById("message").innerHTML = "Password doesn't match";
    }
    else if(pw==""){
            document.getElementById("message").innerHTML = "Fill the password please!";
        }
    else if (pw.length<3){
        document.getElementById("message").innerHTML = "Password must be at least 3 characters";
    }
    else if(pw.length>15){
        document.getElementById("message").innerHTML = "Password must not be exceed 15 characters";
    }
    else if (pw==com_pw){ 
        axios.post("http://localhost:3000/register/",{username:username,email:email,password:pw}).then(result=>{
            if(result.data.email){
                document.getElementById("message1").innerHTML="Email already exists";
            }
            else{
                window.location.pathname="/signin"
            }
        }).catch(err=>{
            console.log("error")
        })
    }
        
}




  