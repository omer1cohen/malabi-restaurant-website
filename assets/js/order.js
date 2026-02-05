// Order Page Functionality
function initOrderPage() {
    console.log('Initializing Order Page...');
    
    // Check if cart has items
    if (!cart.validateCart()) {
        redirectToMenu();
        return;
    }
    
    loadOrderSummary();
    bindOrderForm();
    initFormValidation();
}

// Redirect to menu if cart is empty
function redirectToMenu() {
    utils.showToast('העגלה ריקה. מעביר לתפריט...', 'info');
    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 2000);
}

// Load order summary
function loadOrderSummary() {
    const orderData = cart.getOrderData();
    
    // Update summary items
    const summaryItemsContainer = document.getElementById('summaryItems');
    if (summaryItemsContainer) {
        summaryItemsContainer.innerHTML = orderData.items.map(item => `
            <div class="summary-item">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">x${item.quantity}</span>
                </div>
                <div class="item-total">${utils.formatPrice(item.total)}</div>
            </div>
        `).join('');
    }
    
    // Update totals
    const subtotalElement = document.getElementById('subtotal');
    const deliveryFeeElement = document.getElementById('deliveryFee');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (subtotalElement) subtotalElement.textContent = orderData.subtotal;
    if (deliveryFeeElement) deliveryFeeElement.textContent = orderData.deliveryFee;
    if (totalAmountElement) totalAmountElement.textContent = orderData.totalAmount;
}

// Bind order form events
function bindOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
        
        // Real-time validation
        const inputs = orderForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
        
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
    }
    
    // Success modal close button
    const closeSuccessBtn = document.querySelector('.close-success-modal');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', closeSuccessModal);
    }
}

// Initialize form validation rules
function initFormValidation() {
    window.orderValidation = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[\u0590-\u05FF\s\-']+$/,
            message: 'שם מלא בעברית (לפחות 2 תווים)'
        },
        phone: {
            required: true,
            pattern: /^05[0-9]-?[0-9]{7}$/,
            message: 'מספר טלפון ישראלי תקין (05X-XXXXXXX)'
        },
        address: {
            required: true,
            minLength: 10,
            message: 'כתובת מלאה (לפחות 10 תווים)'
        },
        deliveryTime: {
            required: true,
            validOptions: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
            message: 'בחר שעת הגעה'
        }
    };
}

// Validate individual field
function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const validation = window.orderValidation[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (!validation || !errorElement) return true;
    
    // Clear previous errors
    field.classList.remove('error');
    errorElement.textContent = '';
    
    // Required field check
    if (validation.required && !fieldValue) {
        showFieldError(field, errorElement, 'שדה חובה');
        return false;
    }
    
    if (fieldValue) {
        // Min length check
        if (validation.minLength && fieldValue.length < validation.minLength) {
            showFieldError(field, errorElement, validation.message);
            return false;
        }
        
        // Pattern check
        if (validation.pattern && !validation.pattern.test(fieldValue)) {
            showFieldError(field, errorElement, validation.message);
            return false;
        }
        
        // Valid options check (for select fields)
        if (validation.validOptions && !validation.validOptions.includes(fieldValue)) {
            showFieldError(field, errorElement, validation.message);
            return false;
        }
    }
    
    // Field-specific validations
    if (fieldName === 'phone' && fieldValue) {
        if (!utils.validateIsraeliPhone(fieldValue)) {
            showFieldError(field, errorElement, validation.message);
            return false;
        }
    }
    
    if (fieldName === 'fullName' && fieldValue) {
        if (!utils.validateHebrewName(fieldValue)) {
            showFieldError(field, errorElement, validation.message);
            return false;
        }
    }
    
    // Show success state
    field.classList.add('valid');
    return true;
}

// Show field error
function showFieldError(field, errorElement, message) {
    field.classList.add('error');
    field.classList.remove('valid');
    errorElement.textContent = message;
}

// Clear field error
function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

// Format phone number as user types
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('05') && value.length >= 3) {
        if (value.length <= 10) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        }
    }
    
    e.target.value = value;
}

// Handle order form submission
async function handleOrderSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    const isValid = validateOrderForm(form);
    if (!isValid) {
        utils.showToast('יש לתקן את השגיאות בטופס', 'error');
        return;
    }
    
    // Final cart validation
    if (!cart.validateCart()) {
        redirectToMenu();
        return;
    }
    
    try {
        utils.showLoading(submitButton);
        
        // Prepare order data
        const orderData = prepareOrderData(formData);
        
        // Send order via WhatsApp
        await sendOrderToWhatsApp(orderData);
        
        // Show success modal
        showSuccessModal();
        
        // Clear cart after successful order
        setTimeout(() => {
            cart.clear();
        }, 1000);
        
    } catch (error) {
        console.error('Error submitting order:', error);
        utils.showToast('שגיאה בשליחת ההזמנה. אנא נסו שוב.', 'error');
    } finally {
        utils.hideLoading(submitButton);
    }
}

// Validate entire order form
function validateOrderForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Check terms acceptance
    const termsCheckbox = document.getElementById('termsAccepted');
    const termsError = document.getElementById('termsError');
    
    if (termsCheckbox && !termsCheckbox.checked) {
        if (termsError) {
            termsError.textContent = 'יש לאשר את תנאי השירות';
        }
        isValid = false;
    } else if (termsError) {
        termsError.textContent = '';
    }
    
    return isValid;
}

// Prepare order data for WhatsApp
function prepareOrderData(formData) {
    const cartData = cart.getOrderData();
    
    return {
        orderId: utils.generateOrderId(),
        customer: {
            name: formData.get('fullName'),
            phone: formData.get('phone'),
            address: formData.get('address')
        },
        deliveryTime: formData.get('deliveryTime'),
        specialRequests: formData.get('specialRequests') || '',
        items: cartData.items,
        subtotal: cartData.subtotal,
        deliveryFee: cartData.deliveryFee,
        totalAmount: cartData.totalAmount,
        orderDate: utils.formatDate()
    };
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

// Close success modal and redirect
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Handle page refresh warning
window.addEventListener('beforeunload', (e) => {
    const cartData = cart.getOrderData();
    if (cartData.items.length > 0) {
        e.preventDefault();
        e.returnValue = 'יש לכם פריטים בעגלה. האם אתם בטוחים שברצונכם לעזוב?';
    }
});

// Auto-save form data to prevent loss
function initFormAutoSave() {
    const form = document.getElementById('orderForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Load saved data
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(`orderForm_${input.name}`);
        if (savedValue && input.type !== 'checkbox') {
            input.value = savedValue;
        } else if (savedValue && input.type === 'checkbox') {
            input.checked = savedValue === 'true';
        }
    });
    
    // Save data on input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.type === 'checkbox') {
                localStorage.setItem(`orderForm_${input.name}`, input.checked.toString());
            } else {
                localStorage.setItem(`orderForm_${input.name}`, input.value);
            }
        });
    });
}

// Clear saved form data
function clearFormAutoSave() {
    const form = document.getElementById('orderForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        localStorage.removeItem(`orderForm_${input.name}`);
    });
}

// Initialize auto-save when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('order.html')) {
        initFormAutoSave();
    }
});