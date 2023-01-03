const token = localStorage.getItem("jwt");
const url = "http://localhost:8000"

const urlParams = new URLSearchParams(window.location.search);
const blogid = urlParams.get("blogid");    

const getallBlogs = document.getElementById("allBlogs");
const homePage = document.getElementById("homepage");

const headingEl = document.querySelector(".title");
const contentEl = document.querySelector(".content");

if(token){
    const options ={
        method:"GET",
        headers:{
            authorization:token
        }
    }
    fetch(`${url}/blogs/specificBlog/${blogid}`,options)
    .then((data)=>{
        return(data.json());
    })
    .then((jsonData)=>{
        const data = jsonData.data;
        let title = data.title;
        let content = data.blogcontent;
        headingEl.textContent=title;
        contentEl.textContent=content;
        console.log(data);
    })

}


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