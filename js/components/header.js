const header = (() => {
    const init = () => {
        setupNavToggle();
        setupScrollEffects();
        setupActiveNavLinks();
        setupSmoothScroll();
    };

    const setupNavToggle = () => {
        const navToggle = document.getElementById('nav-toggle');
        const mainNav = document.getElementById('main-nav');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
        }
    };

    const setupScrollEffects = () => {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    const setupActiveNavLinks = () => {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Initial highlight based on current URL
        highlightActiveLink(currentPath, currentHash, navLinks);
        
        // If we're on the home page, also handle scroll based active states
        if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
            handleScrollBasedHighlighting(navLinks);
        }
        
        // Listen for hash changes (important for direct links to sections)
        window.addEventListener('hashchange', () => {
            const updatedHash = window.location.hash;
            highlightActiveLink(currentPath, updatedHash, navLinks);
        });
    };
    
    const highlightActiveLink = (currentPath, currentHash, navLinks) => {
        navLinks.forEach(link => {
            // Remove active class from all links first
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            
            // Case 1: Link points to current page (without hash)
            if (!linkHref.includes('#') && currentPath.includes(linkHref)) {
                link.classList.add('active');
                return;
            }
            
            // Case 2: We're on the home page
            if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                // Case 2a: Link points to home page with no hash
                if (linkHref === '../index.html' && !currentHash) {
                    link.classList.add('active');
                    return;
                }
                
                // Case 2b: Link points to a section on home page and hash matches
                if (linkHref.includes('#') && linkHref.substring(linkHref.indexOf('#')) === currentHash) {
                    link.classList.add('active');
                    return;
                }
            }
        });
    };
    
    const handleScrollBasedHighlighting = (navLinks) => {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            // Find the section currently in view
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                // If we've scrolled to this section (with some offset for better UX)
                if (window.scrollY >= (sectionTop - 200)) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Update active nav link based on current section
            if (currentSection) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    const linkHref = link.getAttribute('href');
                    if (linkHref && linkHref.includes(`#${currentSection}`)) {
                        link.classList.add('active');
                    }
                });
            } else if (window.scrollY < 100) {
                // Near the top of the page, highlight the Home link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '../index.html') {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const setupSmoothScroll = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        const navToggle = document.getElementById('nav-toggle');
        const mainNav = document.getElementById('main-nav');

        navLinks.forEach(link => {
            link.addEventListener('click', event => {
                // Close mobile menu when clicking a link
                if (window.innerWidth <= 992) {
                    navToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
                
                // Only do smooth scroll for same-page anchors
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    event.preventDefault();
                    const targetId = href;
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', header.init);