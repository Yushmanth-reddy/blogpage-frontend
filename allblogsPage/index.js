const allBlogsContainer = document.querySelector(".blogs-container");
const url = "http://localhost:8000"

const token = localStorage.getItem("jwt");

// const getallBlogs = document.getElementById("allBlogs");
const homePage = document.getElementById("homepage");
const blogPage = document.getElementById("write");
const logoutBtn = document.getElementById("logout");

let blogsData = [];

logoutBtn.addEventListener("click",()=>{
    if(token){
        localStorage.removeItem("jwt");
        location.href="/index.html";
    }
})

function appendBlog(arrayOfBlogs){
    allBlogsContainer.innerHTML=""
    for(eachBlog of arrayOfBlogs){
        const eachBlogContainer = document.createElement("div");
        eachBlogContainer.classList.add("eachBlog-container");
        eachBlogContainer.id = eachBlog.blogid
        eachBlogContainer.innerHTML = `<div class="photo-card">
        </div><div class="blog-card"><div class="top-container"><h1>${eachBlog.title}</h1>
        </div><hr><div class="bottom-container"><p>${eachBlog.content}<a href="../UpdateBlogPage/updateblog.html?blogid=${eachBlog.blogid}">Edit blog</a></p></div></div>`
        allBlogsContainer.appendChild(eachBlogContainer);
    }
}



window.addEventListener("load",()=>{
    if(token){
        const options = {
            method : "GET",
            headers : {
                authorization : token
            }
        }
        fetch(`${url}/blogs/allblogs`,options)
        .then((data)=>{
            return(data.json());
        })
        .then((jsonData)=>{
            console.log(jsonData);
            const array = jsonData.data;
            blogsData = array;
            appendBlog(blogsData);
        })
        .catch((err)=>{
            if(err){
                console.log(err);
            }
        })
    }
})




blogPage.addEventListener("click",()=>{
    if(token){
        location.href="/blog Page/writeblog.html";
    }
})
homePage.addEventListener("click",()=>{
    if(token){
        location.href="/homepage/homepage.html";
    }
})

