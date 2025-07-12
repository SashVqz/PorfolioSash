let currentTheme = 'light';
let currentLanguage = 'es';
let isMenuOpen = false;
let currentFilter = 'all';

const translations = {
    en: {
        'loading': 'Loading Portfolio...',
        'nav-home': 'Home',
        'nav-about': 'About Me',
        'nav-projects': 'Projects',
        'hero-subtitle-line': 'Software Engineering & Physics',
        'hero-description': 'Specialized in machine & deep learning, computer vision, and advanced computational simulations',
        'about-title': 'About Me',
        'about-subtitle': 'Passion for science and technological innovation',
        'about-formation-title': 'My academic background and how I approach my projects',
        'about-formation-text': 'Built my solid foundation at U-tad, studying software engineering and computational physics. But real talk, it\'s in my personal projects where I truly let my passion run wild. That\'s my personal lab to sharpen my skills, discover new tools and languages, and dive deep into the topics that fire me up and inspire me.',
        'about-specialization-title': 'Areas of Specialization',
        'about-ai-title': 'Artificial Intelligence',
        'about-ai-text': 'I specialize in machine learning, deep learning, and computer vision, and I get hyped applying this knowledge in areas with real impact. My AI work is especially focused on medicine, stock market analysis, and science in general.',
        'about-graphics-title': 'Graphics Programming',
        'about-graphics-text': 'Plus, I\'m passionate about graphics programming and physical systems simulation. I love building everything from immersive VR applications to low-level physics simulations using CUDA (PhysX or DirectX), OpenGL, or Vulkan. I\'m also comfortable working at a higher level with tools like Unity or Houdini. This versatility lets me not only visualize what I study in physics but also create VFX simulations.',
        'projects-title': 'Projects',
        'projects-subtitle': 'A selection of my work across different areas of specialization',
        'filter-all': 'All',
        'filter-graphics': 'Graphics Programming & VFX',
        'filter-ai': 'Data Science & AI',
        'filter-algorithms': 'Algorithms & Numerical Methods',
        'filter-web3': 'Web3 & Blockchain',
        'project-cat-graphics': 'graphics programming',
        'project-cat-ml': 'Machine Learning',
        'project-cat-algorithms': 'Algorithms',
        'project1-title': 'Advanced Particle System',
        'project1-description': 'Particle simulation system for cinematic visual effects with real-time rendering.',
        'project2-title': 'CFD Fluid Simulator',
        'project2-description': 'Computational fluid dynamics simulator for behavior analysis in complex systems.',
        'project3-title': 'PBR Rendering Engine',
        'project3-description': 'Physics-based rendering engine with global illumination and realistic materials.',
        'contact-title': 'Contact',
        'contact-email-action': 'Send email',
        'contact-linkedin-text': 'Connect with me',
        'contact-linkedin-action': 'View profile',
        'contact-github-text': 'Check out my projects',
        'contact-github-action': 'View repositories',
        'footer-text': 'Personal projects portfolio'
    },
    es: {
        'loading': 'Cargando Portfolio...',
        'nav-home': 'Inicio',
        'nav-about': 'Sobre Mí',
        'nav-projects': 'Proyectos',
        'hero-subtitle-line': 'Ingeniería de Software y Física',
        'hero-description': 'Especializado en machine y deep learning, visión por computador y simulaciones computacionales avanzadas',
        'about-title': 'Sobre Mí',
        'about-subtitle': 'Pasión por la ciencia y la innovación tecnológica',
        'about-formation-title': 'Mi formación académica y cómo enfoco mis proyectos',
        'about-formation-text': 'Mi base sólida la estoy construyendo en U-tad, donde estudio ingeniería de software y física computacional. Sin embargo, es en mis proyectos personales donde verdaderamente libero mi pasión. Estos proyectos son mi laboratorio particular para perfeccionar mis habilidades, explorar nuevas herramientas y lenguajes, y profundizar en los temas que realmente me motivan e inspiran.',
        'about-specialization-title': 'Áreas de Especialización',
        'about-ai-title': 'Inteligencia Artificial',
        'about-ai-text': 'Me especializo en machine learning, deep learning y visión por computador, y me emociona aplicar este conocimiento en áreas con impacto real. Mi trabajo en IA se enfoca especialmente en medicina, análisis de mercados bursátiles y ciencia en general.',
        'about-graphics-title': 'Programación Gráfica',
        'about-graphics-text': 'Además, me apasiona la programación gráfica y la simulación de sistemas físicos. Me encanta construir desde aplicaciones VR inmersivas hasta simulaciones físicas a bajo nivel usando CUDA (PhysX o DirectX), OpenGL o Vulkan. También manejo herramientas de alto nivel como Unity o Houdini. Esta versatilidad me permite no solo visualizar lo que estudio en física, sino también crear simulaciones VFX.',
        'projects-title': 'Proyectos',
        'projects-subtitle': 'Una selección de mi trabajo en diferentes áreas de especialización',
        'filter-all': 'Todos',
        'filter-graphics': 'Programación Gráfica y VFX',
        'filter-ai': 'Data Science e IA',
        'filter-algorithms': 'Algoritmos y Métodos Numéricos',
        'filter-web3': 'Web3 y Blockchain',
        'project-cat-graphics': 'programación gráfica',
        'project-cat-ml': 'Machine Learning',
        'project-cat-algorithms': 'Algoritmos',
        'project1-title': 'Sistema de Partículas Avanzado',
        'project1-description': 'Sistema de simulación de partículas para efectos visuales cinematográficos con renderizado en tiempo real.',
        'project2-title': 'Simulador de Fluidos CFD',
        'project2-description': 'Simulador de dinámica de fluidos computacional para análisis de comportamiento en sistemas complejos.',
        'project3-title': 'Motor de Renderizado PBR',
        'project3-description': 'Motor de renderizado basado en física con iluminación global y materiales realistas.',
        'contact-title': 'Contacto',
        'contact-email-action': 'Enviar email',
        'contact-linkedin-text': 'Conecta conmigo',
        'contact-linkedin-action': 'Ver perfil',
        'contact-github-text': 'Revisa mis proyectos',
        'contact-github-action': 'Ver repositorios',
        'footer-text': 'Portfolio de proyectos personales'
    }
};


