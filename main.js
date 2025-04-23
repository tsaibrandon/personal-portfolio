// navigation scroll 
const nav = document.querySelector("nav");
let lastScrollY = window.scrollY;
let scrollTimeout;

// Debounce function to limit how often the scroll handler runs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// scroll handling
const handleScroll = debounce(() => {
    if (lastScrollY < window.scrollY) {
        nav.classList.add("navHidden");
    } else {
        nav.classList.remove("navHidden");
    }
    lastScrollY = window.scrollY;
}, 100);

window.addEventListener("scroll", handleScroll);

// resume button animation
const resumeButton = document.querySelector('.resumeButton');
if (resumeButton) {
    resumeButton.addEventListener('animationend', () => {
        resumeButton.classList.remove('fallIntoPlace');
    });
}

// smooth scrolling for nav links
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

// img error handling
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('error', function() {
//         this.src = 'assets/placeholder.png';
//         this.alt = 'Image not available';
//     });
// });

// hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// close menu when link clicked
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// close menu when click outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    }
});