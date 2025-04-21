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

// Track my products
let myProductsIds = JSON.parse(localStorage.getItem('myProductsIds')) || [];

// Dark Mode Toggle
darkModeToggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

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

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.modal'));
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target);
  }
});

// Product Functions
function saveProduct(product) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
}

addProductBtn.addEventListener('click', () => openModal(addProductModal));

addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const productId = Date.now();
  const product = {
    id: productId,
    name: document.getElementById('product-name').value,
    description: document.getElementById('product-description').value,
    price: parseFloat(document.getElementById('product-price').value).toFixed(2),
    image: document.getElementById('product-image').value,
    category: document.getElementById('product-category').value,
    contact: document.getElementById('product-contact').value,
    date: new Date().toLocaleDateString()
  };

  // Add to my products
  myProductsIds.push(productId);
  localStorage.setItem('myProductsIds', JSON.stringify(myProductsIds));

  saveProduct(product);
  addProductToGrid(product);
  addProductForm.reset();
  closeModal(addProductModal);
});

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
        <span class="price">₹${product.price}</span>
        <span class="category">${product.category}</span>
      </div>
      <button class="buy-now-btn" data-seller="${product.contact}" data-product="${product.name}">
        Buy Now
      </button>
    </div>
  `;
  
  productCard.querySelector('.buy-now-btn').addEventListener('click', (e) => {
    openChat(e.target.dataset.seller, e.target.dataset.product);
  });
  
  productGrid.appendChild(productCard);
}

function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  productGrid.innerHTML = '';
  products.forEach(product => addProductToGrid(product));
}

// Search and Filter
function filterProducts() {
  const searchTerm = searchBar.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('.product-description').textContent.toLowerCase();
    const category = card.dataset.category;
    
    card.style.display = (name.includes(searchTerm) || description.includes(searchTerm)) && 
                         (!selectedCategory || category === selectedCategory) 
                         ? 'block' : 'none';
  });
}

searchBar.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Initialize sample data
function initializeSampleData() {
  if (localStorage.getItem('products') === null) {
    const sampleProducts = [
      {
        id: 1,
        name: "Used Calculus Textbook",
        description: "Calculus textbook from last semester, in good condition.",
        price: "1200.00",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Books",
        contact: "seller1@example.com",
        date: new Date().toLocaleDateString()
      },
      {
        id: 2,
        name: "Wireless Headphones",
        description: "Barely used wireless headphones with noise cancellation.",
        price: "2500.00",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Electronics",
        contact: "seller2@example.com",
        date: new Date().toLocaleDateString()
      }
    ];
    
    localStorage.setItem('products', JSON.stringify(sampleProducts));
    localStorage.setItem('myProductsIds', JSON.stringify([1])); // Mark textbook as mine
  }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  initializeSampleData();
  myProductsIds = JSON.parse(localStorage.getItem('myProductsIds')) || [];
  loadProducts();
});