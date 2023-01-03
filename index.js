const token = localStorage.getItem("jwt");

if(token){
    location.href="/myblogsPage/allblogs.html"
}