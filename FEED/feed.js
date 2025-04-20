// CHANGE IMAGE BUTTON CODE JS
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]); // here the length of items = 6
});

// AUTO CHANGE SLIDE AFTER 8 SEC CODE JS
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").appendChild(items[0]);
  }, 8000); // Change slide every 8 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Add an auto-slide on page load
startAutoSlide();

// Stop auto-slide on manual navigation (next/prev buttons)
next.addEventListener("click", function () {
  stopAutoSlide();
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
  startAutoSlide(); // Restart the auto-slide after a manual navigation
});

prev.addEventListener("click", function () {
  stopAutoSlide();
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]);
  startAutoSlide(); // Restart the auto-slide after a manual navigation
});

// READ MORE BUTTON CODE OF POST
function toggleReadMore(button) {
  var parentCard = button.closest(".post-card");
  var dots = parentCard.querySelector(".dots");
  var moreText = parentCard.querySelector(".more-text");

  if (dots.style.display === "none" || dots.style.display === "") {
    dots.style.display = "inline";
    button.innerHTML = "READ MORE";
    moreText.style.display = "none";
    button.style.color = "whitesmoke";
    button.style.fontWeight = "600";
  } else {
    dots.style.display = "none";
    button.innerHTML = "READ LESS";
    moreText.style.display = "inline";
    button.style.color = "whitesmoke";
    button.style.fontWeight = "600";
  }
}

// HAMBURGER MENU CODE
document.querySelector(".hamburger").addEventListener("click", function () {
  const lowerNav = document.querySelector(".lower-nav");
  const screenWidth = window.innerWidth;

  if (screenWidth < 770) {
    lowerNav.style.display =
      lowerNav.style.display === "none" || lowerNav.style.display === ""
        ? "block"
        : "none";
  } else {
    // If screen size is greater than or equal to 770 pixels, make lower nav visible in the nav section
    lowerNav.style.display = "flex";
  }
});

// Handle resizing
window.addEventListener("resize", function () {
  const lowerNav = document.querySelector(".lower-nav");
  const screenWidth = window.innerWidth;

  if (screenWidth >= 770) {
    // If screen size is greater than or equal to 770 pixels, make lower nav visible in the nav section
    lowerNav.style.display = "flex";
  } else {
    // If screen size is less than 770 pixels, maintain the previous logic
    lowerNav.style.display = "none";
  }
});

// 5 POST VISIBLE AT A TIME CODE AND LOAD MORE POST BUTTON CODE
let visiblePosts = 5; // Number of initially visible posts
const posts = document.querySelectorAll(".post-card");

function showPosts(start, end) {
  for (let i = 0; i < posts.length; i++) {
    if (i >= start && i < end) {
      posts[i].style.display = "flex";
    } else {
      posts[i].style.display = "none";
    }
  }
}

function loadMorePosts() {
  visiblePosts += 5; // Increase the number of visible posts
  if (visiblePosts >= posts.length) {
    document.getElementById("loadMoreBtn").style.display = "none"; // Hide the button when all posts are visible
  }
  showPosts(0, visiblePosts);
}

// Initial display
showPosts(0, visiblePosts);

// Function to fetch and display ongoing projects
function loadOngoingProjects() {
  const ongoingProjectsContainer = document.getElementById("ongoingProjectsContainer");
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Clear the container before adding new projects
  ongoingProjectsContainer.innerHTML = "";

  // Loop through the projects and create HTML for each
  projects.forEach((project) => {
    const projectLink = document.createElement("a");
    projectLink.href = "../PROJECT-Feature/index.html"; // Redirect to index.html
    projectLink.style.textDecoration = "none"; // Remove underline from link
    projectLink.style.color = "inherit"; // Inherit text color

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    projectItem.innerHTML = `
      <h3>${project.name}</h3>
      <p class="skills">Skills: ${project.skills.join(", ")}</p>
      <p class="team-status">Team Status: 1/${project.teamSize} Members Joined</p>
    `;

    projectLink.appendChild(projectItem);
    ongoingProjectsContainer.appendChild(projectLink);
  });
}

// Load ongoing projects when the page loads
window.addEventListener("load", () => {
  loadOngoingProjects();
});

// Function to create a post element and add it to the UI
function createPostElement(post) {
  const newPost = document.createElement("div");
  newPost.classList.add("post-card");

  // Post Image Section
  const postImgDiv = document.createElement("div");
  postImgDiv.classList.add("Post-img");
  const img = document.createElement("img");
  img.src = post.image; // Use the uploaded image
  img.alt = "Post Image";
  postImgDiv.appendChild(img);

  // Post Header Section
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const topSec = document.createElement("div");
  topSec.classList.add("Top-sec");

  const profilePic = document.createElement("img");
  profilePic.src = post.clubLogo; // Constant profile picture
  profilePic.alt = "Profile Picture";

  const heading = document.createElement("h1");
  heading.innerHTML = `${post.clubName} <span>${post.role}</span>`;

  const editIcon = document.createElement("i");
  editIcon.setAttribute("aria-hidden", "true");

  topSec.appendChild(profilePic);
  topSec.appendChild(heading);
  topSec.appendChild(editIcon);

  // Post Content Section
  const midSec = document.createElement("div");
  midSec.classList.add("mid-sec");

  const postText = document.createElement("p");
  postText.textContent = post.content;

  midSec.appendChild(postText);

  // Post Footer Section
  const endSec = document.createElement("div");
  endSec.classList.add("end-sec");

  const readMoreBtn = document.createElement("button");
  readMoreBtn.classList.add("read-more-btn");
  readMoreBtn.innerHTML = `<span class="Redmore">READ MORE</span>`;

  const socials = document.createElement("div");
  socials.classList.add("Socialss");

  const instagramBtn = document.createElement("button");
  instagramBtn.classList.add("Linnk");
  instagramBtn.innerHTML = `<a href="#"><i class="fab fa-instagram"></i></a>`;

  const whatsappBtn = document.createElement("button");
  whatsappBtn.classList.add("Linnk");
  whatsappBtn.innerHTML = `<a href="#"><i class="fab fa-whatsapp"></i></a>`;

  const shareBtn = document.createElement("button");
  shareBtn.classList.add("Linnk");
  shareBtn.innerHTML = `<a href="#"><i class="fas fa-share"></i></a>`;

  socials.appendChild(instagramBtn);
  socials.appendChild(whatsappBtn);
  socials.appendChild(shareBtn);

  endSec.appendChild(readMoreBtn);
  endSec.appendChild(socials);

  // Assemble the post
  postHeader.appendChild(topSec);
  postHeader.appendChild(midSec);
  postHeader.appendChild(endSec);

  newPost.appendChild(postImgDiv);
  newPost.appendChild(postHeader);

  // Add the new post to the post container
  const postContainer = document.getElementById("postContainer");
  postContainer.insertBefore(newPost, postContainer.firstChild);
}

// Load posts from localStorage when the feed page loads
window.addEventListener("load", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.forEach((post) => createPostElement(post));
});