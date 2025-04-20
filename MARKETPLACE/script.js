// DOM Elements
const darkModeToggle = document.getElementById('dark-mode');
const body = document.body;
const productGrid = document.querySelector('.product-grid');
const addProductBtn = document.getElementById('add-product-btn');
const addProductModal = document.getElementById('add-product-modal');
const addProductForm = document.getElementById('add-product-form');
const searchBar = document.querySelector('.search-bar');
const categoryFilter = document.querySelector('.category-filter');
const closeButtons = document.querySelectorAll('.close');

// Dark Mode Toggle
darkModeToggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

// Modal Functions
function openModal(modal) {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking on X or outside
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target);
  }
});

// Add Product Functionality
addProductBtn.addEventListener('click', () => {
  openModal(addProductModal);
});

addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const product = {
    id: Date.now(),
    name: document.getElementById('product-name').value,
    description: document.getElementById('product-description').value,
    price: parseFloat(document.getElementById('product-price').value).toFixed(2),
    image: document.getElementById('product-image').value,
    category: document.getElementById('product-category').value,
    contact: document.getElementById('product-contact').value,
    date: new Date().toLocaleDateString()
  };

  saveProduct(product);
  addProductToGrid(product);
  addProductForm.reset();
  closeModal(addProductModal);
});

// Product Functions
function saveProduct(product) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
}

function addProductToGrid(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.dataset.id = product.id;
  productCard.dataset.category = product.category;
  
  productCard.innerHTML = `
    <div class="product-image" style="background-image: url('${product.image}')"></div>
    <div class="product-details">
      <h3>${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="price">$${product.price}</span>
        <span class="category">${product.category}</span>
      </div>
    </div>
  `;
  
  productGrid.appendChild(productCard);
}

function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  productGrid.innerHTML = '';
  products.forEach(product => addProductToGrid(product));
}

// Search and Filter Functionality
function filterProducts() {
  const searchTerm = searchBar.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('.product-description').textContent.toLowerCase();
    const category = card.dataset.category;
    
    const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory = !selectedCategory || category === selectedCategory;
    
    card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
  });
}

searchBar.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
// Add these new functions to your existing script.js

// Chat functionality
let currentChatId = null;

function openChat(sellerId, productName) {
  currentChatId = `chat_${sellerId}_${Date.now()}`;
  document.getElementById('chat-title').textContent = `Chat about: ${productName}`;
  
  // Load existing messages or create new chat
  const chats = JSON.parse(localStorage.getItem('chats')) || {};
  if (!chats[currentChatId]) {
    chats[currentChatId] = {
      product: productName,
      messages: []
    };
    localStorage.setItem('chats', JSON.stringify(chats));
  }
  
  renderMessages();
  openModal(document.getElementById('chat-modal'));
}

function renderMessages() {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.innerHTML = '';
  
  const chats = JSON.parse(localStorage.getItem('chats')) || {};
  const currentChat = chats[currentChatId];
  
  if (currentChat && currentChat.messages) {
    currentChat.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${msg.sender}`;
      messageDiv.innerHTML = `
        <span class="message-text">${msg.text}</span>
        <span class="message-time">${msg.time}</span>
      `;
      chatContainer.appendChild(messageDiv);
    });
  }
  
  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send message functionality
document.getElementById('send-message').addEventListener('click', () => {
  const input = document.getElementById('message-input');
  const messageText = input.value.trim();
  
  if (messageText && currentChatId) {
    const chats = JSON.parse(localStorage.getItem('chats')) || {};
    const currentChat = chats[currentChatId] || { messages: [] };
    
    currentChat.messages.push({
      text: messageText,
      sender: 'buyer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    chats[currentChatId] = currentChat;
    localStorage.setItem('chats', JSON.stringify(chats));
    
    input.value = '';
    renderMessages();
  }
});

// Update the addProductToGrid function to include Buy Now button
function addProductToGrid(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.dataset.id = product.id;
  productCard.dataset.category = product.category;
  
  productCard.innerHTML = `
    <div class="product-image" style="background-image: url('${product.image}')"></div>
    <div class="product-details">
      <h3>${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="price">$${product.price}</span>
        <span class="category">${product.category}</span>
      </div>
      <button class="buy-now-btn" data-seller="${product.contact}" data-product="${product.name}">
        Buy Now
      </button>
    </div>
  `;
  
  // Add event listener to the Buy Now button
  productCard.querySelector('.buy-now-btn').addEventListener('click', (e) => {
    const sellerId = e.target.dataset.seller;
    const productName = e.target.dataset.product;
    openChat(sellerId, productName);
  });
  
  productGrid.appendChild(productCard);
}

// Update the saveProduct function to include seller contact
function saveProduct(product) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  product.seller = "currentUser"; // In a real app, this would be the logged-in user's ID
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
}