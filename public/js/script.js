// wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // select the button
    const btn = document.querySelector("#btn");
  
    // add event listener for the button
    btn.addEventListener("click", function() {
      // select the container for the posts
      const postContainer = document.querySelector("#post-container");
  
      // create a new post element
      const post = document.createElement("div");
      post.classList.add("post");
  
      // create title element
      const title = document.createElement("h2");
      title.textContent = "New Post Title";
  
      // create body element
      const body = document.createElement("p");
      body.textContent = "New Post Body";
  
      // append the title and body to the post element
      post.appendChild(title);
      post.appendChild(body);
  
      // append the post element to the container
      postContainer.appendChild(post);
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const element = document.querySelector("#element-id");
    if (element) {
      element.addEventListener("click", function() {
        // do something
      });
    }
  });
  