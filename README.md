# מיסטר מלבי (Mister Malabi) 🍮

A professional, mobile-first e-commerce website for a traditional Middle Eastern dessert restaurant with WhatsApp integration.

## Project Overview

Mister Malabi is a static e-commerce website that allows customers to browse traditional malabi desserts and place orders through WhatsApp integration. The site features a warm, artisanal aesthetic with full RTL (Right-to-Left) support for Hebrew content.

## ✨ Features

### Core Functionality
- **Product Catalog**: Browse malabi products by category (Classic, Chocolate, Pistachio, Seasonal)
- **Shopping Cart**: Add/remove items with quantity management and localStorage persistence
- **Order System**: Complete order form with real-time Hebrew validation
- **WhatsApp Integration**: Seamless order submission via WhatsApp with fallback options
- **Mobile-First Design**: Fully responsive across all devices with 44px touch targets
- **RTL Support**: Native Hebrew language support with proper text alignment

### User Experience Features
- **Touch-Optimized Interface**: Designed for mobile-first interaction
- **Loading States**: Visual feedback during operations
- **Error Handling**: Graceful error messages and fallback options
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance Optimized**: Fast loading with lazy image loading

## 📁 Project Structure

```
malabi-palace/
├── index.html              # Homepage with hero section and featured products
├── menu.html               # Product catalog with filtering
├── order.html              # Checkout/Order form with validation
├── favicon.svg             # Site favicon
├── README.md               # Documentation
└── assets/
    ├── css/
    │   ├── main.css        # Core styles, variables, and base components
    │   ├── components.css  # Reusable UI components
    │   └── responsive.css  # Mobile responsiveness and breakpoints
    ├── js/
    │   ├── app.js          # Main application logic and state management
    │   ├── cart.js         # Shopping cart functionality with localStorage
    │   ├── menu.js         # Product display and filtering logic
    │   ├── order.js        # Order form handling and validation
    │   └── whatsapp.js     # WhatsApp integration with fallbacks
    ├── images/
    │   ├── products/       # Product images with fallback placeholder
    │   └── placeholder-malabi.svg  # Fallback image for missing products
    └── data/
        └── products.json   # Product database with Hebrew content
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (recommended for localStorage functionality)

### Quick Start
1. **Download/clone the project files**
2. **Start a local server**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Open browser** and navigate to `http://localhost:8000`

### Configuration
Update the WhatsApp business number in `assets/js/app.js`:
```javascript
const CONFIG = {
    WHATSAPP_BUSINESS_NUMBER: "972501234567", // Replace with actual number
    DELIVERY_FEE: 10,
    DELIVERY_AREAS: ["תל אביב", "רמת גן", "גבעתיים"]
};
```

## 🎨 Design System

### Color Palette
```css
--primary-gold: #d4a574;      /* Brand gold */
--primary-brown: #8b4513;     /* Text and headers */
--secondary-brown: #a0522d;   /* Secondary elements */
--cream: #f4e6d3;            /* Light backgrounds */
--warm-white: #faf8f5;       /* Main background */
--accent-orange: #e67e22;     /* Call-to-action elements */
```

### Typography
- **Font**: Heebo (Google Fonts) with Hebrew support
- **RTL Layout**: Complete right-to-left text alignment
- **Responsive Sizing**: Using clamp() for fluid typography

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## 🛒 Product Management

### Adding/Editing Products
Edit `assets/data/products.json`:
```json
{
  "id": "unique-product-id",
  "name": "שם המוצר בעברית",
  "nameEn": "English Product Name",
  "description": "תיאור מפורט של המוצר",
  "price": 18,
  "image": "assets/images/products/product-image.jpg",
  "category": "classic|chocolate|pistachio|seasonal",
  "ingredients": ["רכיב 1", "רכיב 2", "רכיב 3"],
  "allergens": ["חלב", "אגוזים"],
  "available": true,
  "featured": true
}
```

### Product Categories
- **classic** (קלאסי): Traditional malabi varieties
- **chocolate** (שוקולד): Chocolate-based malabi
- **pistachio** (פיסטוק): Pistachio-flavored varieties  
- **seasonal** (עונתי): Limited-time seasonal offerings

## 📱 WhatsApp Integration

### Message Format
The system generates structured WhatsApp messages including:
- Customer information (name, phone, address, delivery time)
- Complete order details with quantities and prices
- Order totals including delivery fee
- Order ID and timestamp
- Special requests

### Fallback Mechanisms
- **Clipboard Copy**: If WhatsApp doesn't open automatically
- **Alternative Contacts**: Direct phone and SMS links
- **Manual Display**: Formatted order details for manual sending

## 🔧 Technical Details

### State Management
- **Cart State**: Managed in localStorage for persistence
- **Product Data**: Loaded from JSON with error handling
- **Form State**: Real-time validation with Hebrew support

### Performance Optimizations
- **Lazy Loading**: Images load as they enter viewport
- **Critical CSS**: Inlined for faster rendering
- **Resource Hints**: Preloading for key assets
- **Minification**: CSS/JS compressed for production

### Browser Support
- **Primary**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- **Mobile**: iOS 14+, Android 10+

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: Minimum 4.5:1 contrast ratios
- **Focus Management**: Visible focus indicators

## 🚀 Deployment

### Static Hosting Options
- **Netlify**: Drag-and-drop with form handling
- **Vercel**: Git integration with edge functions
- **GitHub Pages**: Free hosting option
- **Cloudflare Pages**: Fast global delivery

### Pre-deployment Checklist
- [ ] Update WhatsApp business number
- [ ] Test order form validation
- [ ] Verify image loading and fallbacks
- [ ] Check responsive design on devices
- [ ] Test WhatsApp integration
- [ ] Validate HTML/CSS
- [ ] Run accessibility audit
- [ ] Test with screen readers

## 📞 Support & Maintenance

### Regular Maintenance
- Monitor product availability
- Update seasonal offerings
- Check WhatsApp integration
- Review analytics and user feedback
- Update contact information as needed

### Technical Support
For issues with the website:
1. Check browser console for JavaScript errors
2. Verify localStorage functionality
3. Test with different browsers/devices
4. Validate product data JSON format

---

**מלאבי פאלס - המתוקים המזרח תיכוניים הטובים ביותר** 🍮