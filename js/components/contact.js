// This file contains JavaScript for the contact section, managing form submissions or interactions.

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (replace YOUR_USER_ID with your actual EmailJS user ID)
    emailjs.init("YOUR_USER_ID");
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get the submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Prepare template parameters from form data
            const templateParams = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value
            };
            
            // Send email using EmailJS
            // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual values
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response.status, response.text);
                    showMessage('Thank you! Your message has been sent.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Failed to send email:', error);
                    showMessage('Failed to send message. Please try again later.', 'error');
                })
                .finally(function() {
                    // Re-enable button and restore original text
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }
    
    // Helper function to show status messages
    function showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Add styling to the message
        if (type === 'success') {
            messageEl.style.color = '#4CAF50';
        } else {
            messageEl.style.color = '#F44336';
        }
        messageEl.style.padding = '15px';
        messageEl.style.marginTop = '20px';
        messageEl.style.fontWeight = '500';
        
        // Insert the message after the form
        const formParent = contactForm.parentNode;
        formParent.insertBefore(messageEl, contactForm.nextSibling);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
});