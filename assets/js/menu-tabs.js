// Modern Menu Tabs and Sticky Cart Functionality

class MenuManager {
    constructor() {
        this.cartItems = [];
        this.cartTotal = 0;
        this.init();
    }

    init() {
        this.bindTabEvents();
        this.bindCartEvents();
        this.updateStickyCart();
    }

    // Tab switching functionality
    bindTabEvents() {
        const tabs = document.querySelectorAll('.tab-btn');
        const productCards = document.querySelectorAll('[data-category]');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                
                // Update active tab
                tabs.forEach(t => {
                    t.classList.remove('bg-malabi-400', 'text-white');
                    t.classList.add('bg-white', 'text-zinc-700');
                });
                tab.classList.remove('bg-white', 'text-zinc-700');
                tab.classList.add('bg-malabi-400', 'text-white');

                // Filter products
                this.filterProducts(category, productCards);
            });
        });
    }

    filterProducts(category, cards) {
        cards.forEach((card, index) => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                card.style.display = 'block';
                // Stagger animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Cart functionality
    bindCartEvents() {
        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = btn.dataset.productId;
                this.addToCart(productId, btn);
            });
        });
    }

    addToCart(productId, button) {
        // Get product info from the card
        const card = button.closest('article');
        const productName = card.querySelector('h3').textContent;
        const productPrice = parseInt(card.querySelector('.font-semibold').textContent.replace('₪', ''));
        
        // Add to cart array
        this.cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });

        // Update totals
        this.cartTotal += productPrice;
        
        // Visual feedback
        this.showAddedFeedback(button);
        
        // Update displays
        this.updateCartDisplays();
        this.updateStickyCart();
    }

    showAddedFeedback(button) {
        const originalText = button.textContent;
        button.textContent = '✓ נוסף';
        button.classList.add('bg-green-500');
        button.classList.remove('bg-malabi-400');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-500');
            button.classList.add('bg-malabi-400');
        }, 1500);
    }

    updateCartDisplays() {
        // Update cart count in header
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.cartItems.length;
        }
    }

    updateStickyCart() {
        const stickyCartBar = document.getElementById('stickyCartBar');
        const stickyCartCount = document.getElementById('stickyCartCount');
        const stickyCartTotal = document.getElementById('stickyCartTotal');
        
        if (this.cartItems.length > 0) {
            stickyCartBar.classList.remove('hidden');
            if (stickyCartCount) {
                const itemText = this.cartItems.length === 1 ? 'פריט אחד' : `${this.cartItems.length} פריטים`;
                stickyCartCount.textContent = itemText;
            }
            if (stickyCartTotal) {
                stickyCartTotal.textContent = `₪${this.cartTotal}`;
            }
        } else {
            stickyCartBar.classList.add('hidden');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.menuManager = new MenuManager();
});

// Add smooth scroll behavior for internal links
document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});