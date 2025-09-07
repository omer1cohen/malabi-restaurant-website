# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Malabi Palace is a static e-commerce website for a Middle Eastern dessert restaurant built with vanilla HTML, CSS, and JavaScript. The site features RTL Hebrew support, WhatsApp integration for orders, and a mobile-first responsive design using Tailwind CSS.

## Development Commands

### Local Development Server
```bash
# Primary development server (recommended - with no-cache headers)
python server.py

# Vite development server (with hot reload)
npm run dev

# Alternative servers (if Python unavailable)
python -m http.server 8000
npx serve .
php -S localhost:8000
```

Access at: http://localhost:8000 (Python server) or http://localhost:3000 (Vite)

### Build Process
```bash
# Build for production (creates dist/ directory)
npm run build

# Build and preview production build
npm run build && npm run preview

# Build Tailwind CSS only
npm run build:css
```

**IMPORTANT**: Always run `npm run build` after making changes and before committing to ensure there are no build errors. Only commit and push if build succeeds without errors.

## Architecture Overview

### Core Application Structure
- **Static HTML Pages**: `index.html` (homepage), `menu.html` (catalog), `order.html` (checkout)
- **Client-Side State**: Managed via vanilla JavaScript with localStorage persistence
- **Data Layer**: JSON-based product catalog (`assets/data/products.json`)
- **Styling**: Tailwind CSS framework with custom Hebrew/RTL configuration

### JavaScript Architecture
```
assets/js/
├── app.js          # Global state, configuration, utilities
├── cart.js         # Shopping cart management and localStorage
├── menu.js         # Product display and filtering
├── menu-tabs.js    # Tab navigation and filtering for menu page
├── order.js        # Order form validation and processing
└── whatsapp.js     # WhatsApp integration and message formatting
```

### Key Architectural Patterns
- **Global State**: `AppState` object in `app.js` manages cart, products, and UI state
- **Event-Driven**: DOM manipulation and state updates via event listeners
- **Modular**: Each JS file handles specific domain functionality
- **Data Persistence**: Cart state persisted to localStorage for session continuity

### Configuration Management
Critical settings in `assets/js/app.js`:
```javascript
const CONFIG = {
    WHATSAPP_BUSINESS_NUMBER: "972501234567", // Update for production
    SITE_URL: "https://malabipalace.co.il",   // Site URL for sharing
    DELIVERY_FEE: 10,
    DELIVERY_AREAS: ["תל אביב", "רמת גן", "גבעתיים"]
};
```

### Build Configuration
- **Vite**: Modern build tool with hot reload (vite.config.js)
- **Tailwind CSS**: Utility-first CSS framework (tailwind.config.js)
- **PostCSS**: CSS processing pipeline (postcss.config.js)

## Product Management

### Adding/Editing Products
Products are defined in `assets/data/products.json` with this structure:
```json
{
  "id": "unique-product-id",
  "name": "שם המוצר בעברית",
  "nameEn": "English Product Name", 
  "price": 18,
  "image": "assets/images/products/product-image.jpg",
  "category": "classic|chocolate|pistachio|seasonal",
  "available": true,
  "featured": true
}
```

### Categories
- **classic**: Traditional malabi varieties
- **chocolate**: Chocolate-based malabi  
- **pistachio**: Pistachio-flavored varieties
- **seasonal**: Limited-time seasonal offerings

## RTL/Hebrew Support

### Language Configuration
- HTML `lang="he" dir="rtl"` for proper Hebrew rendering
- Tailwind configured for RTL with Hebrew fonts (Heebo)
- Custom CSS handles Arabic numerals and text alignment

### Text Direction
- Content flows right-to-left naturally
- Form inputs and buttons properly aligned for RTL
- Responsive design maintains RTL flow across breakpoints

## WhatsApp Integration

### Order Flow
1. Customer fills order form (`order.html`)
2. JavaScript formats structured WhatsApp message
3. WhatsApp deep-link opens with pre-filled message
4. Fallback: clipboard copy + manual contact options

### Message Format
Includes customer details, itemized order, totals, delivery info, and order ID for business tracking.

## Key Implementation Notes

### State Management
- Cart persisted to localStorage as `malabiCart`
- Product data loaded from JSON with error handling
- UI state (cart open/closed, loading) managed in memory

### Performance Considerations
- Images lazy-loaded as they enter viewport
- Tailwind CSS loaded via CDN (consider self-hosting for production)
- Critical styles inlined in HTML head

### Mobile-First Design
- Touch-optimized with 44px minimum touch targets
- Responsive breakpoints: 320px, 768px, 1024px, 1440px+
- Gesture-friendly cart and navigation interfaces

### Error Handling
- Graceful fallbacks for failed WhatsApp opens
- Placeholder images for missing product photos
- Form validation with Hebrew error messages

## Common Development Tasks

### Testing Order Flow
1. Add products to cart via `menu.html`
2. Proceed to `order.html` and fill form
3. Verify WhatsApp message generation and formatting
4. Test fallback mechanisms (clipboard, manual contact)

### Updating Product Images
- Add images to `assets/images/products/`
- Update `image` path in `products.json`
- Fallback: `placeholder-malabi.svg` for missing images

### Modifying Delivery Areas
Update `DELIVERY_AREAS` array in `assets/js/app.js` for service area changes.

## CSS Architecture

### Styling Structure
```
assets/css/
├── main.css        # Core styles, variables, base components
├── components.css  # Reusable UI components  
├── responsive.css  # Mobile responsiveness and breakpoints
├── tailwind.css    # Tailwind CSS imports
└── dist.css        # Generated Tailwind output (build artifact)
```

### Custom Tailwind Theme
The project extends Tailwind CSS with:
- **Custom Colors**: Malabi-themed color palette including cream, rose, pistachio, gold
- **Hebrew Fonts**: Heebo font family for RTL Hebrew support
- **Custom Animations**: Luxury animations (fade-in, slide-up, shimmer effects)
- **Box Shadows**: Luxury shadow effects for premium look

## Development Workflow

### Making Changes
1. Start development server: `python server.py` or `npm run dev`
2. Make your changes to HTML/CSS/JS files
3. Test functionality thoroughly, especially:
   - Cart operations and localStorage persistence
   - WhatsApp integration and fallbacks
   - Hebrew form validation
   - Responsive design on mobile devices
4. **CRITICAL**: Run `npm run build` to ensure no build errors
5. Only if build succeeds: `git add .`, `git commit`, `git push`

### Testing Checklist
- [ ] Products load and display correctly
- [ ] Cart add/remove operations work
- [ ] Cart persists between page reloads
- [ ] Order form validates Hebrew inputs properly
- [ ] WhatsApp integration opens correctly
- [ ] Site works on mobile devices
- [ ] Images load with proper fallbacks