const token = localStorage.getItem("jwt");
const url = "http://localhost:8000"

const urlParams = new URLSearchParams(window.location.search);
const blogid = urlParams.get("blogid");                         //used to get parameters

const updateButton = document.querySelector(".btn1");
const deleteButton = document.querySelector(".btn2");

const homePage = document.getElementById("homepage");
const getallBlogs = document.getElementById("allBlogs");
const blogPage = document.getElementById("write");

window.addEventListener("load", () => {
    // console.log("hello clicked");
    const title = document.querySelector(".title-input");
    const content = document.querySelector(".blog-content");

    // console.log(title);
    // console.log(content);

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
            let oldTitle = data.title;
            let oldContent = data.blogcontent;
            title.value=oldTitle;
            content.value=oldContent;
            console.log(data);
        })
    
    }
    
})

updateButton.addEventListener("click",()=>{
    const title = document.querySelector(".title-input");
    const content = document.querySelector(".blog-content");


    if(token){
        fetch(`${url}/blogs/updateBlog/${blogid}`,{
            method : "PUT",
            headers:{
                "Content-Type":"application/json",
                authorization:token
            },
            body:JSON.stringify({
                title:title.value,
                blogcontent:content.value
            })
        })
        .then((data)=>{
            return(data.json());
        })
        .then((jsonData)=>{
            // console.log(jsonData);
            alert("Blog updated");
            location.href = "/allblogsPage/allblogs.html"
        })

    }
})


deleteButton.addEventListener("click",()=>{
    const title = document.querySelector(".title-input");
    const content = document.querySelector(".blog-content");


    if(token){
        fetch(`${url}/blogs/deleteblog/${blogid}`,{
            method : "DELETE",
            headers:{
                "Content-Type":"application/json",
                authorization:token
            },
        })
        .then((data)=>{
            return(data.json());
        })
        .then((jsonData)=>{
            alert("Blog Deleted");
            location.href = "/allblogsPage/allblogs.html"
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
getallBlogs.addEventListener("click",()=>{
    if(token){
        location.href="/allblogsPage/allblogs.html";
    }
})