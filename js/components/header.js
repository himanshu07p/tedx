document.addEventListener('DOMContentLoaded', function() {
    console.log("Header script loaded");
    initHeader();
});

document.addEventListener('headerLoaded', function() {
    console.log("Header loaded event triggered");
    initHeader();
});

function initHeader() {
    // Create the overlay element if it doesn't exist yet
    if (!document.querySelector('.nav-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }
    
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.querySelector('.nav-overlay');
    
    if (!navToggle || !mainNav || !overlay) {
        console.error("Required navigation elements not found");
        return;
    }
    
    // Toggle mobile navigation
    navToggle.addEventListener('click', function() {
        console.log("Nav toggle clicked");
        if (mainNav.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    });
    
    // Close nav when clicking overlay
    overlay.addEventListener('click', function() {
        closeNav();
    });
    
    // Close nav with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeNav();
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeNav();
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    function openNav() {
        console.log("Opening navigation");
        navToggle.classList.add('active');
        mainNav.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('nav-open');
    }
    
    function closeNav() {
        console.log("Closing navigation");
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
    
    // Setup active nav links based on sections in view
    setupActiveNavLinks();
}

function setupActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initial highlight
    highlightNavLink();
}