// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax effect for gears
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gears = document.querySelectorAll('.gear');

    gears.forEach((gear, index) => {
        const speed = (index + 1) * 0.25;
        gear.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.08}deg)`;
    });
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate stats counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => animateCounter(num));
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Video gallery play functionality
document.querySelectorAll('.gallery-video').forEach(item => {
    const playBtn = item.querySelector('.video-play-btn');
    const video = item.querySelector('video');

    if (playBtn && video) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = document.getElementById('videoModal');
            const modalVideo = document.getElementById('modalVideo');
            modalVideo.src = video.src;
            modal.classList.add('active');
            modalVideo.play();
        });
    }
});

// Video modal close
const videoModal = document.getElementById('videoModal');
const videoModalClose = document.getElementById('videoModalClose');
const modalVideo = document.getElementById('modalVideo');

if (videoModalClose) {
    videoModalClose.addEventListener('click', () => {
        modalVideo.pause();
        modalVideo.src = '';
        videoModal.classList.remove('active');
    });
}

if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            modalVideo.pause();
            modalVideo.src = '';
            videoModal.classList.remove('active');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
