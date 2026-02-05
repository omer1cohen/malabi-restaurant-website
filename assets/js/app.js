// Main Application State and Configuration
const CONFIG = {
    WHATSAPP_BUSINESS_NUMBER: "972501234567",
    SITE_URL: "https://malabipalace.co.il",
    DELIVERY_FEE: 10,
    DELIVERY_AREAS: ["תל אביב", "רמת גן", "גבעתיים"]
};

// Global Application State
const AppState = {
    cart: {
        items: [],
        total: 0,
        count: 0
    },
    products: [],
    ui: {
        cartOpen: false,
        loading: false
    }
};

// Utility Functions
const utils = {
    // Format price in Israeli Shekels
    formatPrice: (price) => `₪${price}`,
    
    // Generate unique order ID
    generateOrderId: () => {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substr(2, 5);
        return `${timestamp}${randomStr}`.toUpperCase();
    },
    
    // Format date in Hebrew
    formatDate: () => {
        return new Date().toLocaleString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // Validate Israeli phone number
    validateIsraeliPhone: (phone) => {
        const phoneRegex = /^05[0-9]-?[0-9]{7}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },
    
    // Validate Hebrew name
    validateHebrewName: (name) => {
        const hebrewRegex = /^[\u0590-\u05FF\s\-']+$/;
        return hebrewRegex.test(name) && name.length >= 2;
    },
    
    // Show loading state
    showLoading: (element) => {
        if (element) {
            element.classList.add('loading');
            element.disabled = true;
        }
        AppState.ui.loading = true;
    },
    
    // Hide loading state
    hideLoading: (element) => {
        if (element) {
            element.classList.remove('loading');
            element.disabled = false;
        }
        AppState.ui.loading = false;
    },
    
    // Show toast notification
    showToast: (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
};

// Product Management
const ProductManager = {
    // Load products from JSON
    async loadProducts() {
        try {
            utils.showLoading();
            const response = await fetch('assets/data/products.json');
            const data = await response.json();
            AppState.products = data.products;
            return AppState.products;
        } catch (error) {
            console.error('Error loading products:', error);
            utils.showToast('שגיאה בטעינת המוצרים', 'error');
            return [];
        } finally {
            utils.hideLoading();
        }
    },
    
    // Get product by ID
    getProductById(id) {
        return AppState.products.find(product => product.id === id);
    },
    
    // Filter products by category
    filterByCategory(category) {
        if (category === 'all') {
            return AppState.products.filter(product => product.available);
        }
        return AppState.products.filter(product => 
            product.category === category && product.available
        );
    },
    
    // Get featured products
    getFeaturedProducts() {
        return AppState.products.filter(product => 
            product.featured && product.available
        );
    },
    
    // Render product card HTML
    renderProductCard(product) {
        const isInCart = cart.hasProduct(product.id);
        const cartQuantity = isInCart ? cart.getProductQuantity(product.id) : 0;
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" 
                         onerror="this.src='assets/images/placeholder-malabi.svg'">
                    ${!product.available ? '<div class="product-unavailable">לא זמין</div>' : ''}
                </div>
                <div class="product-info">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${utils.formatPrice(product.price)}</div>
                    ${product.available ? `
                        <div class="product-actions">
                            <div class="quantity-selector" ${cartQuantity === 0 ? 'style="display: none;"' : ''}>
                                <button class="quantity-btn" data-action="decrease" data-id="${product.id}">-</button>
                                <span class="quantity">${cartQuantity}</span>
                                <button class="quantity-btn" data-action="increase" data-id="${product.id}">+</button>
                            </div>
                            <button class="btn btn-primary add-to-cart-btn" 
                                    data-action="add" data-id="${product.id}"
                                    ${cartQuantity > 0 ? 'style="display: none;"' : ''}>
                                הוסף לעגלה
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
};

// Cart Toggle Function (Global)
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar) {
        AppState.ui.cartOpen = !AppState.ui.cartOpen;
        cartSidebar.classList.toggle('open', AppState.ui.cartOpen);
        
        if (cartOverlay) {
            cartOverlay.classList.toggle('visible', AppState.ui.cartOpen);
            cartOverlay.classList.toggle('opacity-100', AppState.ui.cartOpen);
            cartOverlay.classList.toggle('opacity-0', !AppState.ui.cartOpen);
            cartOverlay.classList.toggle('invisible', !AppState.ui.cartOpen);
        }
        
        // Prevent body scroll when cart is open
        document.body.classList.toggle('cart-open', AppState.ui.cartOpen);
    }
}

// Modal Close Function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Mister Malabi App Initializing...');
    
    // Load products
    await ProductManager.loadProducts();
    
    // Initialize cart
    if (typeof cart !== 'undefined' && cart.init) {
        cart.init();
        console.log('Cart initialized successfully');
    } else {
        console.error('Cart object not found or missing init method');
    }
    
    // Global Click Handler (Event Delegation)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, .cart-overlay');
        if (!target) return;

        // Toggle Cart
        if (target.matches('.cart-btn, .cart-close, #cartOverlay, .cart-overlay')) {
            e.preventDefault();
            toggleCart();
        }

        // Close Modal
        if (target.matches('.modal-close')) {
            const modal = target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }

        // Product Actions
        if (target.dataset.action && target.dataset.id) {
            const action = target.dataset.action;
            const productId = target.dataset.id;
            const currentQuantity = cart.getProductQuantity(productId);

            if (action === 'add' || action === 'increase') {
                cart.addItem(productId, 1);
            } else if (action === 'decrease') {
                cart.updateQuantity(productId, currentQuantity - 1);
            }
        }
    });

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'menu.html':
            if (typeof initMenuPage === 'function') {
                initMenuPage();
            }
            break;
        case 'order.html':
            if (typeof initOrderPage === 'function') {
                initOrderPage();
            }
            break;
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartBtn = document.querySelector('.cart-btn');
        
        if (AppState.ui.cartOpen && 
            !cartSidebar.contains(e.target) && 
            !cartBtn.contains(e.target)) {
            toggleCart();
        }
    });
    
    console.log('Mister Malabi App Initialized Successfully');
});

// Home Page Initialization
function initHomePage() {
    loadFeaturedProducts();
    initProductTabs();
}

// Load Featured Products for Homepage
async function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) {
        console.warn('Featured products container not found');
        return;
    }
    
    try {
        // Make sure products are loaded first
        if (AppState.products.length === 0) {
            console.log('Products not loaded yet, loading now...');
            await ProductManager.loadProducts();
        }
        
        const featuredProducts = ProductManager.getFeaturedProducts();
        console.log('Found featured products:', featuredProducts.length);
        
        if (featuredProducts.length === 0) {
            featuredContainer.innerHTML = '<p class="no-products">אין מוצרים מומלצים להצגה</p>';
            return;
        }
        
        const productsHTML = featuredProducts
            .map(product => ProductManager.renderProductCard(product))
            .join('');
        
        featuredContainer.innerHTML = productsHTML;
        console.log('Featured products rendered successfully');
            
    } catch (error) {
        console.error('Error loading featured products:', error);
        featuredContainer.innerHTML = '<p class="error">שגיאה בטעינת המוצרים המומלצים</p>';
    }
}

// Error handling for missing images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.log('Image failed to load:', e.target.src);
        // Try SVG placeholder first, then JPG
        if (e.target.src.includes('placeholder-malabi.svg')) {
            e.target.src = 'assets/images/placeholder-malabi.jpg';
        } else if (!e.target.src.includes('placeholder-malabi')) {
            e.target.src = 'assets/images/placeholder-malabi.svg';
        }
    }
}, true);

// Product Tab Functionality
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.product-tab');
    const productCards = document.querySelectorAll('[data-category]');
    
    if (!tabButtons.length || !productCards.length) {
        return;
    }
    
    // Add click event listeners to tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('[data-category]');
    
    productCards.forEach((card, index) => {
        const cardCategories = card.dataset.category.split(' ');
        const shouldShow = category === 'all' || cardCategories.includes(category);
        
        if (shouldShow) {
            // Animate in
            card.style.display = 'block';
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        } else {
            // Animate out
            card.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Add fadeOut animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);