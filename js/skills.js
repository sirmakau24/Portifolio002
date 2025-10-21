// Skills page specific functionality

function initSkills() {
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function animateSkillBar(bar) {
    const width = bar.getAttribute('data-width');
    const percentage = parseInt(width);
    
    // Reset width to 0
    bar.style.width = '0%';
    
    // Animate to target width
    let currentWidth = 0;
    const increment = percentage / 50; // 50 steps for smooth animation
    const duration = 50; // milliseconds per step
    
    const animation = setInterval(() => {
        currentWidth += increment;
        if (currentWidth >= percentage) {
            currentWidth = percentage;
            clearInterval(animation);
        }
        bar.style.width = currentWidth + '%';
    }, duration);
}

// Add click effects to skill categories
function initSkillCategoryEffects() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Add a subtle pulse effect
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Initialize skill level tooltips
function initSkillTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name').textContent;
        const skillPercentage = item.querySelector('.skill-percentage').textContent;
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `${skillName}: ${skillPercentage} proficiency`;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.8rem;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1000;
            white-space: nowrap;
        `;
        
        item.style.position = 'relative';
        item.appendChild(tooltip);
        
        // Show tooltip on hover
        item.addEventListener('mouseenter', function(e) {
            tooltip.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
        
        // Position tooltip
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            tooltip.style.left = (e.clientX - rect.left) + 'px';
            tooltip.style.top = (e.clientY - rect.top - 40) + 'px';
        });
    });
}

// Add progress bar animation with different speeds based on skill level
function animateSkillBarsWithSpeed() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const percentage = parseInt(width);
        
        // Different animation speeds based on skill level
        let speed;
        if (percentage >= 90) {
            speed = 20; // Fast for high skills
        } else if (percentage >= 70) {
            speed = 30; // Medium for medium skills
        } else {
            speed = 40; // Slower for lower skills
        }
        
        bar.style.width = '0%';
        
        let currentWidth = 0;
        const increment = percentage / speed;
        
        const animation = setInterval(() => {
            currentWidth += increment;
            if (currentWidth >= percentage) {
                currentWidth = percentage;
                clearInterval(animation);
            }
            bar.style.width = currentWidth + '%';
        }, 20);
    });
}

// Initialize all skills functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('skills.html')) {
        initSkills();
        initSkillCategoryEffects();
        initSkillTooltips();
    }
});

