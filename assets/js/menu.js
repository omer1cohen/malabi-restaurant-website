// Menu Page Functionality
function initMenuPage() {
    console.log('Initializing Menu Page...');
    
    loadMenuProducts();
    bindMenuFilters();
    bindProductModals();
}

// Load and display menu products
async function loadMenuProducts(category = 'all') {
    const productsContainer = document.getElementById('menuProducts');
    if (!productsContainer) return;

    try {
        utils.showLoading(productsContainer);
        
        // Filter products based on category
        const filteredProducts = ProductManager.filterByCategory(category);
        
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products">
                    <p>לא נמצאו מוצרים בקטגוריה זו</p>
                    <button class="btn btn-outline" data-action="reload-menu" data-category="all">הצג את כל המוצרים</button>
                </div>
            `;
            return;
        }

        // Render products
        productsContainer.innerHTML = filteredProducts
            .map(product => ProductManager.renderProductCard(product))
            .join('');
            
        // Update product cards with current cart state
        filteredProducts.forEach(product => {
            cart.updateProductCard(product.id);
        });
        
    } catch (error) {
        console.error('Error loading menu products:', error);
        productsContainer.innerHTML = `
            <div class="error-state">
                <p>שגיאה בטעינת המוצרים</p>
                <button class="btn btn-outline" data-action="reload-menu" data-category="${category}">נסה שוב</button>
            </div>
        `;
    } finally {
        utils.hideLoading(productsContainer);
    }
}

// Bind category filter buttons
function bindMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Load products for selected category
            const category = button.dataset.category;
            loadMenuProducts(category);
            
            // Scroll to products section
            document.querySelector('.menu-products').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Bind product modal functionality
function bindProductModals() {
    document.addEventListener('click', (e) => {
        // Handle product card click (but not buttons)
        const productCard = e.target.closest('.product-card');
        if (productCard && 
            !e.target.closest('.product-actions') && 
            !e.target.closest('button')) {
            
            const productId = productCard.dataset.productId;
            openProductModal(productId);
            return;
        }

        // Handle reload menu button
        const reloadBtn = e.target.closest('[data-action="reload-menu"]');
        if (reloadBtn) {
            loadMenuProducts(reloadBtn.dataset.category);
            return;
        }

        // Modal Specific Actions (delegated to cart)
        const modalBtn = e.target.closest('.product-modal-actions button');
        if (modalBtn && modalBtn.dataset.action && modalBtn.dataset.id) {
            const action = modalBtn.dataset.action;
            const productId = modalBtn.dataset.id;
            
            // The global handler in app.js already handles add/increase/decrease
            // But we need to refresh the modal UI after these actions
            setTimeout(() => {
                if (document.getElementById('productModal').classList.contains('show')) {
                    openProductModal(productId);
                }
            }, 100);
        }
    });
}

// Open product details modal
function openProductModal(productId) {
    const product = ProductManager.getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const cartQuantity = cart.getProductQuantity(productId);
    
    modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}"
                     onerror="this.src='assets/images/placeholder-malabi.jpg'">
            </div>
            <div class="product-modal-details">
                <h3 class="product-modal-title">${product.name}</h3>
                <p class="product-modal-description">${product.description}</p>
                
                <div class="product-modal-ingredients">
                    <h4>רכיבים:</h4>
                    <ul>
                        ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                ${product.allergens && product.allergens.length > 0 ? `
                    <div class="product-modal-allergens">
                        <h4>אלרגנים:</h4>
                        <div class="allergens-list">
                            ${product.allergens.map(allergen => `<span class="allergen-tag">${allergen}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="product-modal-price">
                    <span class="price-label">מחיר:</span>
                    <span class="price-value">${utils.formatPrice(product.price)}</span>
                </div>
                
                ${product.available ? `
                    <div class="product-modal-actions">
                        ${cartQuantity > 0 ? `
                            <div class="modal-quantity-selector">
                                <span>כמות בעגלה:</span>
                                <div class="quantity-controls">
                                    <button class="quantity-btn" data-action="decrease" data-id="${productId}">-</button>
                                    <span class="quantity">${cartQuantity}</span>
                                    <button class="quantity-btn" data-action="increase" data-id="${productId}">+</button>
                                </div>
                            </div>
                        ` : `
                            <button class="btn btn-primary btn-large" data-action="add" data-id="${productId}">
                                הוסף לעגלה
                            </button>
                        `}
                    </div>
                ` : `
                    <div class="product-unavailable-notice">
                        <p>מוצר זה אינו זמין כרגע</p>
                    </div>
                `}
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    
    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

// Handle modal keyboard events
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('productModal');
    
    if (modal && modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    }
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    
    if (modal && modal.classList.contains('show') && e.target === modal) {
        closeProductModal();
    }
});

// Search functionality (if needed in the future)
function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim().toLowerCase();
        
        searchTimeout = setTimeout(() => {
            searchProducts(query);
        }, 300);
    });
}

function searchProducts(query) {
    if (!query) {
        loadMenuProducts();
        return;
    }
    
    const filteredProducts = AppState.products.filter(product => {
        return product.available && (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.nameEn.toLowerCase().includes(query)
        );
    });
    
    const productsContainer = document.getElementById('menuProducts');
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <p>לא נמצאו תוצאות עבור "${query}"</p>
                <button class="btn btn-outline" onclick="clearSearch()">נקה חיפוש</button>
            </div>
        `;
    } else {
        productsContainer.innerHTML = filteredProducts
            .map(product => ProductManager.renderProductCard(product))
            .join('');
            
        // Update cart states
        filteredProducts.forEach(product => {
            cart.updateProductCard(product.id);
        });
    }
}

function clearSearch() {
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.value = '';
    }
    loadMenuProducts();
}

// Initialize lazy loading for product images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}