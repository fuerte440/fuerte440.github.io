// Variables globales para que sean accesibles en todo el script
let mobileMenuBtn;
let navLinks;

document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZAR VARIABLES
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    navLinks = document.getElementById('navLinks');
    const themeBtn = document.querySelector('.theme-btn');

    // 2. GESTIÓN DE TEMA
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.innerHTML = '☀️';
    }

    // 3. MENÚ MÓVIL (Lógica de apertura)
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Cambiar icono
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Cerrar menú al hacer clic en enlaces
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) closeMenu();
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // 4. EFECTOS DE SCROLL
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '1rem 0';
        }

        // Resaltar sección activa
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Usamos window.scrollY en lugar de pageYOffset
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary)';
            } else {
                link.style.color = 'var(--text-secondary)';
            }
        });
    });

    // 5. ANIMACIONES FADE-IN
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section:not(.hero)').forEach(section => {
        observer.observe(section);
    });
});

/* --- FUNCIONES GLOBALES --- */

function closeMenu() {
    if (navLinks && mobileMenuBtn) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const btn = document.querySelector('.theme-btn');
    if (btn) btn.innerHTML = isDark ? '☀️' : '🌓';
}

function sendEmail() {
    const email = document.getElementById('emailInput').value;
    window.location.href = `mailto:${email}`;
}

function copyEmail() {
    const emailInput = document.getElementById('emailInput');
    const copyBtn = document.querySelector('.copy-btn');
    
    emailInput.select();
    navigator.clipboard.writeText(emailInput.value).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#22c55e';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = ''; 
        }, 2000);
    });
}