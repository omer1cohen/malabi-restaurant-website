// WhatsApp Integration Module
const WhatsAppManager = {
    // Generate WhatsApp message from order data
    generateMessage(orderData) {
        const message = `
🍮 הזמנה חדשה - מלאבי פאלס

👤 פרטי לקוח:
שם: ${orderData.customer.name}
טלפון: ${orderData.customer.phone}
כתובת: ${orderData.customer.address}
שעת הגעה מבוקשת: ${orderData.deliveryTime}

🛒 פירוט הזמנה:
${orderData.items.map(item => 
    `• ${item.name} x${item.quantity} = ${utils.formatPrice(item.total)}`
).join('\n')}

💰 סיכום תשלום:
סכום ביניים: ${utils.formatPrice(orderData.subtotal)}
דמי משלוח: ${utils.formatPrice(orderData.deliveryFee)}
סה"כ לתשלום: ${utils.formatPrice(orderData.totalAmount)}

📝 בקשות מיוחדות: ${orderData.specialRequests || 'אין'}

📅 תאריך הזמנה: ${orderData.orderDate}
⏰ מזהה הזמנה: #${orderData.orderId}

תודה שבחרתם במלאבי פאלס! 🌟
        `.trim();
        
        return message;
    },

    // Create WhatsApp URL with message
    createWhatsAppUrl(message) {
        const phoneNumber = CONFIG.WHATSAPP_BUSINESS_NUMBER;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    },

    // Send order to WhatsApp
    async sendOrder(orderData) {
        try {
            // Generate message
            const message = this.generateMessage(orderData);
            
            // Create WhatsApp URL
            const whatsappUrl = this.createWhatsAppUrl(message);
            
            // Log order for analytics (optional)
            this.logOrder(orderData);
            
            // Open WhatsApp in new tab/window
            const whatsappWindow = window.open(whatsappUrl, '_blank');
            
            // Check if popup was blocked
            if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed == 'undefined') {
                throw new Error('Popup blocked');
            }
            
            // Wait a moment to ensure WhatsApp opens
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
                success: true,
                orderId: orderData.orderId,
                message: 'ההזמנה נשלחה בהצלחה ל-WhatsApp'
            };
            
        } catch (error) {
            console.error('Error sending WhatsApp order:', error);
            
            // Fallback: try to copy message to clipboard
            if (navigator.clipboard) {
                try {
                    const message = this.generateMessage(orderData);
                    await navigator.clipboard.writeText(message);
                    
                    return {
                        success: true,
                        fallback: true,
                        orderId: orderData.orderId,
                        message: 'הודעת ההזמנה הועתקה ללוח. אנא שלחו אותה ב-WhatsApp למספר: ' + this.formatPhoneForDisplay(CONFIG.WHATSAPP_BUSINESS_NUMBER)
                    };
                } catch (clipboardError) {
                    console.error('Clipboard fallback failed:', clipboardError);
                }
            }
            
            // Final fallback: show message and phone number
            return {
                success: false,
                error: true,
                orderId: orderData.orderId,
                message: 'לא ניתן לפתוח את WhatsApp. אנא צרו קשר ישירות למספר: ' + this.formatPhoneForDisplay(CONFIG.WHATSAPP_BUSINESS_NUMBER),
                orderDetails: this.generateMessage(orderData)
            };
        }
    },

    // Format phone number for display
    formatPhoneForDisplay(phoneNumber) {
        // Convert +972501234567 to 050-123-4567
        if (phoneNumber.startsWith('972')) {
            const localNumber = '0' + phoneNumber.substring(3);
            return localNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        return phoneNumber;
    },

    // Log order for analytics (optional)
    logOrder(orderData) {
        try {
            // Store order in localStorage for analytics
            const orders = JSON.parse(localStorage.getItem('malabiPalaceOrders') || '[]');
            
            const orderRecord = {
                id: orderData.orderId,
                timestamp: Date.now(),
                customerName: orderData.customer.name,
                totalAmount: orderData.totalAmount,
                itemCount: orderData.items.length,
                deliveryTime: orderData.deliveryTime
            };
            
            orders.push(orderRecord);
            
            // Keep only last 50 orders
            if (orders.length > 50) {
                orders.splice(0, orders.length - 50);
            }
            
            localStorage.setItem('malabiPalaceOrders', JSON.stringify(orders));
            
        } catch (error) {
            console.error('Error logging order:', error);
        }
    },

    // Check if WhatsApp is available
    isWhatsAppAvailable() {
        const userAgent = navigator.userAgent;
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        // WhatsApp is more reliable on mobile devices
        return {
            available: true,
            mobile: isMobile,
            recommendation: isMobile ? 'app' : 'web'
        };
    },

    // Alternative contact methods if WhatsApp fails
    getAlternativeContact() {
        const phoneForDisplay = this.formatPhoneForDisplay(CONFIG.WHATSAPP_BUSINESS_NUMBER);
        
        return {
            phone: phoneForDisplay,
            methods: [
                {
                    type: 'call',
                    label: 'התקשרו אלינו',
                    action: `tel:${phoneForDisplay}`,
                    icon: '📞'
                },
                {
                    type: 'sms',
                    label: 'שלחו SMS',
                    action: `sms:${phoneForDisplay}`,
                    icon: '💬'
                }
            ]
        };
    }
};

