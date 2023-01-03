const signInForm = document.querySelector(".signinForm");
const body = document.querySelector("body");

const url = "http://localhost:8000"

signInForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("submit Form");
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    const options = {
        method : "POST",
        headers : {
            "Content-Type":"application/json"
          },
        body: JSON.stringify({
            email,
            password
          })
    }
    body.innerHTML=`<img src="../loadingAnimation.gif" style="height: 100px;  width: 100px; text-align: center; top: 50%;">`;
    fetch(`${url}/auth/signin`,options)
    .then((data)=>{
        return(data.json())
    })
    .then((jsonData)=>{
        const {token} = jsonData;
        console.log(jsonData);
        if(token){
            localStorage.setItem("jwt",token);
            location.href="/myblogsPage/allblogs.html";
        }
        else{
            alert("signIn error");
            location.href="/Sign In page/main.html";
        }
    })
    .catch((err)=>{
        alert("error signing in");
        console.log(err);
    })
})