// Main JavaScript File
console.log("🌄 Mountain Valley Resort website loaded successfully!");

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Highlight active navigation link
    highlightActiveNav();
    
    // Initialize gallery filters
    initGalleryFilters();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize contact form
    initContactForm();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add animation on scroll
    initScrollAnimations();
});

// Highlight active navigation link
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Gallery Filters
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length || !galleryItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    
    if (!lightbox || !galleryItems.length) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h3')?.textContent || 'Mountain Valley Resort';
            const description = this.querySelector('.gallery-overlay p')?.textContent || '';
            
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            lightbox.classList.add('show');
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form (optional)
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature-item, .service-card, .testimonial-card, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Booking counter (example interactive feature)
function updateBookingCounter() {
    const bookingElement = document.querySelector('.booking-counter');
    if (bookingElement) {
        // Simulate real-time booking count
        const randomBooking = Math.floor(Math.random() * 10) + 5;
        bookingElement.textContent = `${randomBooking} people are viewing this page`;
    }
}

// Update counter every 30 seconds
setInterval(updateBookingCounter, 30000);

// Weather widget (example)
function displayWeather() {
    const weatherElement = document.querySelector('.weather-widget');
    if (weatherElement) {
        // Simulate weather data
        const weather = {
            temp: Math.floor(Math.random() * 10) + 15, // 15-25°C
            condition: ['Sunny', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 3)]
        };
        weatherElement.innerHTML = `🌡️ ${weather.temp}°C | ${weather.condition}`;
    }
}

displayWeather();
setInterval(displayWeather, 3600000); // Update every hour

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add to favorites functionality (optional)
function initFavorites() {
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const message = this.classList.contains('active') ? 
                'Added to favorites!' : 'Removed from favorites';
            showNotification(message);
        });
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