document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    initializeTheme();
    initializeLanguage();
    setTimeout(hideLoading, 2000);
    
    initializeNavigation();
    initializeProjectFilters();
    initializeScrollAnimations();
    initializeSmoothScroll();
    addEventListeners();
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        updateThemeToggleIcon();
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
            updateThemeToggleIcon();
        }
    });
}

function initializeLanguage() {
    const savedLanguage = localStorage.getItem('portfolio-language');
    const browserLanguage = navigator.language.startsWith('en') ? 'en' : 'es';
    currentLanguage = savedLanguage || browserLanguage;
    applyLanguage(currentLanguage);
    
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        updateLanguageToggleText();
        languageToggle.addEventListener('click', toggleLanguage);
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
}

function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.setAttribute('lang', language);
    
    const elementsToTranslate = document.querySelectorAll('[data-text]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-text');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    const titleTranslations = {
        es: 'Portfolio - Ingeniero de Software & Físico Computacional',
        en: 'Portfolio - Software Engineer & Computational Physicist'
    };
    
    document.title = titleTranslations[language] || titleTranslations.es;
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeToggleIcon(); 
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    }
}

function toggleLanguage() {
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    applyLanguage(newLanguage);
    localStorage.setItem('portfolio-language', newLanguage);
    updateLanguageToggleText();
    
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.style.transform = 'scale(0.8) rotate(360deg)';
        setTimeout(() => {
            languageToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    }
}

function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

function updateLanguageToggleText() {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        const text = languageToggle.querySelector('.language-text');
        if (text) {
            text.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
        }
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            isMenuOpen = false;
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        card.classList.add('filtering');
        setTimeout(() => {
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
            
            setTimeout(() => {
                card.classList.remove('filtering');
            }, 300);
        }, 50);
    });
    
    currentFilter = filter;
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.about-card, .project-card, .contact-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajustar por navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                max-width: 350px;
                backdrop-filter: blur(10px);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.2s ease;
                flex-shrink: 0;
            }
            
            .notification-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function addEventListeners() {
    window.addEventListener('resize', handleWindowResize);
    document.addEventListener('keydown', handleKeyPress);
    
    if (/iPad|iPhone/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.fontSize = '16px';
            });
        });
    }
}

