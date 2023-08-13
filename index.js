const postsContainer = document.getElementById("posts");

async function fetchPosts() {
  try {
    const response = await fetch("http://localhost:3000/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function displayPosts() {
  const posts = await fetchPosts();

  postsContainer.innerHTML=''; 

  posts.forEach((post) => {
    console.log("Rendering post:", post);
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      `;
    postsContainer.appendChild(postElement);
  });
}

displayPosts();
