/**
 * Page transition manager
 * Implement elegant page switching animation
 */
class PageTransition {
    constructor() {
        // Create transition animation container
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';

        // Create left and right door elements
        this.doorLeft = document.createElement('div');
        this.doorRight = document.createElement('div');
        this.doorLeft.className = 'door-left';
        this.doorRight.className = 'door-right';

        // Create transition text element
        this.text = document.createElement('div');
        this.text.className = 'transition-text';

        // Assemble DOM structure
        this.overlay.appendChild(this.doorLeft);
        this.overlay.appendChild(this.doorRight);
        this.overlay.appendChild(this.text);
        document.body.appendChild(this.overlay);

        this.initializeListeners();
    }

    /**
     * Initialize event listeners
     */
    initializeListeners() {
        // Get all navigation links
        const links = document.querySelectorAll('.nav-links a');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default jump
                const targetId = link.getAttribute('href');
                const targetText = link.textContent;
                this.transitionTo(targetId, targetText);
            });
        });
    }

    /**
     * Execute transition animation
     * @param {string} targetId - Target section ID
     * @param {string} text - Transition text to display
     */
    async transitionTo(targetId, text) {
        // Display transition animation
        this.text.textContent = text;
        this.overlay.classList.add('active');

        // Wait for animation to complete
        await new Promise(resolve => setTimeout(resolve, 800));

        // Scroll to target position
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close transition animation
        await new Promise(resolve => setTimeout(resolve, 500));
        this.overlay.classList.remove('active');
    }
}

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    new PageTransition();
}); 