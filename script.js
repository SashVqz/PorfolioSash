let currentTheme = 'light';
let isMenuOpen = false; // Initialize isMenuOpen
let currentFilter = 'all'; // Initialize currentFilter

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Función principal de inicialización
function initializePortfolio() {
    // Inicializar tema antes que nada
    initializeTheme();
    
    // Ocultar loading después de 2 segundos
    setTimeout(hideLoading, 2000);
    
    // Inicializar navegación
    initializeNavigation();
    
    // Inicializar filtros de proyectos
    initializeProjectFilters();
    
    // Inicializar animaciones de scroll
    initializeScrollAnimations();
    
    // Inicializar smooth scroll
    initializeSmoothScroll();
    
    // Agregar event listeners
    addEventListeners();
}

// Función para inicializar el tema
function initializeTheme() {
    // Obtener tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Aplicar tema
    applyTheme(currentTheme);
    
    // Configurar botón de toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        updateThemeToggleIcon();
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Escuchar cambios en preferencias del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
            updateThemeToggleIcon();
        }
    });
}

// Función para aplicar el tema
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
}

// Función para alternar tema
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Aplicar nuevo tema
    applyTheme(newTheme);
    
    // Guardar preferencia
    localStorage.setItem('portfolio-theme', newTheme);
    
    // Actualizar icono
    updateThemeToggleIcon();
    
    // Animación suave del botón
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    }
}

// Función para actualizar el icono del toggle
function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Función para ocultar pantalla de carga
function hideLoading() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        
        // Remover elemento después de la transición
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Inicializar navegación
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto scroll en navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo basado en la sección visible
        updateActiveNavLink();
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            navMenu.classList.toggle('active');
            
            // Animar hamburger
            hamburger.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            isMenuOpen = false;
        });
    });
}

// Actualizar enlace activo en navegación
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

// Inicializar filtros de proyectos
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar proyectos
            filterProjects(filter);
        });
    });
}

// Función para filtrar proyectos
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Agregar clase de transición
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
            
            // Remover clase de transición
            setTimeout(() => {
                card.classList.remove('filtering');
            }, 300);
        }, 50);
    });
    
    currentFilter = filter;
}

// Inicializar animaciones de scroll
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
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll(
        '.about-card, .project-card, .contact-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Inicializar smooth scroll
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

// Manejar envío de formulario
function handleFormSubmit(event) { // Added event parameter
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validación básica
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, introduce un email válido', 'error');
        return;
    }
    
    // Simular envío (aquí integrarías con tu backend)
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Mensaje enviado correctamente!', 'success');
        clearForm();
        
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Limpiar formulario
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar estilos si no existen
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
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Agregar event listeners adicionales
function addEventListeners() {
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', handleWindowResize);
    
    // Manejar teclas del teclado
    document.addEventListener('keydown', handleKeyPress);
    
    // Prevenir zoom en inputs en iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.fontSize = '16px';
            });
        });
    }
}

// Manejar redimensionamiento de ventana
function handleWindowResize() {
    // Cerrar menú móvil si se redimensiona a desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        isMenuOpen = false;
    }
}

// Manejar teclas del teclado
function handleKeyPress(e) {
    // Cerrar menú móvil con ESC
    if (e.key === 'Escape' && isMenuOpen) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        isMenuOpen = false;
    }
    
    // Toggle tema con Ctrl/Cmd + D
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
}

// Función para carga lazy de imágenes
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

// Función para crear partículas animadas en el fondo
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
        
        // Cambiar color según el tema
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDark ? '168, 85, 247' : '168, 85, 247';
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Conectar partículas cercanas
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
    
    // Inicializar
    resizeCanvas();
    initParticles();
    animate();
    
    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Pausar animación cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    
    // Actualizar opacidad según el tema
    const updateCanvasOpacity = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        canvas.style.opacity = isDark ? '0.4' : '0.3';
    };
    
    // Observer para cambios de tema
    const observer = new MutationObserver(updateCanvasOpacity);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// Función para efectos de typing en el hero
function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--color-purple-500)';
    
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        } else {
            // Remover cursor después de terminar
            setTimeout(() => {
                heroSubtitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Iniciar después de un delay
    setTimeout(typeText, 1500);
}

// Función para paralaje suave
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(element => {
            // Note: Directly manipulating pseudo-elements with JS isn't possible.
            // This function assumes you have actual elements or a CSS variable approach.
            // If these are pseudo-elements, this JS won't work directly.
            // You might need to add a wrapper element or adjust CSS custom properties.
            element.style.transform = `translateY(${rate}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Función para crear tooltip dinámicos
function initializeTooltips() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `Tecnología: ${e.target.textContent}`;
            
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

// Función para optimización de rendimiento
function optimizePerformance() {
    // Debounce para eventos de scroll y resize
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
    
    // Aplicar debounce a eventos costosos
    const debouncedResize = debounce(handleWindowResize, 150);
    const debouncedScroll = debounce(() => {
        updateActiveNavLink();
    }, 100);
    
    window.removeEventListener('resize', handleWindowResize);
    window.removeEventListener('scroll', updateActiveNavLink);
    
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('scroll', debouncedScroll);
    
    // Lazy loading para imágenes
    initializeLazyLoading();
    
    // Reducir animaciones en dispositivos con batería baja
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

// Función para análisis de performance
function trackPerformance() {
    // Medir tiempo de carga
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Portfolio cargado en: ${loadTime.toFixed(2)}ms`);
        
        // Enviar métricas (aquí integrarías con tu servicio de analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'value': Math.round(loadTime),
                'custom_parameter': 'portfolio_load'
            });
        }
    });
    
    // Medir interacciones
    document.addEventListener('click', (e) => {
        if (e.target.matches('.project-card, .filter-btn, .nav-link, .theme-toggle')) {
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

// Inicializar funciones adicionales cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Funciones adicionales para mejorar la experiencia
    setTimeout(() => {
        createParticleAnimation();
        initializeTypingEffect();
        initializeParallax();
        initializeTooltips();
        optimizePerformance();
        trackPerformance();
    }, 100);
});

// Exportar funciones para uso global
window.portfolioFunctions = {
    handleFormSubmit,
    filterProjects,
    showNotification,
    toggleTheme
};