// Sample club data - in a real app, this would come from an API or database
const clubs = [
    {
        id: 1,
        name: "Computer Science Club",
        description: "A club for computer science enthusiasts to collaborate on projects, participate in hackathons, and learn new technologies.",
        mainImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
        page: "cs-club.html"
    },
    {
        id: 2,
        name: "Debate Society",
        description: "Join us to improve your public speaking and critical thinking skills through competitive debates and workshops.",
        mainImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        logo: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
        page: "debate-society.html"
    },
    {
        id: 3,
        name: "Environmental Club",
        description: "Dedicated to promoting sustainability on campus and organizing eco-friendly initiatives and awareness campaigns.",
        mainImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        logo: "https://cdn-icons-png.flaticon.com/512/484/484582.png",
        page: "environmental-club.html"
    },
    {
        id: 4,
        name: "Photography Club",
        description: "For photography enthusiasts of all levels to share their work, learn new techniques, and organize photo walks.",
        mainImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        logo: "https://cdn-icons-png.flaticon.com/512/3342/3342137.png",
        page: "photography-club.html"
    },
    {
        id: 5,
        name: "Music Society",
        description: "Open to all musicians and music lovers. We organize concerts, jam sessions, and music workshops.",
        mainImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        logo: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
        page: "music-society.html"
    },
    {
        id: 6,
        name: "Entrepreneurship Club",
        description: "Fostering innovation and business skills through speaker events, startup competitions, and networking opportunities.",
        mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        logo: "https://cdn-icons-png.flaticon.com/512/3050/3050154.png",
        page: "entrepreneurship-club.html"
    }
];

// Function to create club cards
function createClubCards(clubsArray) {
    const container = document.getElementById('clubsContainer');
    container.innerHTML = ''; // Clear existing cards
    
    clubsArray.forEach(club => {
        const card = document.createElement('a');
        card.className = 'club-card';
        card.href = club.page;
        
        card.innerHTML = `
            <img src="${club.mainImage}" alt="${club.name}" class="club-image">
            <div class="club-content">
                <div class="club-header">
                    <img src="${club.logo}" alt="${club.name} Logo" class="club-logo">
                    <h3 class="club-title">${club.name}</h3>
                </div>
                <p class="club-description">${club.description}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Initial load of all clubs
document.addEventListener('DOMContentLoaded', () => {
    createClubCards(clubs);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredClubs = clubs.filter(club => 
            club.name.toLowerCase().includes(searchTerm) || 
            club.description.toLowerCase().includes(searchTerm)
        );
        createClubCards(filteredClubs);
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});