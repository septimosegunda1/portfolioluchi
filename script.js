// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'light';
    
    themeSwitch.addEventListener('change', function() {
        const theme = this.checked ? 'light' : 'dark';
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
    
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Skills Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update tab indicator position
            const btnWidth = this.offsetWidth;
            const btnLeft = this.offsetLeft;
            tabIndicator.style.width = `${btnWidth}px`;
            tabIndicator.style.left = `${btnLeft}px`;
            
            // Show corresponding content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Initialize first tab as active
    if (tabBtns.length > 0) {
        const firstBtn = tabBtns[0];
        const btnWidth = firstBtn.offsetWidth;
        tabIndicator.style.width = `${btnWidth}px`;
        tabIndicator.style.left = '0';
    }
    
    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Special case for skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.hidden').forEach(element => {
        observer.observe(element);
    });
    
    // Typewriter Effect
    const typeTextElements = document.querySelectorAll('.type-text');
    
    if (typeTextElements.length > 0) {
        const texts = [
            "Desarrollador Full Stack",
            "Programador Frontend",
            "Desarrollador Backend",
            "Entusiasta de la Tecnología"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typeTextElements.forEach(el => {
                    el.textContent = currentText.substring(0, charIndex - 1);
                });
                charIndex--;
            } else {
                typeTextElements.forEach(el => {
                    el.textContent = currentText.substring(0, charIndex + 1);
                });
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(typeWriter, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                isEnd = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeWriter, 500);
            } else {
                const speed = isDeleting ? 100 : 150;
                setTimeout(typeWriter, isEnd ? speed / 2 : speed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Particles Background
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = Math.floor(window.innerWidth / 10);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position and size
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize animations for elements already in view
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('show');
        }
    });
});