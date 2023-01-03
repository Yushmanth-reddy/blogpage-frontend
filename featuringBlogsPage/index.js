const allBlogsContainer = document.querySelector(".blogs-container");
const url = "http://localhost:8000"

const token = localStorage.getItem("jwt");

// const getallBlogs = document.getElementById("allBlogs");
const homePage = document.getElementById("homepage");
const allmyblogs = document.getElementById("allBlogs");
const blogPage = document.getElementById("write");
const logoutBtn = document.getElementById("logout");
const input = document.querySelector("input");


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
        </div><hr><div class="bottom-container"><p>${eachBlog.content}</p><a href="../readTheBlog/readblog.html?blogid=${eachBlog.blogid}"><div class = "Read-More">
        <p class="read-more">Read More</p></div></a></div><button ><i class="fa-solid fa-heart fa-2x" "><p class="likes-count">${eachBlog.likes}</p></i></button></div>`
        allBlogsContainer.appendChild(eachBlogContainer);
        
        const likeButton = eachBlogContainer.querySelector("button");
        const viewButton = eachBlogContainer.querySelector(".Read-More");
        likeButton.classList.add("likebtn");
        const likeicon = eachBlogContainer.querySelector("i");
        const likeCount = eachBlogContainer.querySelector(".likes-count");

        
        fetch(`${url}/blogs/likeCheck/${eachBlogContainer.id}`,{
            method:"GET",
            headers : {
                authorization : token
            }
        })
        .then((data)=>data.json())
        .then((jsonData)=>{
            const data = (jsonData.data);
            const blogidInint = Number(eachBlogContainer.id)

            if(data.includes(blogidInint)){
                likeicon.style.color="red"
            }
            else{
                likeicon.style.color="gray"
            }
        })
        
        likeButton.addEventListener("click",()=>{
            if(likeicon.style.color==="gray"){
                likeicon.style.color="red"
                fetch(`${url}/blogs/addlike/${eachBlogContainer.id}`,{
                    method:"PUT",
                    headers : {
                        "Context-Type" : "application/json",
                        authorization:token
                    }
                })
                .then((data)=>{
                    return(data.json());
                })
                .then((jsonData)=>{
                    console.log(jsonData.msg);
                    
                })
            }
            
            else{
                likeicon.style.color="gray"
                fetch(`${url}/blogs/removelike/${eachBlogContainer.id}`,{
                    method:"PUT",
                    headers : {
                        "Context-Type" : "application/json",
                        authorization:token
                    },
                })
                .then((data)=>{
                    return(data.json());
                })
                .then((jsonData)=>{
                    console.log(jsonData.msg);
                    
                })
            }
        })

        viewButton.addEventListener("click",()=>{
            console.log("clicked",eachBlogContainer.id);
        })
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
        if(input.value===""){
            fetch(`${url}/blogs/featureingBlogs`,options)
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
        else{
            fetch(`${url}/blogs/featureingBlogs`,options)
            .then((data)=>{
                return(data.json());
            })
            .then((jsonData)=>{
                console.log(jsonData);
                const array = jsonData.data;
                blogsData = array;
                appendBlog(blogsData);
                var searchStr = input.value.toLowerCase();
                arrayAfterSearch(searchStr);
            })
            .catch((err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    }
})

input.addEventListener("input", (event) => {
    const searchStr = event.target.value.toLowerCase();
    arrayAfterSearch(searchStr);
});

function arrayAfterSearch(searchStr){
    const filteredArray = blogsData.filter((ele) => {
      return (
        ele.title.toLowerCase().includes(searchStr) ||
        ele.content.toLowerCase().includes(searchStr)
      );
    });
    appendBlog(filteredArray);
    
  }





  allmyblogs.addEventListener("click",()=>{
    if(token){
        location.href="/myblogsPage/allblogs.html";
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

