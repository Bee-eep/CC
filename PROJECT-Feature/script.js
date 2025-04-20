// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
});

// Function to open a modal
function openModal(modal) {
  modal.style.display = 'flex';
}

// Function to close a modal
function closeModal(modal) {
  modal.style.display = 'none';
}

// Event listener for close buttons
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) {
      closeModal(modal);
    }
  });
});

// Event listener for clicking outside the modal
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target);
  }
});

// Add Project Modal
const addProjectBtn = document.getElementById('add-project-btn');
const addProjectModal = document.getElementById('add-project-modal');
const addProjectForm = document.getElementById('add-project-form');

if (addProjectBtn) {
  addProjectBtn.addEventListener('click', () => {
    openModal(addProjectModal);
  });
}

if (addProjectForm) {
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectPartner = document.getElementById('project-partner').value;
    const projectSkills = document.getElementById('project-skills').value.split(',');
    const teamSize = document.getElementById('team-size').value;

    // Create project object
    const newProject = {
      id: Date.now(), // Unique ID for each project
      name: projectName,
      description: projectDescription,
      partner: projectPartner,
      skills: projectSkills,
      teamSize: teamSize,
    };

    // Save project to localStorage
    saveProjectToLocalStorage(newProject);

    // Add the new project to the current page
    addProjectToGrid(newProject);

    // Clear the form and close the modal
    addProjectForm.reset();
    closeModal(addProjectModal);
  });
}

// Join Project Modal
const joinProjectModal = document.getElementById('join-project-modal');
const thankYouModal = document.getElementById('thank-you-modal');
const joinProjectForm = document.getElementById('join-project-form');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('join-btn')) {
    openModal(joinProjectModal);
  }
});

if (joinProjectForm) {
  joinProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Close the Join Project modal
    closeModal(joinProjectModal);

    // Open the Thank You modal
    openModal(thankYouModal);

    // Reset the form
    joinProjectForm.reset();
  });
}

// Function to save project to localStorage
function saveProjectToLocalStorage(project) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to add project to the grid
function addProjectToGrid(project) {
  const projectCard = document.createElement('div');
  projectCard.classList.add('project-card');
  projectCard.setAttribute('data-id', project.id); // Add unique ID to the card

  projectCard.innerHTML = `
    <h3>${project.name}</h3>
    <p class="description">${project.description}</p>
    <p class="partner">Partner: ${project.partner}</p>
    <ul class="skills">
      ${project.skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
    </ul>
    <p class="team-status">Team Status: 1/${project.teamSize} Members Joined</p>
  `;

  // Add Join Project button only on the index.html page
  if (window.location.pathname.includes('index.html')) {
    projectCard.innerHTML += `<button class="join-btn">Join Project</button>`;
  }

  // Add Edit and Delete buttons only on the myapplication.html page
  if (window.location.pathname.includes('myapplication.html')) {
    projectCard.innerHTML += `
      <div class="action-buttons">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    // Add event listener for the delete button
    const deleteBtn = projectCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteProject(project.id);
      projectCard.remove(); // Remove the card from the DOM
    });

    // Add event listener for the edit button
    const editBtn = projectCard.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      openEditModal(project);
    });
  }

  // Add the new project to the current page's grid
  const currentGrid = document.querySelector('.project-grid');
  if (currentGrid) {
    currentGrid.appendChild(projectCard);
  }
}

// Function to delete a project
function deleteProject(projectId) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects = projects.filter(project => project.id !== projectId); // Remove the project
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to open the edit modal
function openEditModal(project) {
  // Populate the modal form with the project details
  document.getElementById('edit-project-name').value = project.name;
  document.getElementById('edit-project-description').value = project.description;
  document.getElementById('edit-project-partner').value = project.partner;
  document.getElementById('edit-project-skills').value = project.skills.join(', ');
  document.getElementById('edit-team-size').value = project.teamSize;

  // Show the edit modal
  const editModal = document.getElementById('edit-project-modal');
  openModal(editModal);

  // Handle form submission for editing
  const editProjectForm = document.getElementById('edit-project-form');
  editProjectForm.onsubmit = (e) => {
    e.preventDefault();

    // Get updated form values
    const updatedProject = {
      id: project.id, // Keep the same ID
      name: document.getElementById('edit-project-name').value,
      description: document.getElementById('edit-project-description').value,
      partner: document.getElementById('edit-project-partner').value,
      skills: document.getElementById('edit-project-skills').value.split(','),
      teamSize: document.getElementById('edit-team-size').value,
    };

    // Update the project in localStorage
    updateProjectInLocalStorage(updatedProject);

    // Reload the projects to reflect changes
    const currentGrid = document.querySelector('.project-grid');
    currentGrid.innerHTML = ''; // Clear the grid
    loadProjects(); // Reload projects

    // Close the modal
    closeModal(editModal);
  };
}

// Function to update a project in localStorage
function updateProjectInLocalStorage(updatedProject) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  const index = projects.findIndex(project => project.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject; // Update the project
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

// Function to load projects from localStorage
function loadProjects() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.forEach(project => addProjectToGrid(project));
}

// Load projects when the page loads
window.addEventListener('load', () => {
  loadProjects();
});