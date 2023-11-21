function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/blog/";
    const loadPostsButton = document.getElementById("btnLoadPosts");
    const viewButton = document.getElementById("btnViewPost");
    const postsSelect = document.getElementById("posts");
    const postTitleH1 = document.getElementById("post-title");
    const postBodyP = document.getElementById("post-body");    
    const postCommentsUl = document.getElementById("post-comments");

    let allPosts = {};

    loadPostsButton.addEventListener("click", async () => {
        postsSelect.innerHTML = "";
        const response = await fetch(baseUrl + "posts");
        allPosts = await response.json();

        for (const [postId, postObj] of Object.entries(allPosts)) {
            const option = document.createElement("option");
            option.value = postId;
            option.textContent = postObj.title;
            postsSelect.appendChild(option);
        }
    })

    viewButton.addEventListener("click", async () => {
        postBodyP.innerHTML = "";
        postCommentsUl.innerHTML = "";

        const postId = postsSelect.value;        
        postBodyP.textContent = allPosts[postId].body;
        postTitleH1.textContent = allPosts[postId].title;      

        const response = await fetch(baseUrl + "comments");
        const allCommentsInfo = await response.json();
        
        const filteredComments = Object.values(allCommentsInfo).filter(x => x.postId === postId);                       
        filteredComments.forEach(comment => {
            const li = document.createElement("li");
            li.id = comment.id;
            li.textContent = comment.text;
            postCommentsUl.appendChild(li);
        })
    })
}

attachEvents();