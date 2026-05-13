document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Form Submissions
    const forms = document.querySelectorAll('form');
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdo9CTj_6sgWj7FHusOfCatfMuWoqnc2xoRw0XgS33BtxfXdQK-KT8gMyJU3ebInHB/exec';

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalText = button.innerText;
            
            // Collect Form Data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.FormType = form.id === 'freelancer-form' ? 'Freelancer' : 'User';

            button.innerText = 'Sending...';
            button.disabled = true;

            // Send to Google Sheets via Apps Script
            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                button.innerText = 'Success! Check your email';
                button.style.background = '#10b981';
                form.reset();
                
                setTimeout(() => {
                    button.innerText = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                button.innerText = 'Error. Try again.';
                button.disabled = false;
                
                setTimeout(() => {
                    button.innerText = originalText;
                }, 3000);
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });

    function updateThemeIcon(isLight) {
        const iconName = isLight ? 'sun' : 'moon';
        const iconElement = themeToggle.querySelector('i, svg');
        
        if (iconElement) {
            iconElement.setAttribute('data-lucide', iconName);
            // Re-initialize only the theme toggle icon
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    }
});
