/* ===========================================================
   CAESAR — Main JavaScript
   رقم التواصل المعتمد: +963 966 054 055
   =========================================================== */

const WHATSAPP_NUMBER = '963966054055';
const DEFAULT_WA_MESSAGE =
    'مرحباً CAESAR، أريد الاستفسار عن تصميم موقع إلكتروني. أود شرح فكرتي ومعرفة التفاصيل.';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initSmoothScrolling();
    initNexusTools();
    initContactForm();
    initMobileMenu();
    initScrollReveal();
    initHeroParallax();
    initButtonRipple();
    setCurrentYear();
});

/* ---------------- Particles ---------------- */
function initParticles() {
    const particleBackground = document.getElementById('particle-background');
    if (!particleBackground) return;

    const colors = ['#6C5CE7', '#A78BF2', '#00D4AA', '#FDFFFC'];
    const particleCount = prefersReducedMotion.matches ? 14 : 42;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'glow-particle';

        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
        particle.style.animationDelay = `${Math.random() * 6}s`;

        particleBackground.appendChild(particle);
    }
}

/* ---------------- Smooth scrolling ---------------- */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });
}

/* ---------------- NEXUS tools ---------------- */
function initNexusTools() {
    /* --- Name generator --- */
    const generateNameBtn = document.getElementById('generate-name-btn');
    const generatedName = document.getElementById('generated-name');

    if (generateNameBtn && generatedName) {
        const names = [
            'Nexus', 'Quantum', 'Vertex', 'Aurora', 'Orion', 'Phoenix',
            'Helix', 'Nova', 'Zenith', 'Vector', 'Lumina', 'Prism',
            'Echo', 'Cipher', 'Aether', 'Pulse', 'Stellar', 'Vanta'
        ];

        generateNameBtn.addEventListener('click', function () {
            let name = names[Math.floor(Math.random() * names.length)];
            const suffix = ['Lab', 'Studio', 'X', 'Core', 'Works', 'Hub', 'Verse'];
            name += ' ' + suffix[Math.floor(Math.random() * suffix.length)];
            generatedName.textContent = name;
            generatedName.style.opacity = '0';
            requestAnimationFrame(() => {
                generatedName.style.transition = 'opacity .35s ease';
                generatedName.style.opacity = '1';
            });
        });
    }

    /* --- Color generator (copyable HEX) --- */
    const generateColorBtn = document.getElementById('generate-color-btn');
    const generatedColor = document.getElementById('generated-color');
    const colorHex = document.getElementById('color-hex');

    if (generateColorBtn && generatedColor && colorHex) {
        const colorList = ['#6C5CE7', '#A78BF2', '#00D4AA', '#FF6B6B', '#FDFFFC', '#FF8C42', '#1E90FF', '#B388FF'];

        const applyRandomColor = function () {
            const color = colorList[Math.floor(Math.random() * colorList.length)];
            generatedColor.style.background = color;
            generatedColor.style.color = color === '#FDFFFC' ? '#111' : '#fff';
            generatedColor.textContent = color;
            colorHex.value = color;
            colorHex.style.background = color;
            colorHex.style.color = color === '#FDFFFC' ? '#111' : '#fff';
        };

        generateColorBtn.addEventListener('click', applyRandomColor);
        applyRandomColor();

        const copyHex = function () {
            if (!colorHex.value) return;
            const done = function () {
                const previous = colorHex.value;
                colorHex.value = 'تم النسخ ✓';
                setTimeout(() => { colorHex.value = previous; }, 1200);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(colorHex.value).then(done).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }

            function fallbackCopy() {
                colorHex.removeAttribute('readonly');
                colorHex.select();
                try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
                colorHex.setAttribute('readonly', 'readonly');
            }
        };

        colorHex.addEventListener('click', copyHex);
    }

    /* --- Idea generator --- */
    const ideaGenerator = document.getElementById('generate-idea-btn');
    const generatedIdea = document.getElementById('generated-idea');

    if (ideaGenerator && generatedIdea) {
        const ideas = [
            'ابدأ بهوية بصرية واضحة: شعار، ألوان، وخط موحّد.',
            'اجعل صفحة البداية تُجيب على سؤال: ماذا أستفيد من هذا الموقع؟',
            'استخدم صوراً حقيقية عالية الجودة بدل الصور العامة.',
            'قلّل عدد الخطوات بين الزائر وطلب الخدمة إلى خطوة واحدة.',
            'صمّم نسخة الموبايل أولاً ثم وسّعها للشاشات الكبيرة.',
            'أضف قسم أسئلة شائعة يقلّل استفسارات العملاء المتكررة.',
            'اجعل سرعة التحميل أولوية: صور مضغوطة وخطوط خفيفة.',
            'ضع دعوة واضحة للتواصل في نهاية كل قسم من الصفحة.'
        ];

        ideaGenerator.addEventListener('click', function () {
            generatedIdea.textContent = ideas[Math.floor(Math.random() * ideas.length)];
            generatedIdea.style.opacity = '0';
            requestAnimationFrame(() => {
                generatedIdea.style.transition = 'opacity .35s ease';
                generatedIdea.style.opacity = '1';
            });
        });
    }
}

