// Shopping Cart Management
const cart = {
    items: [], // Initialize items array
    
    // Initialize cart from localStorage
    init() {
        this.loadFromStorage();
        this.updateUI();
        this.bindEvents();
        console.log('Cart initialized with', this.items.length, 'items');
    },

    // Add item to cart
    addItem(productId, quantity = 1) {
        const product = ProductManager.getProductById(productId);
        if (!product || !product.available) {
            utils.showToast('המוצר אינו זמין', 'error');
            return;
        }

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image
            });
        }

        this.saveToStorage();
        this.updateUI();
        this.updateProductCard(productId);
        
        utils.showToast(`${product.name} נוסף לעגלה`, 'success');
    },

    // Remove item from cart
    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const item = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            
            this.saveToStorage();
            this.updateUI();
            this.updateProductCard(productId);
            
            utils.showToast(`${item.name} הוסר מהעגלה`, 'info');
        }
    },

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }

        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveToStorage();
            this.updateUI();
            this.updateProductCard(productId);
        }
    },

    // Clear entire cart
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
        
        // Update all product cards
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            this.updateProductCard(productId);
        });
        
        utils.showToast('העגלה נוקתה', 'info');
    },

    // Get total price
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Get total items count
    getTotalCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },

    // Check if product is in cart
    hasProduct(productId) {
        return this.items.some(item => item.id === productId);
    },

    // Get product quantity in cart
    getProductQuantity(productId) {
        const item = this.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    },

    // Load cart from localStorage
    loadFromStorage() {
        try {
            const savedCart = localStorage.getItem('malabiPalaceCart');
            this.items = savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            this.items = [];
        }
    },

    // Save cart to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('malabiPalaceCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    },

    // Update cart UI
    updateUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    },

    // Update cart count in header
    updateCartCount() {
        const countElements = document.querySelectorAll('#cartCount, .cart-count');
        const count = this.getTotalCount();
        
        countElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'inline' : 'none';
        });
    },

    // Update cart items display
    updateCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>העגלה שלכם ריקה</p>
                    <a href="menu.html" class="btn btn-outline">עיינו בתפריט</a>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" 
                         onerror="this.src='assets/images/placeholder-malabi.svg'">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">${utils.formatPrice(item.price)}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-action="remove" data-id="${item.id}" title="הסר מהעגלה">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="cart-item-total">
                    ${utils.formatPrice(item.price * item.quantity)}
                </div>
            </div>
        `).join('');
    },

    // Update cart total
    updateCartTotal() {
        const totalElements = document.querySelectorAll('#cartTotal, .cart-total-amount');
        const total = this.getTotalPrice();
        
        totalElements.forEach(element => {
            element.textContent = total;
        });
    },

    // Update product card to show quantity controls
    updateProductCard(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (!productCard) return;

        const quantity = this.getProductQuantity(productId);
        const quantitySelector = productCard.querySelector('.quantity-selector');
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        const quantitySpan = productCard.querySelector('.quantity');

        if (quantitySelector && addToCartBtn && quantitySpan) {
            if (quantity > 0) {
                quantitySelector.style.display = 'flex';
                addToCartBtn.style.display = 'none';
                quantitySpan.textContent = quantity;
            } else {
                quantitySelector.style.display = 'none';
                addToCartBtn.style.display = 'block';
            }
        }
    },

    // Bind cart events
    bindEvents() {
        // Handle cart sidebar close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.ui.cartOpen) {
                if (typeof toggleCart === 'function') toggleCart();
            }
        });

        // Handle clicks within the cart container (Event Delegation)
        const cartItemsContainer = document.getElementById('cartItems');
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target || !target.dataset.action) return;

                const action = target.dataset.action;
                const productId = target.dataset.id;
                const currentQuantity = this.getProductQuantity(productId);

                switch (action) {
                    case 'increase':
                        this.updateQuantity(productId, currentQuantity + 1);
                        break;
                    case 'decrease':
                        this.updateQuantity(productId, currentQuantity - 1);
                        break;
                    case 'remove':
                        this.removeItem(productId);
                        break;
                }
            });
        }

        // Handle cart button clicks (if any other specific cart buttons exist)
        document.addEventListener('click', (e) => {
            const cartBtn = e.target.closest('.cart-btn');
            if (cartBtn) {
                e.preventDefault();
                if (typeof toggleCart === 'function') toggleCart();
            }
        });
    },

    // Get cart data for order
    getOrderData() {
        return {
            items: this.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            subtotal: this.getTotalPrice(),
            deliveryFee: CONFIG.DELIVERY_FEE,
            totalAmount: this.getTotalPrice() + CONFIG.DELIVERY_FEE,
            itemCount: this.getTotalCount()
        };
    },

    // Validate cart before checkout
    validateCart() {
        if (this.items.length === 0) {
            utils.showToast('העגלה שלכם ריקה. אנא הוסיפו מוצרים לפני המשך להזמנה.', 'error');
            return false;
        }

        // Check if all items are still available
        const unavailableItems = this.items.filter(cartItem => {
            const product = ProductManager.getProductById(cartItem.id);
            return !product || !product.available;
        });

        if (unavailableItems.length > 0) {
            // Remove unavailable items
            unavailableItems.forEach(item => {
                this.removeItem(item.id);
            });
            
            utils.showToast('חלק מהמוצרים בעגלה אינם זמינים יותר והוסרו מהעגלה.', 'warning');
            
            if (this.items.length === 0) {
                return false;
            }
        }

        return true;
    }
};