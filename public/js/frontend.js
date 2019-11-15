// const login = document.querySelector(".login");

// async function mylogin(email,password){
//     const result = await axios.post("/api/user/login",{email,password});
//     if(result.data.success){
//         alert("user logged in");
//     }else{
//         alert("wrong mail or password");
//     }
// }

// login.addEventListener("submit",function(event){
//     event.preventDefault();
//     const inputs = document.getElementByIdtagnaem("input");
//     const email = inputs[0].value;
//     const password = inputs[1].value;
//     mylogin(email,password)
// });


//new code

const login = document.querySelector(".login");
var stripe = Stripe('pk_test_CAEcwRg1IPA2iVtLfvs54hY4004b0Ad4ZW');
const forgetpassword = document.querySelector(".forget");
const signupbutton = document.querySelector("  .signup-button")

async function mylogin(email, password) {
    const result = await axios.post("/api/user/login", {
        email,
        password
    });
    if (result.data.success) {
        // alert("user logged in");
        location.assign("/me");
    } else {
        alert("wrong email or password")
    }
}



async function bookings(id){
    const result = await axios.post("/api/booking/checkout",{id});
    if(result.data.success){
        //payment

        //console.log(result.data.session.id);

        await stripe.redirecttocheckout({
            sessionid: result.data.session.id
        });
        alert("payment done");
    }else{
        alert("payment fail");
    }
}

if(signupbutton){
    console.log(signupbutton);
    for(var i =0; i<signupbutton.length; i++){
        signupbutton[i].addEventListener("click",function(event){
            bookings(event.target.getAttribute("plan-id"));
            
        });
    }
}



async function myforget(email){
    const result = await axios.patch("/api/user/forgetpassword",{email});
    if(result.data.success){
        alert("user mail has been send");
        location.assign("/reset");
    }else{
        alert("something went wrong");
    }
}
if (login) {
    login.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const email = inputs[0].value;
        const password = inputs[1].value;
        console.log("login was called");
        mylogin(email, password);
    });
}
if(forget){
    forgetpassword.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const email = inputs[0].value;
        console.log("forget was called");
        myforget( email);
    });

}

async function mysignup(name, email, password, confirmpassword) {
    const result = await axios.post("/api/user/signup", {
        name,
        email,
        password,
        confirmpassword
    });
    if (result.data.success) {
        alert("user signed in");
    } else if(result.data.failed){
        alert("something went wrong")
    }
}

if(signupbutton){
    console.log(signupbutton);
    for(var i =0; i<signupbutton.length; i++){
        signupbutton[i].addEventListener("click",function(event){
            console.log(event.target.getAttribute("plan-id"));
        });
    }
}

if (signup) {
    signup.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;
        const confirmpassword = inputs[3].value;
        console.log("signup was called");
        mysignup(name, email, password, confirmpassword);
    });
}

    


