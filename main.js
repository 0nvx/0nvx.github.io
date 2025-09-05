// Main JavaScript for 0nvx Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeAnimations();
    initializeSmoothScrolling();
    initializeSkillTagAnimations();
    initializeTypingEffect();
    initializeMatrixEffect();
});

// Initialize fade-in animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Add scroll animation classes to different elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
            section.classList.add('slide-left');
        } else {
            section.classList.add('slide-right');
        }
        observer.observe(section);
    });

    // Animate skill tags with staggered delays
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.classList.add('animate-on-scroll', 'scale', `delay-${Math.min(index + 1, 5)}`);
        observer.observe(tag);
    });

    // Animate social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.classList.add('animate-on-scroll', 'scale', `delay-${Math.min(index + 1, 4)}`);
        observer.observe(link);
    });

    // Animate individual cards/boxes within sections
    const cardElements = document.querySelectorAll('.bg-gray-900, .bg-gradient-to-r');
    cardElements.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
            card.classList.add('slide-left');
        } else {
            card.classList.add('slide-right');
        }
        card.classList.add(`delay-${Math.min(index + 1, 3)}`);
        observer.observe(card);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced skill tag animations
function initializeSkillTagAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.pixel-text');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    // heroTitle.style.borderRight = '2px solid #00ff00';
    
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Matrix rain effect (Easter egg)
function initializeMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff4444';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Only run matrix effect on larger screens
    if (window.innerWidth > 768) {
        setInterval(drawMatrix, 33);
    }
}

// Logo click easter egg
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo-image');
    let clickCount = 0;
    
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                // Activate matrix effect
                const matrixCanvas = document.querySelector('.matrix-rain');
                if (matrixCanvas) {
                    matrixCanvas.style.opacity = '0.3';
                    matrixCanvas.style.zIndex = '1';
                }
                
                // Show easter egg message
                const message = document.createElement('div');
                message.innerHTML = '<i class="fas fa-code"></i> Matrix Mode Activated!';
                message.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
                document.body.appendChild(message);
                
                setTimeout(() => {
                    message.remove();
                    if (matrixCanvas) {
                        matrixCanvas.style.opacity = '0.1';
                        matrixCanvas.style.zIndex = '-1';
                    }
                }, 5000);
                
                clickCount = 0;
            }
        });
    }
});

// Parallax effect for sections
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.project-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add loading screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loading-screen';
    loader.innerHTML = `
        <div class="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div class="text-center">
                <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-red-400 mx-auto mb-4"></div>
                <p class="text-red-400 pixel-text text-xl">Initializing 0nvx...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
}

// Show loading screen on page load
window.addEventListener('load', showLoadingScreen);
