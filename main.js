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