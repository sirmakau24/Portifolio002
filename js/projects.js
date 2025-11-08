// Projects page specific functionality

function initProjects() {
    // Initialize project card animations
    initProjectCardAnimations();
    
    // Initialize project filtering (if needed)
    initProjectFiltering();
    
    // Initialize project hover effects
    initProjectHoverEffects();
    
    // Initialize project modal (if needed)
    initProjectModal();
}

function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Staggered animation for project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectImage = card.querySelector('.project-img');
        const projectOverlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', function() {
            if (projectImage) {
                projectImage.style.transform = 'scale(1.1)';
            }
            if (projectOverlay) {
                projectOverlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (projectImage) {
                projectImage.style.transform = 'scale(1)';
            }
            if (projectOverlay) {
                projectOverlay.style.opacity = '0';
            }
        });
    });
}

function initProjectFiltering() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    // Prevent inserting duplicate filter container
    if (document.querySelector('.project-filters')) return;
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="fullstack">Full Stack</button>
        <button class="filter-btn" data-filter="frontend">Frontend</button>
        <button class="filter-btn" data-filter="automation">Automation</button>
    `;
    
    // Insert filter buttons before projects grid
    projectsContainer.parentNode.insertBefore(filterContainer, projectsContainer);
    
    // Use event delegation to avoid attaching duplicate handlers
    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initProjectModal() {
    // Create modal for project details
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <h2 class="modal-title"></h2>
                <div class="modal-image"></div>
                <div class="modal-description"></div>
                <div class="modal-tech"></div>
                <div class="modal-links"></div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(modal);
    
    // Style modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: white;
        margin: 5% auto;
        padding: 2rem;
        border-radius: 20px;
        width: 90%;
        max-width: 800px;
        position: relative;
        animation: modalSlideIn 0.3s ease;
    `;
    
    // Add modal styles
    const modalStyles = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            color: #0077b6;
        }
        
        .modal-close:hover {
            color: #023e8a;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Add click events to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            openProjectModal(this);
        });
    });
    
    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', closeProjectModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function openProjectModal(card) {
    const modal = document.querySelector('.project-modal');
    const title = card.querySelector('.project-title').textContent;
    const description = card.querySelector('.project-description').textContent;
    const techTags = card.querySelectorAll('.tech-tag');
    const projectLinks = card.querySelectorAll('.project-link');
    
    // Populate modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-description').textContent = description;
    
    // Add tech tags
    const modalTech = modal.querySelector('.modal-tech');
    modalTech.innerHTML = '<h3>Technologies Used:</h3><div class="tech-tags"></div>';
    const techContainer = modalTech.querySelector('.tech-tags');
    techTags.forEach(tag => {
        techContainer.appendChild(tag.cloneNode(true));
    });
    
    // Add project links
    const modalLinks = modal.querySelector('.modal-links');
    modalLinks.innerHTML = '<h3>Project Links:</h3><div class="project-links"></div>';
    const linksContainer = modalLinks.querySelector('.project-links');
    projectLinks.forEach(link => {
        linksContainer.appendChild(link.cloneNode(true));
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.querySelector('.project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add project card click effects
function initProjectCardClickEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize all projects functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('projects.html')) {
        initProjects();
        initProjectCardClickEffects();
    }
});

