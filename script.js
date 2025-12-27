// Language Switching
const langButtons = document.querySelectorAll('.lang-btn');
const elementsWithData = document.querySelectorAll('[data-fa], [data-ar]');
let currentLang = 'fa';

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        
        // Update active button
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update document direction and language
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            currentLang = 'ar';
        } else {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'fa');
            currentLang = 'fa';
        }
        
        // Update all elements with language data
        elementsWithData.forEach(element => {
            const faText = element.getAttribute('data-fa');
            const arText = element.getAttribute('data-ar');
            
            if (lang === 'ar' && arText) {
                element.textContent = arText;
            } else if (lang === 'fa' && faText) {
                element.textContent = faText;
            }
        });
        
        // Save preference
        localStorage.setItem('preferredLang', lang);
    });
});

// Load saved language preference
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== 'fa') {
        const btn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
        if (btn) btn.click();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .contact-card, .gallery-img');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery image click (can be extended to open lightbox)
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', function() {
        // Optional: Add lightbox functionality here
        console.log('Gallery image clicked');
    });
});

