// Luxury Product Carousel - Premium Interactive Experience

class LuxuryCarousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = [...container.querySelectorAll('.carousel-slide')];
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.indicators = container.querySelector('.carousel-indicators');
        
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayDelay = 6000;
        this.autoplayTimer = null;
        
        // Responsive settings
        this.breakpoints = {
            desktop: { slides: 3, gap: 32 },
            tablet: { slides: 2, gap: 24 },
            mobile: { slides: 1, gap: 20 }
        };
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.bindEvents();
        this.updateCarousel();
        this.startAutoplay();
        this.handleResize();
        
        // Add intersection observer for performance
        this.observeVisibility();
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width >= 1024) return 'desktop';
        if (width >= 768) return 'tablet';
        return 'mobile';
    }
    
    getSlidesPerView() {
        return this.breakpoints[this.getCurrentBreakpoint()].slides;
    }
    
    getMaxIndex() {
        const slidesPerView = this.getSlidesPerView();
        return Math.max(0, this.slides.length - slidesPerView);
    }
    
    createIndicators() {
        if (!this.indicators) return;
        
        this.indicators.innerHTML = '';
        const maxIndex = this.getMaxIndex();
        
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `الذهاب إلى المجموعة ${i + 1}`);
            this.indicators.appendChild(dot);
        }
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Indicator dots
        this.indicators?.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-dot')) {
                const index = parseInt(e.target.dataset.index);
                this.goTo(index);
            }
        });
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Touch/swipe support
        this.bindTouchEvents();
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 150);
        });
    }
    
    bindTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoplay();
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            // Add visual feedback during drag
            const dragDistance = Math.min(Math.abs(diff) / 100, 0.2);
            if (diff > 50) {
                this.track.style.transform = `translateX(${this.getTranslateX() - dragDistance * 20}px)`;
            } else if (diff < -50) {
                this.track.style.transform = `translateX(${this.getTranslateX() + dragDistance * 20}px)`;
            }
        }, { passive: true });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            } else {
                // Snap back
                this.updateCarousel();
            }
            
            this.startAutoplay();
        });
    }
    
    handleResize() {
        this.createIndicators();
        this.updateCarousel(false);
        
        // Adjust current index if needed
        const maxIndex = this.getMaxIndex();
        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }
        this.updateCarousel();
    }
    
    getTranslateX() {
        const slidesPerView = this.getSlidesPerView();
        const gap = this.breakpoints[this.getCurrentBreakpoint()].gap;
        const slideWidth = this.container.offsetWidth / slidesPerView;
        
        return -(this.currentIndex * (slideWidth + gap));
    }
    
    updateCarousel(animate = true) {
        if (this.isTransitioning) return;
        
        const translateX = this.getTranslateX();
        
        if (animate) {
            this.track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            this.track.style.transition = 'none';
        }
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        this.indicators?.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update navigation buttons
        const maxIndex = this.getMaxIndex();
        this.prevBtn?.classList.toggle('disabled', this.currentIndex === 0);
        this.nextBtn?.classList.toggle('disabled', this.currentIndex >= maxIndex);
        
        // Trigger animation on visible slides
        this.animateVisibleSlides();
    }
    
    animateVisibleSlides() {
        const slidesPerView = this.getSlidesPerView();
        
        this.slides.forEach((slide, index) => {
            const isVisible = index >= this.currentIndex && 
                             index < this.currentIndex + slidesPerView;
            
            slide.classList.toggle('slide-visible', isVisible);
            
            if (isVisible) {
                // Add staggered animation delay
                const delay = (index - this.currentIndex) * 100;
                slide.style.animationDelay = `${delay}ms`;
                slide.classList.add('slide-enter');
            } else {
                slide.classList.remove('slide-enter');
            }
        });
    }
    
    next() {
        if (this.isTransitioning) return;
        
        const maxIndex = this.getMaxIndex();
        if (this.currentIndex >= maxIndex) {
            this.currentIndex = 0; // Loop back to start
        } else {
            this.currentIndex++;
        }
        
        this.transition();
    }
    
    prev() {
        if (this.isTransitioning) return;
        
        if (this.currentIndex <= 0) {
            this.currentIndex = this.getMaxIndex(); // Loop to end
        } else {
            this.currentIndex--;
        }
        
        this.transition();
    }
    
    goTo(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        const maxIndex = this.getMaxIndex();
        this.currentIndex = Math.max(0, Math.min(index, maxIndex));
        this.transition();
    }
    
    transition() {
        this.isTransitioning = true;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
        
        this.restartAutoplay();
    }
    
    startAutoplay() {
        this.pauseAutoplay();
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, this.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }
    
    restartAutoplay() {
        this.pauseAutoplay();
        setTimeout(() => this.startAutoplay(), 1000);
    }
    
    observeVisibility() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAutoplay();
                } else {
                    this.pauseAutoplay();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(this.container);
    }
    
    destroy() {
        this.pauseAutoplay();
        // Remove event listeners and clean up
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.product-carousel');
    if (carouselContainer) {
        window.luxuryCarousel = new LuxuryCarousel(carouselContainer);
    }
});

// Add luxury slide animations
const style = document.createElement('style');
style.textContent = `
    .slide-enter {
        animation: slideEnter 0.6s ease-out forwards;
    }
    
    @keyframes slideEnter {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .carousel-nav.disabled {
        opacity: 0.5;
        pointer-events: none;
    }
    
    .slide-visible .product-card {
        animation: cardReveal 0.8s ease-out forwards;
    }
    
    @keyframes cardReveal {
        from {
            opacity: 0;
            transform: translateY(20px) rotateX(10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
`;
document.head.appendChild(style);