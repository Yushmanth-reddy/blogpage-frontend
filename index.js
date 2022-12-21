const token = localStorage.getItem("jwt");

if(token){
    location.href="/homepage/homepage.html"
}