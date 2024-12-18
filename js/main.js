// Skill data configuration: Modify skills and proficiency as needed
const skills = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 69 },
    { name: 'Node.js', level: 50 }
];

// Portfolio data configuration
const portfolioItems = [
    {
        title: 'Christmas Tree Frontend Project',
        description: 'A responsive Christmas tree developed using HTML5/CSS3/JavaScript',
        image: 'images/portfolio/project1.png',
        link: 'Project/christmas-tree/index.html',
        github: 'https://github.com/Layne187/Project/tree/master/christmas-tree'
    },
    {
        title: 'Memory Game Project',
        description: 'A memory game developed using HTML5/CSS3/JavaScript',
        image: 'images/portfolio/project2.png',
        link: 'Project/MemoryGame/Memory Game.html',
        github: 'https://github.com/Layne187/Project/tree/master/MemoryGame'
    },
    {
        title: 'Calculator Webpage',
        description: 'A modern calculator developed based on JavaScript, supporting multiple arithmetic functions.',
        image: 'images/portfolio/project3.jpg',
        link: 'Project/calculator/index.html',
        github: 'https://github.com/Layne187/Project/tree/master/calculator'
    }
];

/**
 * Render skill progress bars
 * - Clear existing content
 * - Dynamically create skill bars
 * - Add scroll animation listener
 */
function renderSkills() {
    const skillBars = document.querySelector('.skill-bars');
    skillBars.innerHTML = ''; // Clear existing content

    skills.forEach(skill => {
        const skillBar = `
            <div class="skill">
                <span class="skill-name">${skill.name}</span>
                <div class="progress-bar">
                    <div class="progress" style="--progress-width: ${skill.level}%"></div>
                </div>
            </div>
        `;
        skillBars.insertAdjacentHTML('beforeend', skillBar);
    });

    // Add animation effect when scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill').forEach(skill => {
        observer.observe(skill);
    });
}

/**
 * Render portfolio
 * - Dynamically create portfolio cards
 * - Add click event handling
 */
function renderPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return; // Ensure element exists

    portfolioGrid.innerHTML = '';

    portfolioItems.forEach(item => {
        const portfolioCard = `
            <div class="portfolio-item">
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <div class="portfolio-links">
                            <a href="${item.link}" target="_blank" class="btn">View Demo</a>
                            <a href="${item.github}" target="_blank" class="btn">Source Code</a>
                        </div>
                    </div>
                </div>
                <div class="portfolio-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        portfolioGrid.insertAdjacentHTML('beforeend', portfolioCard);
    });
}

/**
 * Initialize mobile navigation
 * - Handle hamburger menu click event
 * - Toggle navigation menu display state
 */
function initMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

/**
 * Initialize page scroll animation
 * - Listen for page scroll
 * - Add visibility class to elements
 */
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    });
}

// Start of Selection
// Initialize navigation bar active state handling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Set animation delay for navigation items
    navLinks.forEach((link, index) => {
        link.parentElement.style.setProperty('--nav-item-index', index);
    });

    // Scroll listener
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll to navigation item
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderPortfolio();  // Ensure renderPortfolio() is called
    initMobileNav();
    initScrollAnimation();
    initNavigation();
});

// Add image lazy loading feature
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.photo-item img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add photo filtering feature
function filterPhotos(tag) {
    const photos = document.querySelectorAll('.photo-item');
    photos.forEach(photo => {
        const tags = photo.querySelectorAll('.tag');
        const hasTag = Array.from(tags).some(t => t.textContent === tag);

        if (tag === 'all' || hasTag) {
            photo.style.display = 'block';
        } else {
            photo.style.display = 'none';
        }
    });
} 