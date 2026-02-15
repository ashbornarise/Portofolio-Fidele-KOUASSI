// Dynamic Content Loader
// Loads saved data from localStorage and updates the page accordingly
(function() {
    const data = loadSiteData();

    // Only apply if there's stored data (user has used admin panel)
    if (!localStorage.getItem('portfolioSiteData')) return;

    const p = data.profile;

    // ========== PROFILE / HERO ==========
    const heroGreeting = document.querySelector('.hero-greeting');
    if (heroGreeting) heroGreeting.textContent = p.name.toUpperCase();

    const heroNameParts = p.name.split(' ');
    const heroName = document.querySelector('.hero-name');
    if (heroName && heroNameParts.length >= 2) {
        heroName.innerHTML = heroNameParts[0] + '<br>' + heroNameParts.slice(1).join(' ');
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = p.title;

    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) heroDesc.textContent = p.description;

    // Images
    const heroImg = document.querySelector('.hero-section .photo-frame img');
    if (heroImg && p.heroImage) heroImg.src = resolveImage(p.heroImage);

    const aboutImg = document.querySelector('.about-image img');
    if (aboutImg && p.aboutImage) aboutImg.src = resolveImage(p.aboutImage);

    const contactImg = document.querySelector('.contact-image img');
    if (contactImg && p.contactImage) contactImg.src = resolveImage(p.contactImage);

    // Quote
    const quoteTexts = document.querySelectorAll('.quote-text, .footer-quote');
    quoteTexts.forEach(el => {
        if (el.classList.contains('quote-text')) {
            el.textContent = '" ' + p.quote + ' "';
        } else {
            el.textContent = p.quote;
        }
    });

    // Contact info
    const whatsappLink = document.querySelector('.contact-item a[href*="wa.me"]');
    if (whatsappLink) {
        const phoneClean = p.phone.replace(/\s+/g, '').replace('+', '');
        whatsappLink.href = 'https://wa.me/' + phoneClean;
        whatsappLink.textContent = p.phone;
    }

    const emailLink = document.querySelector('.contact-item a[href*="mailto"]');
    if (emailLink) {
        emailLink.href = 'mailto:' + p.email;
        emailLink.textContent = p.email;
    }

    const linkedinLink = document.querySelector('.contact-item a[href*="linkedin"]');
    if (linkedinLink) {
        linkedinLink.href = p.linkedin;
        linkedinLink.textContent = p.linkedinName;
    }

    const locationEl = document.querySelectorAll('.contact-item');
    locationEl.forEach(item => {
        const icon = item.querySelector('.contact-icon');
        if (icon && icon.textContent.includes('📍')) {
            const pEl = item.querySelector('.contact-details p');
            if (pEl) pEl.textContent = p.location;
        }
    });

    // Footer name
    const footerName = document.querySelector('.footer-name');
    if (footerName) footerName.textContent = p.name.toUpperCase();

    // ========== ABOUT ==========
    const aboutText = document.querySelector('.about-text');
    if (aboutText && data.about.paragraphs.length) {
        // Keep the CTA button
        const ctaBtn = aboutText.querySelector('.cta-buttons');
        aboutText.innerHTML = '';
        data.about.paragraphs.forEach(para => {
            const pEl = document.createElement('p');
            pEl.innerHTML = para;
            aboutText.appendChild(pEl);
        });
        if (ctaBtn) aboutText.appendChild(ctaBtn);
    }

    // ========== FORMATION ==========
    const timeline = document.querySelector('.timeline');
    if (timeline && data.formation.length) {
        timeline.innerHTML = '';
        data.formation.forEach(f => {
            const item = document.createElement('div');
            item.className = 'timeline-item reveal';
            let itemsHtml = '';
            if (f.items && f.items.length) {
                itemsHtml = '<ul>' + f.items.map(i => `<li>${escHtml(i)}</li>`).join('') + '</ul>';
            }
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-year">${escHtml(f.year)}</div>
                <div class="timeline-school">${escHtml(f.school)}</div>
                <div class="timeline-degree">${escHtml(f.degree)}</div>
                <div class="timeline-description">
                    <p>${escHtml(f.description)}</p>
                    ${itemsHtml}
                </div>
            `;
            timeline.appendChild(item);
        });
    }

    // ========== SKILLS ==========
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid && data.skills.length) {
        skillsGrid.innerHTML = '';
        data.skills.forEach(s => {
            const card = document.createElement('div');
            card.className = 'skill-card reveal';
            card.innerHTML = `
                <span class="skill-icon">${s.icon}</span>
                <h3 class="skill-title">${escHtml(s.title)}</h3>
                <p class="skill-description">${escHtml(s.description)}</p>
            `;
            skillsGrid.appendChild(card);
        });
    }

    // ========== PROJECTS ==========
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && data.projects.length) {
        projectsGrid.innerHTML = '';
        data.projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            const imgHtml = proj.image
                ? `<img src="${resolveImage(proj.image)}" alt="${escHtml(proj.title)}">`
                : '';
            const tagsHtml = (proj.tags || []).map(t => `<span class="tag">${escHtml(t)}</span>`).join('');
            card.innerHTML = `
                <div class="project-number">${escHtml(proj.number)}</div>
                <div class="project-image">
                    ${imgHtml}
                    <div class="project-icon">${proj.icon}</div>
                    <div class="mechanical-overlay">
                        <div class="mech-line mech-line-1"></div>
                        <div class="mech-line mech-line-2"></div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${escHtml(proj.title)}</h3>
                    <p class="project-location">${escHtml(proj.location)}</p>
                    <p class="project-description">${escHtml(proj.description)}</p>
                    <div class="project-tags">${tagsHtml}</div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // ========== GALLERY ==========
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid && data.gallery.length) {
        galleryGrid.innerHTML = '';
        data.gallery.forEach(g => {
            const item = document.createElement('div');
            const isVideo = g.type === 'video';
            item.className = 'gallery-item reveal' + (isVideo ? ' gallery-video' : '');
            item.setAttribute('data-category', g.category);

            if (isVideo) {
                item.innerHTML = `
                    <video src="${resolveImage(g.image)}" muted preload="metadata"></video>
                    <div class="video-play-btn">&#9654;</div>
                    <div class="gallery-overlay">
                        <p class="gallery-category">Vidéo</p>
                        <p class="gallery-title">${escHtml(g.title)}</p>
                    </div>
                `;
                // Re-attach video play handler
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
            } else {
                item.innerHTML = `
                    <img src="${resolveImage(g.image)}" alt="${escHtml(g.title)}">
                    <div class="gallery-overlay">
                        <p class="gallery-category">${escHtml(capitalize(g.category))}</p>
                        <p class="gallery-title">${escHtml(g.title)}</p>
                    </div>
                `;
            }
            galleryGrid.appendChild(item);
        });

        // Re-attach gallery filter handlers
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // ========== EXPERIENCE ==========
    const expGrid = document.querySelector('.experience-grid');
    if (expGrid && data.experience.length) {
        expGrid.innerHTML = '';
        data.experience.forEach(e => {
            const card = document.createElement('div');
            card.className = 'experience-card reveal';
            card.innerHTML = `
                <div class="experience-header">
                    <div>
                        <h3 class="experience-title">${escHtml(e.title)}</h3>
                        <p class="experience-company">${escHtml(e.company)}</p>
                    </div>
                    <div class="experience-year">${escHtml(e.year)}</div>
                </div>
                <p class="experience-description">${escHtml(e.description)}</p>
            `;
            expGrid.appendChild(card);
        });
    }

    // ========== STATS ==========
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid && data.stats.length) {
        statsGrid.innerHTML = '';
        data.stats.forEach(s => {
            const item = document.createElement('div');
            item.className = 'stat-item reveal';
            item.innerHTML = `
                <div class="stat-number" data-target="${s.target}">0</div>
                <div class="stat-label">${escHtml(s.label)}</div>
            `;
            statsGrid.appendChild(item);
        });

        // Re-observe stats for counter animation
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.stat-number').forEach(num => {
                            const target = parseInt(num.getAttribute('data-target'));
                            let current = 0;
                            const increment = target / 50;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    num.textContent = target;
                                    clearInterval(timer);
                                } else {
                                    num.textContent = Math.floor(current);
                                }
                            }, 30);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(statsSection);
        }
    }

    // Re-trigger reveal for dynamically added elements
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }, 100);

    // ========== UTILITIES ==========
    function resolveImage(src) {
        // Check if it's an uploaded base64 image
        if (src && src.startsWith('uploaded_')) {
            try {
                const uploads = JSON.parse(localStorage.getItem('portfolioUploads') || '{}');
                if (uploads[src]) return uploads[src];
            } catch (e) {}
        }
        return src;
    }

    function escHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function capitalize(str) {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    }
})();
