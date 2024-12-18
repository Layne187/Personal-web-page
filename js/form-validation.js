document.addEventListener('DOMContentLoaded', () => {
    // Get form and input elements
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    /**
     * Input validation function
     * @param {HTMLElement} input - Input element
     * @param {Function} validationFn - Validation rule function
     */
    function validateInput(input, validationFn) {
        input.addEventListener('input', () => {
            const isValid = validationFn(input.value);
            input.classList.toggle('invalid', !isValid);
        });
    }

    // Define validation rules
    const validators = {
        name: (value) => value.length >= 2,        // Name must be at least 2 characters
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),  // Standard email format
        message: (value) => value.length >= 1     // Message must be at least 1 characters
    };

    // Apply validation rules to form fields
    validateInput(nameInput, validators.name);
    validateInput(emailInput, validators.email);
    validateInput(messageInput, validators.message);

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validators.name(nameInput.value) &&
            validators.email(emailInput.value) &&
            validators.message(messageInput.value)) {
            // Add form submission logic here
            alert('Message sent!');
            form.reset();
        } else {
            alert('Please check if the form is filled correctly!');
        }
    });
}); 