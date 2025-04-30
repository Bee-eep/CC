// Modal functionality
const modal = document.getElementById("addPostModal");
const addPostBtn = document.getElementById("addPostBtn"); // Changed to use ID
const closeBtn = document.querySelector(".close");
const postForm = document.getElementById("postForm");

// Open modal - This remains the same
addPostBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Open modal
addPostBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const postContent = document.getElementById("postContent").value;
  const postImage = document.getElementById("postImage").files[0];

  if (!postContent || !postImage) {
    alert("Please fill out all fields!");
    return;
  }

  const newPost = {
    id: Date.now(),
    content: postContent,
    image: URL.createObjectURL(postImage),
    clubLogo: "Image/Gdsc-B.png",
    clubName: "GDSC",
    role: "Member",
  };

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  createPostElement(newPost);

  postForm.reset();
  modal.style.display = "none";
});

// Function to create a post element and add it to the UI
function createPostElement(post) {
  const newPost = document.createElement("div");
  newPost.classList.add("post-card");

  const postImgDiv = document.createElement("div");
  postImgDiv.classList.add("Post-img");
  const img = document.createElement("img");
  img.src = post.image;
  img.alt = "Post Image";
  postImgDiv.appendChild(img);

  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const topSec = document.createElement("div");
  topSec.classList.add("Top-sec");

  const profilePic = document.createElement("img");
  profilePic.src = post.clubLogo;
  profilePic.alt = "Profile Picture";

  const heading = document.createElement("h1");
  heading.innerHTML = `${post.clubName} <span>${post.role}</span>`;

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa", "fa-pencil");
  editIcon.setAttribute("aria-hidden", "true");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash");
  deleteIcon.setAttribute("aria-hidden", "true");
  deleteIcon.style.marginLeft = "10px";
  deleteIcon.style.cursor = "pointer";

  // Add delete functionality
  deleteIcon.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id, newPost);
    }
  });

  topSec.appendChild(profilePic);
  topSec.appendChild(heading);
  topSec.appendChild(editIcon);
  topSec.appendChild(deleteIcon);

  const midSec = document.createElement("div");
  midSec.classList.add("mid-sec");

  const postText = document.createElement("p");
  postText.textContent = post.content;
  midSec.appendChild(postText);

  const endSec = document.createElement("div");
  endSec.classList.add("end-sec");

  const readMoreBtn = document.createElement("button");
  readMoreBtn.classList.add("read-more-btn");
  readMoreBtn.innerHTML = `<span class="Redmore">READ MORE</span>`;
  readMoreBtn.addEventListener("click", function () {
    toggleReadMore(this);
  });

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

  postHeader.appendChild(topSec);
  postHeader.appendChild(midSec);
  postHeader.appendChild(endSec);

  newPost.appendChild(postImgDiv);
  newPost.appendChild(postHeader);

  const postContainer = document.getElementById("postContainer");
  postContainer.insertBefore(newPost, postContainer.firstChild);
}

// Delete post by ID and element
function deletePost(postId, postElement) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = posts.filter((p) => p.id !== postId);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  postElement.remove();

  const allPosts = document.querySelectorAll(".post-card");
  visiblePosts = Math.min(visiblePosts, allPosts.length);
  showPosts(0, visiblePosts);

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn && visiblePosts < allPosts.length) {
    loadMoreBtn.style.display = "block";
  }
}

// Load posts from localStorage
window.addEventListener("load", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.forEach((post) => createPostElement(post));
});

// READ MORE toggle
function toggleReadMore(button) {
  var parentCard = button.closest(".post-card");
  var dots = parentCard.querySelector(".dots");
  var moreText = parentCard.querySelector(".more-text");

  if (dots && moreText) {
    if (dots.style.display === "none" || dots.style.display === "") {
      dots.style.display = "inline";
      button.innerHTML = "READ MORE";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      button.innerHTML = "READ LESS";
      moreText.style.display = "inline";
    }
  }
}

// HAMBURGER MENU
document.querySelector(".hamburger").addEventListener("click", function () {
  const lowerNav = document.querySelector(".lower-nav");
  const screenWidth = window.innerWidth;

  if (screenWidth < 770) {
    lowerNav.style.display =
      lowerNav.style.display === "none" || lowerNav.style.display === ""
        ? "block"
        : "none";
  } else {
    lowerNav.style.display = "flex";
  }
});

// Resize nav handling
window.addEventListener("resize", function () {
  const lowerNav = document.querySelector(".lower-nav");
  const screenWidth = window.innerWidth;

  if (screenWidth >= 770) {
    lowerNav.style.display = "flex";
  } else {
    lowerNav.style.display = "none";
  }
});

// LOAD MORE POSTS
let visiblePosts = 5;
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
  visiblePosts += 5;
  if (visiblePosts >= posts.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
  showPosts(0, visiblePosts);
}

showPosts(0, visiblePosts);




// In your admin.js file - add these updates:

// Initialize elements
// const addPostBtn = document.getElementById("addPostBtn");
const addSponsorBtn = document.getElementById("addSponsorBtn");
const sponsorsPreview = document.getElementById("sponsorsPreview");

// Load sponsors preview on page load
window.addEventListener("load", () => {
  loadSponsorsPreview();
});

// Sponsor Preview Functionality
function loadSponsorsPreview() {
  const sponsors = JSON.parse(localStorage.getItem("sponsors")) || [];
  sponsorsPreview.innerHTML = '';
  
  // Show only the 3 most recent sponsors
  const recentSponsors = sponsors.slice(0, 3);
  
  if (recentSponsors.length === 0) {
    sponsorsPreview.innerHTML = '<p class="no-sponsors">No sponsors added yet</p>';
    return;
  }

  recentSponsors.forEach(sponsor => {
    const sponsorCard = document.createElement("div");
    sponsorCard.className = "sponsor-preview-card";
    
    sponsorCard.innerHTML = `
      <img src="${sponsor.logo}" alt="${sponsor.name}" class="sponsor-preview-logo">
      <div class="sponsor-preview-info">
        <span class="sponsor-tier ${sponsor.tier}">${sponsor.tier}</span>
        <h4>${sponsor.name}</h4>
      </div>
    `;
    
    sponsorsPreview.appendChild(sponsorCard);
  });
}

// Sponsor Modal Handling
const sponsorModal = document.getElementById("addSponsorModal");
const closeSponsorBtn = sponsorModal.querySelector(".close");
const sponsorForm = document.getElementById("sponsorForm");

// Open sponsor modal
addSponsorBtn.addEventListener("click", () => {
  sponsorModal.style.display = "block";
});

// Close sponsor modal
closeSponsorBtn.addEventListener("click", () => {
  sponsorModal.style.display = "none";
});

// Handle sponsor form submission
sponsorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const sponsorData = {
    id: Date.now(),
    name: document.getElementById("sponsorName").value,
    logo: URL.createObjectURL(document.getElementById("sponsorLogo").files[0]),
    link: document.getElementById("sponsorLink").value || "#",
    tier: document.getElementById("sponsorTier").value
  };

  const sponsors = JSON.parse(localStorage.getItem("sponsors")) || [];
  sponsors.unshift(sponsorData); // Add new sponsor at beginning
  localStorage.setItem("sponsors", JSON.stringify(sponsors));

  // Refresh UI
  sponsorForm.reset();
  sponsorModal.style.display = "none";
  loadSponsorsPreview();
  
  // Show success message
  alert("Sponsor added successfully!");
});

// Keep all your existing post functionality exactly as is
// ... [your existing post-related code remains unchanged] ...