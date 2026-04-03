/* 
   ============================================================
   VWC PREWORK CAPSTONE — CORE SITE LOGIC
   Feature 1: Theme Persistence (localStorage)
   Feature 2: Responsive Navigation (Mobile Toggle)
   Feature 5: Client-side Form Validation
   Feature 6: Scroll Reveal Animations
   Feature 8: Dynamic UI Effects (Typing & Scroll Bar)
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
     * 3. Save the preference to localStorage (Module 5 persistence).
     */
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // ---------------------------------------------------------
    // FEATURE 2: RESPONSIVE NAVIGATION
    // ---------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    /**
     * mobileMenu logic:
     * Open/Close the mobile drawer when the burger icon is clicked.
     * Also close it if any individual link is clicked (UX best practice).
     */
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');
    });

    // ---------------------------------------------------------
    // FEATURE 5: FORM VALIDATION
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            let isValid = true;
            
            // Logic: Target specific inputs and check lengths/regex
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            /**
             * Function to show error state on parent group
             */
            const setError = (element, message) => {
                element.parentElement.classList.add('invalid');
                isValid = false;
            };

            // Reset all errors
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));

            // Name Validation
            if (name.value.trim().length < 3) setError(name);

            // Email Validation (Regex Check)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) setError(email);

            // Message Validation
            if (message.value.trim().length < 10) setError(message);

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
    // FEATURE 8: TYPING EFFECT (Personal Branding)
    // ---------------------------------------------------------
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
        const words = ["Arabic Linguist", "High Honor Grad", "MBA Graduate", "MSBA Candidate", "Civil Affairs Specialist", "Software Engineer"];
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
                setTimeout(type, 2000); // Wait at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        type(); // Initialization
    }

    // ---------------------------------------------------------
    // FEATURE 6: SCROLL REVEAL (Intersection Observer)
    // ---------------------------------------------------------
    const revealElements = document.querySelectorAll('section, .proof-card, .project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
});