function handleWindowResize() {
    if (window.innerWidth > 768 && isMenuOpen) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            isMenuOpen = false;
        }
    }
}

function handleKeyPress(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            isMenuOpen = false;
        }
    }
    
    // Toggle tema con Ctrl/Cmd + D
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Toggle idioma con Ctrl/Cmd + L
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        toggleLanguage();
    }
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function createParticleAnimation() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = '168, 85, 247';
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            ctx.fill();
        });
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    
    const updateCanvasOpacity = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        canvas.style.opacity = isDark ? '0.4' : '0.3';
    };
    
    const observer = new MutationObserver(updateCanvasOpacity);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const getTextForLanguage = () => {
        const key = heroSubtitle.getAttribute('data-text');
        return translations[currentLanguage] && translations[currentLanguage][key] 
            ? translations[currentLanguage][key] 
            : heroSubtitle.textContent;
    };
    
    const originalText = getTextForLanguage();
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--color-purple-500)';
    
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        } else {
            setTimeout(() => {
                heroSubtitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(typeText, 1500);
}

function initializeTooltips() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            
            const tooltipText = currentLanguage === 'es' 
                ? `Tecnología: ${e.target.textContent}`
                : `Technology: ${e.target.textContent}`;
            
            tooltip.textContent = tooltipText;
            
            const tooltipStyles = `
                position: absolute;
                background: var(--color-bg-elevated);
                color: var(--color-text-primary);
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.2s ease;
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--color-border-medium);
            `;
            
            tooltip.style.cssText = tooltipStyles;
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            e.target.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

function optimizePerformance() {
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    const debouncedResize = debounce(handleWindowResize, 150);
    const debouncedScroll = debounce(() => {
        updateActiveNavLink();
    }, 100);
    
    window.removeEventListener('resize', handleWindowResize);
    window.removeEventListener('scroll', updateActiveNavLink);
    
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('scroll', debouncedScroll);
    
    initializeLazyLoading();
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2) {
                document.body.classList.add('reduced-motion');
                
                const reducedMotionStyles = document.createElement('style');
                reducedMotionStyles.textContent = `
                    .reduced-motion * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                `;
                document.head.appendChild(reducedMotionStyles);
            }
        });
    }
}

function trackPerformance() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Portfolio cargado en: ${loadTime.toFixed(2)}ms`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'value': Math.round(loadTime),
                'custom_parameter': 'portfolio_load'
            });
        }
    });
    
    document.addEventListener('click', (e) => {
        if (e.target.matches('.project-card, .filter-btn, .nav-link, .theme-toggle, .language-toggle')) {
            const elementType = e.target.className.split(' ')[0];
            console.log(`Interacción con: ${elementType}`);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'engagement',
                    'event_label': elementType
                });
            }
        }
    });
}

function initializeAccessibility() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
    
    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createParticleAnimation();
        initializeTypingEffect();
        initializeTooltips();
        optimizePerformance();
        trackPerformance();
        initializeAccessibility();
    }, 100);
});

window.portfolioFunctions = {
    handleFormSubmit,
    filterProjects,
    showNotification,
    toggleTheme,
    toggleLanguage,
    applyLanguage
};