/* ---------------- Contact form → WhatsApp ---------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameField = document.getElementById('contact-name');
    const emailField = document.getElementById('contact-email');
    const messageField = document.getElementById('contact-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameField ? nameField.value.trim() : '';
        const email = emailField ? emailField.value.trim() : '';
        const message = messageField ? messageField.value.trim() : '';

        // Validate required fields (name + message)
        let invalid = false;
        [nameField, messageField].forEach(field => {
            if (!field) return;
            if (!field.value.trim()) {
                field.style.borderColor = '#FF6B6B';
                invalid = true;
            } else {
                field.style.borderColor = '';
            }
        });
        if (invalid) {
            (nameField && !name ? nameField : messageField).focus();
            return;
        }

        let text = 'مرحباً CAESAR، أريد الاستفسار عن تصميم موقع إلكتروني.';
        text += '\n\nالاسم: ' + name;
        if (email) text += '\nالبريد الإلكتروني: ' + email;
        text += '\nفكرتي والتفاصيل: ' + message;

        const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'noopener');
    });

    // Clear error highlight while typing
    [nameField, messageField].forEach(field => {
        if (!field) return;
        field.addEventListener('input', function () {
            if (this.value.trim()) this.style.borderColor = '';
        });
    });
}

/* ---------------- Mobile menu ---------------- */
function initMobileMenu() {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    if (!nav || !navLinks) return;

    const hamburger = document.createElement('button');
    hamburger.type = 'button';
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'فتح القائمة');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('active');
        this.classList.toggle('active', isOpen);
        this.setAttribute('aria-expanded', String(isOpen));
    });

    const navActions = nav.querySelector('.nav-actions');
    nav.insertBefore(hamburger, navActions);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ---------------- Scroll reveal ---------------- */
function initScrollReveal() {
    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll(
        '.service-card, .nexus-tool, .step-card, .detail-item, .contact-buttons'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .6s ease, transform .6s ease';
        observer.observe(el);
    });
}

/* ---------------- Hero sphere responds to mouse ---------------- */
function initHeroParallax() {
    const sphere = document.querySelector('.hero-sphere');
    if (!sphere || prefersReducedMotion.matches || window.matchMedia('(pointer: coarse)').matches) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', function (e) {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        sphere.style.transform =
            `translateY(-50%) translate(${x * 26}px, ${y * 26}px) rotate(${x * 6}deg)`;
    });

    hero.addEventListener('mouseleave', function () {
        sphere.style.transform = 'translateY(-50%)';
    });
}

/* ---------------- Button ripple ---------------- */
function initButtonRipple() {
    if (prefersReducedMotion.matches) return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .tool-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });
}

/* ---------------- Auto copyright year ---------------- */
function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}
