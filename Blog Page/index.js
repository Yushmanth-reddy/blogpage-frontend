const token = localStorage.getItem("jwt");
const url = "http://localhost:8000"

const submitButton = document.querySelector(".btn2");
const getallBlogs = document.getElementById("allBlogs");
const homePage = document.getElementById("homepage");


submitButton.addEventListener("click",()=>{
    console.log("hello clicked");
    const title = document.querySelector(".title-input").value;
    const content = document.querySelector(".blog-content").value;

    // console.log(title);
    // console.log(content);

    if(token){
        const options ={
            method : "POST",
            headers:{
                "Content-Type":"application/json",
                authorization:token
            },
            body:JSON.stringify({
                title:title,
                blogcontent:content
            })
        }
        fetch(`${url}/blogs/postblog`,options)
        .then((data)=>{
            return(data.json());
        })
        .then((jsonData)=>{
            // console.log(jsonData);
            alert("Blog Posted");
            location.href = "/myblogsPage/allblogs.html"
        })
    }
})

getallBlogs.addEventListener("click",()=>{
    if(token){
        location.href="/myblogsPage/allblogs.html";
    }
})
homePage.addEventListener("click",()=>{
    if(token){
        location.href="/homepage/homepage.html";
    }
})