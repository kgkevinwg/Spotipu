
var registerForm = document.querySelector("#registerForm");
var loginForm = document.querySelector("#loginForm");
var loginOffer = document.querySelector("#login-offer");
var signupOffer = document.querySelector("#signup-offer");

registerForm.style.display = "none";
loginOffer.style.display = "none";

document.querySelector("#loginForm").addEventListener('submit', event =>{
    event.preventDefault();
})

document.querySelector("#registerForm").addEventListener('submit', event =>{
    event.preventDefault();
})

function showSignupOffer()
{
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    loginOffer.style.display = "block";
    signupOffer.style.display= "none";
   

   
}

function showLoginOffer()
{
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    signupOffer.style.display = "block";
    loginOffer.style.display= "none";
}




users = [];
var cheesie = new Array("Cheesie","Cheesie@gmail.com","letmein", []);
users.push(cheesie);

function login()
{
    var username = document.querySelector("#login-username");
    var password = document.querySelector("#login-password");
    document.querySelector("#err-password").textContent = "";
    document.querySelector("#err-username").textContent = "";

    
    var flag  =0;
    for(var a=0;a<users.length;a++)
    {
        
        if(username.value.toLowerCase() === users[a][0].toLowerCase() || username.value.toLowerCase() === users[a][1].toLowerCase())
        {
            if(password.value === users[a][2])
            {
                console.log("login success");
                flag = 1;
                window.location.href = "landing.html";
            }
            else
            {
                flag = 1;
                document.querySelector("#err-password").textContent = "Login Credential doesn't match";
            }
            
        }
    }
    if(flag ==0)
    {
        document.querySelector("#err-username").textContent = "User "+username.value+" doesn't exist";
    }
}

var alphas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var digits = "0123456789";

function isAlpha(c) {
        return (alphas.indexOf(c) != -1);
}

function isDigit(c) {
        return (digits.indexOf(c) != -1);
}

function register()
{
    var username = document.querySelector("#signup-username");
    var email  = document.querySelector("#signup-email");
    var password = document.querySelector("#signup-password");
    var passwordconf = document.querySelector("#signup-passwordconf");
    document.querySelector("#err-signup-username").textContent = "";
    document.querySelector("#err-signup-password").textContent = "";
    document.querySelector("#err-signup-email").textContent = "";
    document.querySelector("#err-signup-passwordconf").textContent = "";

    var validate = 0;

    if(username.value.length < 5 || username.value.length > 15)
    {
        validate = 1;
        document.querySelector("#err-signup-username").textContent = "Username must be between 5 and 15 characters long";
    }
    var checkAvailability = 0;
    for(var a=0;a<users.length;a++)
    {
        if(username.value.toLowerCase() === users[a][0].toLowerCase())
        {
            validate = 1;
            document.querySelector("#err-signup-username").textContent = "Username is already taken";
        }
    }
    if(email.value.search('@') === -1 || email.value.search('.')===-1 || email.value.indexOf('.')=== email.value.indexOf("@")+1 ||  email.value[0] === '@' || email.value[0] === '.' || email.value[email.length-1] === '@' ||email.value[email.length-1] === '.'    )
    {
        validate = 1;
        document.querySelector("#err-signup-email").textContent = "Not valid email format";
    }
    checkAvailability = 0;
    for(var a=0;a<users.length;a++)
    {
        if(email.value.toLowerCase() === users[a][1].toLowerCase())
        {
            validate = 1;
            document.querySelector("#err-signup-email").textContent = "Email is already taken";
        }
    }
    var checkNum = 0, checkAlpha = 0;
    for(var a=0;a<password.value.length;a++)
    {
        if(isAlpha(password.value[a]))
        {
            checkAlpha = 1;
        }
        else if(isDigit(password.value[a]))
        {
            checkNum  = 1;
        }
    }
    console.log(checkNum);
    console.log(checkAlpha);
    if(checkNum === 0  || checkAlpha === 0 || password.value.length < 5)
    {
        validate =1;
        document.querySelector("#err-signup-password").textContent = "Password must contain alphabet and numeric value and must be longer than 5 characters";
    }

    if(passwordconf.value !== password.value)
    {
        validate = 1;
        document.querySelector("#err-signup-passwordconf").textContent = "Password confirmation doesn't match!";

    }

    if(validate ===0)
    {
        users.push(new Array(username.value,email.value,password.value,[]));
        //window.location.href = "landing.html";
    }
    
}



