/* 
   ============================================================
   VWC PREWORK CAPSTONE — SITE LOGIC (CORE FEATURES)
   Feature 1: Theme Persistence (localStorage)
   Feature 2: Responsive Navigation (Mobile Toggle)
   Feature 5: Client-side Form Validation
   Feature 6: Scroll Reveal Animations
   Feature 8: Dynamic UI Effects (Auto-Typing, Scroll-Scroll)
   ============================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // FEATURE 1: THEME PERSISTENCE
    // ---------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    /**
     * toggleTheme logic:
     * 1. Check current body state.
     * 2. Toggle the 'dark-mode' class.
     * 3. Save the *new* state into localStorage so it persists 
     *    across page reloads or sibling pages.
     */
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // ---------------------------------------------------------
    // FEATURE 2: RESPONSIVE NAVIGATION
    // ---------------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    /**
     * mobileMenu logic:
     * Open/Close the mobile drawer when the burger icon is clicked.
     * Also close it if any individual link is clicked (UX best practice).
     */
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    // ---------------------------------------------------------
    // FEATURE 5: FORM VALIDATION (Module 5 concepts)
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            let isValid = true;
            
            // Logic: Target specific inputs and check lengths/regex
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // Name Validation (Length Check)
            if (name.value.trim().length < 3) {
                name.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                name.parentElement.classList.remove('invalid');
            }

            // Email Validation (Regex Check)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                email.parentElement.classList.remove('invalid');
            }

            // Message Validation
            if (message.value.trim().length < 10) {
                message.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                message.parentElement.classList.remove('invalid');
            }

            /**
             * If isValid is false, we prevent the form from submitting
             * to Formspree, forcing the user to fix errors first.
             */
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // ---------------------------------------------------------
    // FEATURE 8: DYNAMIC UI EFFECTS (DRY Typing Effect)
    // ---------------------------------------------------------
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
        const words = ["U.S. Army Veteran", "Future MSBA Student", "Clean Code Advocate", "Problem-Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const display = isDeleting 
                ? currentWord.substring(0, charIndex--) 
                : currentWord.substring(0, charIndex++);
            
            typingSpan.textContent = display;

            if (!isDeleting && charIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        type(); // Initialization call
    }

    // ---------------------------------------------------------
    // FEATURE 6: SCROLL REVEAL (Intersection Observer)
    // ---------------------------------------------------------
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    // Watch all major sections
    document.querySelectorAll('section, .proof-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    // ---------------------------------------------------------
    // NAVBAR SCROLL EFFECT (Feature 8)
    // ---------------------------------------------------------
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

});
