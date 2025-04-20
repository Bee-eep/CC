




/* READ MORE BUTTON CODE OF POST */

  function toggleReadMore(button) {
    var parentCard = button.closest('.post-card');
    var dots = parentCard.querySelector('.dots');
    var moreText = parentCard.querySelector('.more-text');
  
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
  


 

/* HAMBURGER MENU CODE */

  document.querySelector('.hamburger').addEventListener('click', function () {
    const lowerNav = document.querySelector('.lower-nav');
    const screenWidth = window.innerWidth;
  
    if (screenWidth < 770) {
      lowerNav.style.display = lowerNav.style.display === 'none' || lowerNav.style.display === '' ? 'block' : 'none';
    } else {
      // If screen size is greater than or equal to 770 pixels, make lower nav visible in the nav section
      lowerNav.style.display = 'flex';
    }
  });
  
  // Handle resizing
  window.addEventListener('resize', function () {
    const lowerNav = document.querySelector('.lower-nav');
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= 770) {
      // If screen size is greater than or equal to 770 pixels, make lower nav visible in the nav section
      lowerNav.style.display = 'flex';
    } else {
      // If screen size is less than 770 pixels, maintain the previous logic
      lowerNav.style.display = 'none';
    }
  });
  






/* 5 POST VISIBLE AT A TIME CODE AND LOAD MORE POST BUTTON CODE */

  let visiblePosts = 5; // Number of initially visible posts
  const posts = document.querySelectorAll('.post-card');

  function showPosts(start, end) {
    for (let i = 0; i < posts.length; i++) {
      if (i >= start && i < end) {
        posts[i].style.display = 'flex';
      } else {
        posts[i].style.display = 'none';
      }
    }
  }

  function loadMorePosts() {
    visiblePosts += 5; // Increase the number of visible posts
    if (visiblePosts >= posts.length) {
      document.getElementById('loadMoreBtn').style.display = 'none'; // Hide the button when all posts are visible
    }
    showPosts(0, visiblePosts);
  }

  // Initial display
  showPosts(0, visiblePosts);












