// ============================================
// MODERN PORTFOLIO V2 - MAIN JAVASCRIPT
// ============================================

// ============================================
// GLOBAL STATE
// ============================================
const state = {
    currentTestimonial: 0,
    isScrolling: false,
    cursorX: 0,
    cursorY: 0
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    loader: document.querySelector('.loader-wrapper'),
    navbar: document.querySelector('.navbar'),
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    cursor: document.querySelector('.cursor'),
    cursorFollower: document.querySelector('.cursor-follower'),
    statNumbers: document.querySelectorAll('.stat-number'),
    faqItems: document.querySelectorAll('.faq-item'),
    contactForm: document.getElementById('contactForm'),
    testimonialsSlider: document.getElementById('testimonialsSlider'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn')
};

// ============================================
// LOADING SCREEN
// ============================================
function hideLoader() {
    setTimeout(() => {
        elements.loader.classList.add('hidden');
    }, 1500);
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    elements.hamburger?.addEventListener('click', () => {
        elements.hamburger.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
        document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu
                elements.hamburger?.classList.remove('active');
                elements.navMenu?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCursor() {
    // Don't initialize cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (!elements.cursor || !elements.cursorFollower) return;

    document.addEventListener('mousemove', (e) => {
        state.cursorX = e.clientX;
        state.cursorY = e.clientY;
        
        elements.cursor.style.left = `${e.clientX}px`;
        elements.cursor.style.top = `${e.clientY}px`;
        
        setTimeout(() => {
            elements.cursorFollower.style.left = `${e.clientX}px`;
            elements.cursorFollower.style.top = `${e.clientY}px`;
        }, 100);
        
        // Change cursor color in projects section
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const rect = projectsSection.getBoundingClientRect();
            const isInProjectsSection = 
                e.clientY >= rect.top && 
                e.clientY <= rect.bottom && 
                e.clientX >= rect.left && 
                e.clientX <= rect.right;
            
            if (isInProjectsSection) {
                elements.cursor.style.background = '#ffffff';
                elements.cursorFollower.style.borderColor = '#ffffff';
            } else {
                elements.cursor.style.background = '#000000';
                elements.cursorFollower.style.borderColor = '#000000';
            }
        }
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .expertise-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            elements.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            elements.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            elements.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            elements.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    elements.statNumbers.forEach(stat => observer.observe(stat));
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
    elements.faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            elements.faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Elements to animate
    const animatedElements = document.querySelectorAll('.expertise-card, .project-card, .testimonial-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// LOAD DATA FROM JSON
// ============================================
async function loadData() {
    try {
        const response = await fetch('data/portfolio-data.json');
        const data = await response.json();
        
        populatePersonalInfo(data.personal);
        populateExpertise(data.expertise);
        populateProjects(data.projects);
        populateTestimonials(data.testimonials);
    } catch (error) {
        console.error('Error loading data:', error);
        // Load default data if JSON fails
        loadDefaultData();
    }
}

function populatePersonalInfo(personal) {
    if (!personal) return;
    
    // Update social links
    const socialLinks = {
        linkedinLink: personal.social.linkedin,
        githubLink: personal.social.github,
        instagramLink: personal.social.instagram,
        youtubeLink: personal.social.youtube,
        credlyLink: personal.social.credly,
        lattesLink: personal.social.lattes
    };
    
    Object.keys(socialLinks).forEach(id => {
        const link = document.getElementById(id);
        if (link && socialLinks[id]) {
            link.href = socialLinks[id];
        }
    });
    
    // Update contact info
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.href = `mailto:${personal.email}`;
        link.textContent = personal.email;
    });
}

function populateExpertise(expertise) {
    const grid = document.getElementById('expertiseGrid');
    if (!grid || !expertise) return;

    grid.innerHTML = expertise.map(item => `
        <div class="expertise-card">
            <div class="expertise-icon">
                <i class="${item.icon}"></i>
            </div>
            <h3 class="expertise-title">${item.title}</h3>
            <p class="expertise-description">${item.description}</p>
            <div class="expertise-skills">
                ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function populateProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid || !projects) return;

    grid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <button class="overlay-btn" onclick="window.open('${project.link}', '_blank')">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button class="overlay-btn" onclick="window.open('${project.github}', '_blank')">
                        <i class="fab fa-github"></i>
                    </button>
                </div>
            </div>
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function populateTestimonials(testimonials) {
    if (!elements.testimonialsSlider || !testimonials) return;

    elements.testimonialsSlider.innerHTML = testimonials.map((testimonial, index) => `
        <div class="testimonial-card ${index === 0 ? 'active' : ''}">
            <div class="testimonial-header">
                <div class="testimonial-logo">${testimonial.logo}</div>
                <div>
                    <h4 class="testimonial-company">${testimonial.company}</h4>
                    <p class="testimonial-role">${testimonial.role}</p>
                </div>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-rating">
                ${'★'.repeat(testimonial.rating)}
            </div>
        </div>
    `).join('');

    initTestimonialSlider(testimonials.length);
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonialSlider(totalSlides) {
    if (!elements.prevBtn || !elements.nextBtn) return;

    elements.prevBtn.addEventListener('click', () => {
        state.currentTestimonial = (state.currentTestimonial - 1 + totalSlides) % totalSlides;
        updateTestimonialSlider();
    });

    elements.nextBtn.addEventListener('click', () => {
        state.currentTestimonial = (state.currentTestimonial + 1) % totalSlides;
        updateTestimonialSlider();
    });
}

function updateTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
        card.style.display = index === state.currentTestimonial ? 'block' : 'none';
    });
}

// ============================================
// DEFAULT DATA (FALLBACK)
// ============================================
function loadDefaultData() {
    const defaultExpertise = [
        {
            icon: 'fas fa-code',
            title: 'Web Development',
            description: 'Creating responsive and modern web applications with clean code and best practices.',
            skills: ['HTML5', 'CSS3', 'JavaScript', 'React']
        },
        {
            icon: 'fas fa-paint-brush',
            title: 'UI/UX Design',
            description: 'Designing intuitive and beautiful user interfaces with focus on user experience.',
            skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping']
        },
        {
            icon: 'fab fa-python',
            title: 'Python Development',
            description: 'Building robust backend systems and automation tools with Python.',
            skills: ['Django', 'Flask', 'FastAPI', 'Data Analysis']
        },
        {
            icon: 'fas fa-mobile-alt',
            title: 'Responsive Design',
            description: 'Ensuring seamless experience across all devices and screen sizes.',
            skills: ['Mobile-First', 'CSS Grid', 'Flexbox', 'Media Queries']
        }
    ];

    const defaultProjects = [
        {
            image: 'https://via.placeholder.com/600x400/FFE500/000000?text=Project+1',
            category: 'Web Development',
            title: 'E-Commerce Platform',
            description: 'A modern e-commerce platform with advanced features and smooth user experience.',
            tags: ['React', 'Node.js', 'MongoDB'],
            link: '#',
            github: '#'
        },
        {
            image: 'https://via.placeholder.com/600x400/000000/FFE500?text=Project+2',
            category: 'UI/UX Design',
            title: 'Dashboard Analytics',
            description: 'An intuitive analytics dashboard with real-time data visualization.',
            tags: ['Figma', 'React', 'Chart.js'],
            link: '#',
            github: '#'
        },
        {
            image: 'https://via.placeholder.com/600x400/FFE500/000000?text=Project+3',
            category: 'Python',
            title: 'Automation Tool',
            description: 'A powerful automation tool for streamlining business processes.',
            tags: ['Python', 'FastAPI', 'PostgreSQL'],
            link: '#',
            github: '#'
        }
    ];

    const defaultTestimonials = [
        {
            logo: '🏢',
            company: 'TechCorp',
            role: 'CEO',
            text: 'Working with Matheus was an absolute pleasure. His attention to detail and creative solutions exceeded our expectations.',
            rating: 5
        },
        {
            logo: '🚀',
            company: 'StartupHub',
            role: 'Product Manager',
            text: 'Matheus delivered a fantastic product on time and within budget. Highly recommended for any web project.',
            rating: 5
        },
        {
            logo: '💼',
            company: 'BusinessPro',
            role: 'CTO',
            text: 'Professional, skilled, and always available to answer questions. Great experience working together.',
            rating: 5
        }
    ];

    populateExpertise(defaultExpertise);
    populateProjects(defaultProjects);
    populateTestimonials(defaultTestimonials);
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    elements.contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = elements.contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Prepare form data for Netlify
        const formData = new FormData(elements.contactForm);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                submitButton.style.background = '#4caf50';
                
                // Reset form
                elements.contactForm.reset();
                
                // Show alert
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            } else {
                throw new Error('Erro ao enviar mensagem');
            }
        } catch (error) {
            console.error('Error:', error);
            submitButton.innerHTML = '<i class="fas fa-times"></i> Erro!';
            submitButton.style.background = '#f44336';
            
            alert('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente por email: matheuslucindo904@gmail.com');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.image-backdrop, .hero-image');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    hideLoader();
    initNavigation();
    initCursor();
    initCounters();
    initFAQ();
    initScrollAnimations();
    initContactForm();
    initParallax();
    loadData();
    updateDynamicDates();
}

// ============================================
// UPDATE DYNAMIC DATES (AGE AND COPYRIGHT YEAR)
// ============================================
function updateDynamicDates() {
    // Calculate age based on birthday 12/11/2006
    const birthDate = new Date(2006, 10, 12); // Month is 0-indexed (10 = November)
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Update age in the page
    const ageElement = document.getElementById('current-age');
    if (ageElement) {
        ageElement.textContent = age;
    }
    
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = today.getFullYear();
    }
}

// ============================================
// START APPLICATION
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// EXPORT FOR MODULES (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, loadData };
}
