// sponsors.js
document.addEventListener('DOMContentLoaded', function() {
    const goldSponsorsContainer = document.getElementById('goldSponsors');
    const silverSponsorsContainer = document.getElementById('silverSponsors');
    const bronzeSponsorsContainer = document.getElementById('bronzeSponsors');
    
    // Load sponsors from localStorage
    const sponsors = JSON.parse(localStorage.getItem('sponsors')) || [];
    
    // Display sponsors by tier
    displaySponsors(sponsors, 'gold', goldSponsorsContainer);
    displaySponsors(sponsors, 'silver', silverSponsorsContainer);
    displaySponsors(sponsors, 'bronze', bronzeSponsorsContainer);
    
    // If no sponsors, show a message
    if (sponsors.length === 0) {
      const noSponsors = document.createElement('p');
      noSponsors.textContent = 'No sponsors have been added yet.';
      noSponsors.style.textAlign = 'center';
      noSponsors.style.margin = '40px 0';
      goldSponsorsContainer.appendChild(noSponsors);
    }
  });
  
  function displaySponsors(sponsors, tier, container) {
    const tierSponsors = sponsors.filter(sponsor => sponsor.tier === tier);
    
    tierSponsors.forEach(sponsor => {
      const sponsorCard = document.createElement('div');
      sponsorCard.className = 'sponsor-card';
      
      const logoImg = document.createElement('img');
      logoImg.className = 'sponsor-logo';
      logoImg.src = sponsor.logo;
      logoImg.alt = `${sponsor.name} logo`;
      
      const nameElement = document.createElement('h3');
      nameElement.className = 'sponsor-name';
      nameElement.textContent = sponsor.name;
      
      const websiteLink = document.createElement('a');
      websiteLink.className = 'visit-website';
      websiteLink.href = sponsor.link;
      websiteLink.target = '_blank';
      websiteLink.textContent = 'Visit Website';
      
      sponsorCard.appendChild(logoImg);
      sponsorCard.appendChild(nameElement);
      sponsorCard.appendChild(websiteLink);
      
      container.appendChild(sponsorCard);
    });
  }
  
  // Hamburger menu functionality (same as admin.js)
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