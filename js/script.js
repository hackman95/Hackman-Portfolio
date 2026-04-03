document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme if any
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Mobile nav toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');
    });

    // Simple form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            const setError = (element) => {
                element.parentElement.classList.add('invalid');
                isValid = false;
            };

            // Clear previous errors
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));

            if (name.value.trim().length < 3) setError(name);
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) setError(email);

            if (message.value.trim().length < 10) setError(message);

            if (!isValid) e.preventDefault();
        });
    }

    // Dynamic typing animation in Hero
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
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        type();
    }

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('section, .proof-card, .project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
});