// Global function to send order to WhatsApp
async function sendOrderToWhatsApp(orderData) {
    try {
        // Show loading state
        utils.showToast('שולח הזמנה ל-WhatsApp...', 'info');
        
        // Send order
        const result = await WhatsAppManager.sendOrder(orderData);
        
        if (result.success) {
            if (result.fallback) {
                utils.showToast(result.message, 'warning');
                showFallbackModal(result.orderDetails);
            } else {
                utils.showToast(result.message, 'success');
            }
            return result;
        } else {
            throw new Error(result.message);
        }
        
    } catch (error) {
        console.error('WhatsApp integration error:', error);
        utils.showToast('שגיאה בשליחת ההזמנה ל-WhatsApp', 'error');
        
        // Show alternative contact methods
        showAlternativeContactModal(orderData);
        throw error;
    }
}

// Show fallback modal with order details
function showFallbackModal(orderDetails) {
    const modal = document.createElement('div');
    modal.className = 'modal fallback-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>העתיקו את פרטי ההזמנה</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>הודעת ההזמנה הועתקה ללוח. אנא שלחו אותה ב-WhatsApp:</p>
                <textarea readonly class="order-details-text">${orderDetails}</textarea>
                <div class="contact-actions">
                    <a href="https://wa.me/${CONFIG.WHATSAPP_BUSINESS_NUMBER}" target="_blank" class="btn btn-primary">
                        פתח WhatsApp
                    </a>
                    <button class="btn btn-outline" onclick="copyOrderDetails(this)">העתק שוב</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('show');
}

// Show alternative contact modal
function showAlternativeContactModal(orderData) {
    const alternatives = WhatsAppManager.getAlternativeContact();
    const orderDetails = WhatsAppManager.generateMessage(orderData);
    
    const modal = document.createElement('div');
    modal.className = 'modal alternative-contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>דרכי התקשרות חלופיות</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>לא ניתן לפתוח את WhatsApp. אנא צרו קשר באמצעות:</p>
                
                <div class="contact-methods">
                    ${alternatives.methods.map(method => `
                        <a href="${method.action}" class="contact-method">
                            <span class="contact-icon">${method.icon}</span>
                            <span class="contact-label">${method.label}</span>
                            <span class="contact-number">${alternatives.phone}</span>
                        </a>
                    `).join('')}
                </div>
                
                <div class="order-details-section">
                    <h4>פרטי ההזמנה:</h4>
                    <textarea readonly class="order-details-text">${orderDetails}</textarea>
                    <button class="btn btn-outline" onclick="copyOrderDetails(this)">העתק פרטי הזמנה</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('show');
}

// Copy order details to clipboard
async function copyOrderDetails(button) {
    const textarea = button.closest('.modal').querySelector('.order-details-text');
    
    try {
        await navigator.clipboard.writeText(textarea.value);
        
        const originalText = button.textContent;
        button.textContent = 'הועתק!';
        button.classList.add('success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('success');
        }, 2000);
        
    } catch (error) {
        console.error('Copy failed:', error);
        
        // Fallback: select text
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            utils.showToast('פרטי ההזמנה הועתקו', 'success');
        } catch (fallbackError) {
            utils.showToast('אנא העתיקו ידנית את הטקסט', 'warning');
        }
    }
}

// Initialize WhatsApp integration
document.addEventListener('DOMContentLoaded', () => {
    // Check WhatsApp availability and show appropriate UI
    const whatsappStatus = WhatsAppManager.isWhatsAppAvailable();
    console.log('WhatsApp Status:', whatsappStatus);
    
    // Add appropriate classes to body for CSS targeting
    if (whatsappStatus.mobile) {
        document.body.classList.add('mobile-device');
    }
    
    if (whatsappStatus.recommendation === 'web') {
        document.body.classList.add('whatsapp-web-recommended');
    }
});