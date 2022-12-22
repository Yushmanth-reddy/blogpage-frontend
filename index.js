const token = localStorage.getItem("jwt");

if(token){
    location.href="/allblogsPage/allblogs.html"
}