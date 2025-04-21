// Animation functionality
const signUpButton = document.getElementById('signUp');
const container = document.querySelector('.container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});


// Form handling
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Simple validation
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    // Store user data
    localStorage.setItem('currentUser', JSON.stringify({
        name: name,
        email: email,
        // In a real app, you would NEVER store passwords like this
        password: password 
    }));
    
    alert(`Welcome ${name}! Your account has been created successfully.`);
    window.location.href = '../FEED/feed.html';
});
