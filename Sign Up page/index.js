const signUpForm = document.querySelector(".signUpForm");
const url = "http://localhost:8000"

signUpForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const email = document.querySelector(".emailInput").value;
    const password = document.querySelector(".passwordInput").value;
    const rePassword = document.querySelector(".re-passwordInput").value;
    const name = document.querySelector(".nameInput").value;

    if(password!==rePassword){
        alert("password not same");
        return;
    }
    else{
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                name,
                password
            })
        }
        fetch(`${url}/auth/signup`,options)
        .then((data)=>{
            return(data.json());
        })
        .then((jsonData)=>{
            const {token} = jsonData
            if(token){
                console.log(token);
                localStorage.setItem("jwt",token);
                location.href="/homepage/homepage.html";
            }
            else{
                alert("Sign up error")
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("didnot get data")
        })

    }

})