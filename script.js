// Hamburger
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });

        // FAQ accordion
        document.querySelectorAll('.faq-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const isOpen = item.classList.contains('open');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        });

        // Form submissions
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdo9CTj_6sgWj7FHusOfCatfMuWoqnc2xoRw0XgS33BtxfXdQK-KT8gMyJU3ebInHB/exec';

function handleFormSubmit(formId, successId) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        // Collect form data manually using IDs since inputs lack name attributes
        const data = { FormType: formId === 'expertForm' ? 'Freelancer' : 'User' };
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.id) {
                // Remove the 'e-' or 'u-' prefix to match backend column expectations
                const cleanKey = input.id.substring(2);
                data[cleanKey] = input.value;
            }
        });

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Better UX: Show success on the button itself and reset form
            btn.textContent = 'Success! We will be in touch.';
            btn.style.background = '#10b981'; // Green success color
            btn.style.borderColor = '#10b981';
            btn.style.color = '#ffffff';
            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
            
            // We no longer hide the form or show the separate success block
            // form.style.display = 'none';
            // success.style.display = 'block';
        } catch (error) {
            console.error('Error!', error.message);
            btn.textContent = 'Error. Try again.';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
        }
    });
}

        handleFormSubmit('expertForm', 'expertSuccess');
        handleFormSubmit('userForm', 'userSuccess');

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
