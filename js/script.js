/* JavaScript for CAESAR Website */

// Reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initSmoothScrolling();
    initNexusTools();
    initHoverEffects();
    initMobileMenu();
    initScrollReveal();
    initCursorEffect();
});

// Particle background
function initParticles() {
    const particleBackground = document.getElementById('particle-background');
    if (!particleBackground) return;
    
    const colors = ['#6C5CE7', '#A78BF2', '#00D4AA', '#FDFFFC'];
    const particleCount = prefersReducedMotion ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'glow-particle';
        
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        const left = Math.random() * 100;
        particle.style.left = `${left}%`;
        
        const duration = Math.random() * 8 + 6;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 4}s`;
        
        particleBackground.appendChild(particle);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Nexus tools
function initNexusTools() {
    // Name generator
    const nameGenerator = document.getElementById('name-generator');
    const generateNameBtn = document.getElementById('generate-name-btn');
    const generatedName = document.getElementById('generated-name');
    
    if (nameGenerator && generateNameBtn && generatedName) {
        const names = [
            'Nexus', 'Quantum', 'Vertex', 'Aurora', 'Orion', 'Phoenix',
            'Helix', 'Nova', 'Zenith', 'Vector', 'Lumina', 'Prism'
        ];
        
        generateNameBtn.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * names.length);
            generatedName.textContent = names[randomIndex];
            generatedName.style.color = prefersReducedMotion ? '#6C5CE7' : 'var(--accent-purple)';
        });
        
        // Trigger first generation
        if (!prefersReducedMotion) {
            generateNameBtn.click();
        }
    }
    
    // Color generator
    const colorGenerator = document.getElementById('color-generator');
    const generateColorBtn = document.getElementById('generate-color-btn');
    const generatedColor = document.getElementById('generated-color');
    const colorHex = document.getElementById('color-hex');
    
    if (colorGenerator && generateColorBtn && generatedColor && colorHex) {
        const colorList = ['#6C5CE7', '#A78BF2', '#00D4AA', '#FF6B6B', '#FDFFFC', '#FF8C42'];
        
        generateColorBtn.addEventListener('click', function() {
            const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
            generatedColor.style.background = randomColor;
            colorHex.value = randomColor;
            colorHex.style.background = randomColor;
        });
        
        // Trigger first generation
        generateColorBtn.click();
    }
    
    // Idea generator
    const ideaGenerator = document.getElementById('generate-idea-btn');
    const generatedIdea = document.getElementById('generated-idea');
    
    if (ideaGenerator && generatedIdea) {
        const ideas = [
            'استخدم الألوان المتوهجة لجذب الانتباه',
            'صمم بتجربة مستخدم بديهية',
            'ركز على التوافق على الأجهزة المحمولة',
            'أضف تفاعلات خفيفة وجميلة',
            'اجعل التنقل سهلاً ومنطقياً',
            'استخدم الفراغ الإيجابي بذكاء'
        ];
        
        ideaGenerator.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * ideas.length);
            generatedIdea.textContent = ideas[randomIndex];
            generatedIdea.style.color = prefersReducedMotion ? '#a8a8d8' : 'var(--text-secondary)';
        });
        
        // Trigger first generation
        if (!prefersReducedMotion) {
            ideaGenerator.click();
        }
    }
}

// Hover effects
function initHoverEffects() {
    // Card hover effects already handled in CSS
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .tool-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (prefersReducedMotion) return;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transition = 'width 0.5s, height 0.5s, opacity 0.5s';
            ripple.style.position = 'absolute';
            ripple.style.left = '0';
            ripple.style.top = '0';
            ripple.style.opacity = '0.6';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('div');
    
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Insert hamburger before nav-actions
    const nav = document.querySelector('.navbar');
    if (nav && navActions) {
        nav.insertBefore(hamburger, nav.querySelector('.nav-actions'));
    }
    
    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .nexus-tool, .step-card, .detail-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Cursor effect
function initCursorEffect() {
    if (prefersReducedMotion) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = `${cursorX - 10}px`;
        cursor.style.top = `${cursorY - 10}px`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, .service-card, .tool-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--accent-purple)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '';
        });
    });
}

// Add ripple styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        animation: rippleEffect 0.6s ease-out;
    }
    @keyframes rippleEffect {
        to {
            width: 200%;
            height: 200%;
            opacity: 0;
        }
    }
    .custom-cursor {
        width: 20px;
        height: 20px;
        background: var(--accent-purple);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.2s ease, background 0.2s ease;
    }
`;
document.head.appendChild(rippleStyle);

// Add custom cursor CSS
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .nav-links.active {
        display: flex;
        position: fixed;
        top: 80px;
        left: 5%;
        flex-direction: column;
        background: var(--bg-secondary);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 20px;
        width: 80%;
        max-width: 400px;
        backdrop-filter: blur(10px);
    }
    .hamburger {
        width: 30px;
        height: 20px;
        position: relative;
        cursor: pointer;
    }
    .hamburger span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: var(--text-primary);
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }
    .hamburger span:nth-child(1) { top: 0px; }
    .hamburger span:nth-child(2) { top: 8px; }
    .hamburger span:nth-child(3) { top: 16px; }
    .hamburger.active span:nth-child(1) { top: 8px; transform: rotate(135deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; top: 8px; }
    .hamburger.active span:nth-child(3) { top: 8px; transform: rotate(-135deg); }
`;
document.head.appendChild(cursorStyle);

// Add theme toggle button
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.innerHTML += '<i class="fas fa-sun"></i>';
themeToggle.style.display = 'none'; // Hidden for now, can be enabled later
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
document.body.appendChild(themeToggle);

// Add dark mode styles if needed
const darkModeStyle = document.createElement('style');
darkModeStyle.textContent = `
    .dark-mode {
        --bg-primary: #12121c;
        --bg-secondary: #1a1a28;
    }
`;
document.head.appendChild(darkModeStyle);