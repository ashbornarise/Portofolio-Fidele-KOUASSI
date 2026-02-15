// Admin Panel JavaScript
const ADMIN_PASSWORD = 'admin2026';
let siteData = null;
let currentSection = 'profile';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showAdminPanel();
    }

    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('loginPassword').value;
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            showAdminPanel();
        } else {
            showToast('Mot de passe incorrect', 'error');
        }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('adminLoggedIn');
        location.reload();
    });

    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentSection = item.dataset.section;
            document.getElementById('sectionTitle').textContent = item.textContent.trim();
            renderSection(currentSection);
        });
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveCurrentSection);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Réinitialiser toutes les données aux valeurs par défaut ? Cette action est irréversible.')) {
            siteData = resetSiteData();
            renderSection(currentSection);
            showToast('Données réinitialisées', 'success');
        }
    });
});

function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'flex';
    siteData = loadSiteData();
    renderSection('profile');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// Render sections
function renderSection(section) {
    const container = document.getElementById('adminContent');
    switch (section) {
        case 'profile': renderProfile(container); break;
        case 'about': renderAbout(container); break;
        case 'formation': renderFormation(container); break;
        case 'skills': renderSkills(container); break;
        case 'projects': renderProjects(container); break;
        case 'gallery': renderGallery(container); break;
        case 'experience': renderExperience(container); break;
        case 'stats': renderStats(container); break;
    }
}

// ========== PROFILE SECTION ==========
function renderProfile(container) {
    const p = siteData.profile;
    container.innerHTML = `
        <div class="admin-card">
            <h3>Informations Personnelles</h3>
            <div class="form-group">
                <label>Nom Complet</label>
                <input type="text" id="profileName" value="${esc(p.name)}">
            </div>
            <div class="form-group">
                <label>Titre / Poste</label>
                <input type="text" id="profileTitle" value="${esc(p.title)}">
            </div>
            <div class="form-group">
                <label>Description (Hero)</label>
                <textarea id="profileDescription">${esc(p.description)}</textarea>
            </div>
            <div class="form-group">
                <label>Citation</label>
                <input type="text" id="profileQuote" value="${esc(p.quote)}">
            </div>
        </div>

        <div class="admin-card">
            <h3>Images</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Image Hero (Portrait)</label>
                    <input type="text" id="profileHeroImage" value="${esc(p.heroImage)}">
                    <p class="help-text">Chemin vers l'image (ex: images/photo.jpg)</p>
                    ${p.heroImage ? `<img src="${esc(p.heroImage)}" class="image-preview" alt="Hero">` : ''}
                </div>
                <div class="form-group">
                    <label>Image À Propos</label>
                    <input type="text" id="profileAboutImage" value="${esc(p.aboutImage)}">
                    ${p.aboutImage ? `<img src="${esc(p.aboutImage)}" class="image-preview" alt="About">` : ''}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Image Contact</label>
                    <input type="text" id="profileContactImage" value="${esc(p.contactImage)}">
                    ${p.contactImage ? `<img src="${esc(p.contactImage)}" class="image-preview" alt="Contact">` : ''}
                </div>
            </div>
            <div class="form-group">
                <label>Ajouter une nouvelle image</label>
                <div class="file-upload-zone" id="imageUploadZone">
                    <div class="upload-icon">📁</div>
                    <p>Cliquez ou glissez une image ici</p>
                    <p class="help-text">L'image sera convertie en Base64 et stockée localement</p>
                    <input type="file" id="imageUpload" accept="image/*">
                </div>
                <div id="uploadedImagePath" style="margin-top:0.5rem;color:var(--success);"></div>
            </div>
        </div>

        <div class="admin-card">
            <h3>Contact</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Téléphone / WhatsApp</label>
                    <input type="text" id="profilePhone" value="${esc(p.phone)}">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="profileEmail" value="${esc(p.email)}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>LinkedIn URL</label>
                    <input type="text" id="profileLinkedin" value="${esc(p.linkedin)}">
                </div>
                <div class="form-group">
                    <label>Nom LinkedIn</label>
                    <input type="text" id="profileLinkedinName" value="${esc(p.linkedinName)}">
                </div>
            </div>
            <div class="form-group">
                <label>Localisation</label>
                <input type="text" id="profileLocation" value="${esc(p.location)}">
            </div>
        </div>
    `;

    // Image upload handler
    setupImageUpload();
}

function setupImageUpload() {
    const zone = document.getElementById('imageUploadZone');
    const input = document.getElementById('imageUpload');
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.style.borderColor = 'var(--primary-cyan)'; });
    zone.addEventListener('dragleave', () => { zone.style.borderColor = 'var(--gray-border)'; });
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.style.borderColor = 'var(--gray-border)';
        if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
    });
    input.addEventListener('change', (e) => {
        if (e.target.files.length) handleImageFile(e.target.files[0]);
    });
}

function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result;
        const name = 'uploaded_' + Date.now() + '_' + file.name.replace(/\s+/g, '_');

        // Store in localStorage as uploaded image
        let uploads = JSON.parse(localStorage.getItem('portfolioUploads') || '{}');
        uploads[name] = base64;
        localStorage.setItem('portfolioUploads', JSON.stringify(uploads));

        const pathEl = document.getElementById('uploadedImagePath');
        if (pathEl) {
            pathEl.innerHTML = `Image uploadée: <code>${name}</code><br>
                <small>Utilisez ce nom dans les champs d'image. Pour les images du serveur, placez le fichier dans le dossier images/</small>`;
        }
        showToast('Image uploadée avec succès', 'success');
    };
    reader.readAsDataURL(file);
}

// ========== ABOUT SECTION ==========
function renderAbout(container) {
    const a = siteData.about;
    let html = '<div class="admin-card"><h3>Paragraphes "À Propos"</h3>';
    a.paragraphs.forEach((para, i) => {
        html += `
            <div class="form-group">
                <label>Paragraphe ${i + 1}</label>
                <textarea class="about-paragraph" data-index="${i}">${esc(para)}</textarea>
                <p class="help-text">HTML autorisé (ex: &lt;strong&gt;texte&lt;/strong&gt;)</p>
                ${i > 0 ? `<button class="btn-remove" onclick="removeAboutParagraph(${i})">Supprimer</button>` : ''}
            </div>
        `;
    });
    html += '<button class="btn-add" onclick="addAboutParagraph()">+ Ajouter un paragraphe</button>';
    html += '</div>';
    container.innerHTML = html;
}

function addAboutParagraph() {
    siteData.about.paragraphs.push('Nouveau paragraphe...');
    renderAbout(document.getElementById('adminContent'));
}

function removeAboutParagraph(index) {
    siteData.about.paragraphs.splice(index, 1);
    renderAbout(document.getElementById('adminContent'));
}

// ========== FORMATION SECTION ==========
function renderFormation(container) {
    let html = '';
    siteData.formation.forEach((f, i) => {
        html += `
        <div class="admin-card">
            <div class="card-header">
                <h3>Formation ${i + 1}</h3>
                <button class="btn-remove" onclick="removeFormation(${i})">Supprimer</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Année</label>
                    <input type="text" class="formation-year" data-index="${i}" value="${esc(f.year)}">
                </div>
                <div class="form-group">
                    <label>École</label>
                    <input type="text" class="formation-school" data-index="${i}" value="${esc(f.school)}">
                </div>
            </div>
            <div class="form-group">
                <label>Diplôme</label>
                <input type="text" class="formation-degree" data-index="${i}" value="${esc(f.degree)}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="formation-description" data-index="${i}">${esc(f.description)}</textarea>
            </div>
            <div class="form-group">
                <label>Points clés (un par ligne)</label>
                <textarea class="formation-items" data-index="${i}">${(f.items || []).join('\n')}</textarea>
            </div>
        </div>`;
    });
    html += '<button class="btn-add" onclick="addFormation()">+ Ajouter une formation</button>';
    container.innerHTML = html;
}

function addFormation() {
    siteData.formation.push({ year: '', school: '', degree: '', description: '', items: [] });
    renderFormation(document.getElementById('adminContent'));
}

function removeFormation(index) {
    siteData.formation.splice(index, 1);
    renderFormation(document.getElementById('adminContent'));
}

// ========== SKILLS SECTION ==========
function renderSkills(container) {
    let html = '';
    siteData.skills.forEach((s, i) => {
        html += `
        <div class="admin-card">
            <div class="card-header">
                <h3>${s.icon} ${esc(s.title)}</h3>
                <button class="btn-remove" onclick="removeSkill(${i})">Supprimer</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Icône (emoji)</label>
                    <input type="text" class="skill-icon" data-index="${i}" value="${esc(s.icon)}">
                </div>
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" class="skill-title" data-index="${i}" value="${esc(s.title)}">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="skill-description" data-index="${i}">${esc(s.description)}</textarea>
            </div>
        </div>`;
    });
    html += '<button class="btn-add" onclick="addSkill()">+ Ajouter une compétence</button>';
    container.innerHTML = html;
}

function addSkill() {
    siteData.skills.push({ icon: '🔧', title: 'Nouvelle Compétence', description: 'Description...' });
    renderSkills(document.getElementById('adminContent'));
}

function removeSkill(index) {
    siteData.skills.splice(index, 1);
    renderSkills(document.getElementById('adminContent'));
}

// ========== PROJECTS SECTION ==========
function renderProjects(container) {
    let html = '';
    siteData.projects.forEach((p, i) => {
        html += `
        <div class="admin-card">
            <div class="card-header">
                <h3>Projet ${p.number} - ${esc(p.title)}</h3>
                <button class="btn-remove" onclick="removeProject(${i})">Supprimer</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Numéro</label>
                    <input type="text" class="project-number" data-index="${i}" value="${esc(p.number)}">
                </div>
                <div class="form-group">
                    <label>Icône (emoji)</label>
                    <input type="text" class="project-icon" data-index="${i}" value="${esc(p.icon)}">
                </div>
            </div>
            <div class="form-group">
                <label>Image</label>
                <input type="text" class="project-image" data-index="${i}" value="${esc(p.image)}">
                ${p.image ? `<img src="${esc(p.image)}" class="image-preview" alt="Project">` : ''}
            </div>
            <div class="form-group">
                <label>Titre</label>
                <input type="text" class="project-title" data-index="${i}" value="${esc(p.title)}">
            </div>
            <div class="form-group">
                <label>Lieu & Date</label>
                <input type="text" class="project-location" data-index="${i}" value="${esc(p.location)}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="project-description" data-index="${i}">${esc(p.description)}</textarea>
            </div>
            <div class="form-group">
                <label>Tags (séparés par des virgules)</label>
                <input type="text" class="project-tags" data-index="${i}" value="${(p.tags || []).join(', ')}">
            </div>
        </div>`;
    });
    html += '<button class="btn-add" onclick="addProject()">+ Ajouter un projet</button>';
    container.innerHTML = html;
}

function addProject() {
    const num = String(siteData.projects.length + 1).padStart(2, '0');
    siteData.projects.push({ number: num, icon: '🔧', image: '', title: 'Nouveau Projet', location: '', description: '', tags: [] });
    renderProjects(document.getElementById('adminContent'));
}

function removeProject(index) {
    siteData.projects.splice(index, 1);
    renderProjects(document.getElementById('adminContent'));
}

// ========== GALLERY SECTION ==========
function renderGallery(container) {
    let html = '<div class="admin-card"><h3>Éléments de la Galerie</h3>';
    html += '<div class="admin-gallery-grid">';
    siteData.gallery.forEach((g, i) => {
        const isVideo = g.type === 'video';
        html += `
        <div class="admin-gallery-item">
            ${isVideo
                ? `<video src="${esc(g.image)}" muted preload="metadata"></video>`
                : `<img src="${esc(g.image)}" alt="${esc(g.title)}">`
            }
            <div class="item-info">
                <p class="item-title">${esc(g.title)}</p>
                <p>${esc(g.category)} | ${g.type}</p>
            </div>
            <div class="item-actions">
                <button class="btn-remove" onclick="editGalleryItem(${i})">Modifier</button>
                <button class="btn-remove" onclick="removeGalleryItem(${i})">Supprimer</button>
            </div>
        </div>`;
    });
    html += '</div>';
    html += '<button class="btn-add" onclick="addGalleryItem()">+ Ajouter un élément</button>';
    html += '</div>';

    // Add/Edit form
    html += `
    <div class="admin-card" id="galleryEditCard" style="display:none;">
        <h3 id="galleryEditTitle">Ajouter un élément</h3>
        <div class="form-row">
            <div class="form-group">
                <label>Type</label>
                <select id="galleryType">
                    <option value="image">Image</option>
                    <option value="video">Vidéo</option>
                </select>
            </div>
            <div class="form-group">
                <label>Catégorie</label>
                <select id="galleryCategory">
                    <option value="maintenance">Maintenance</option>
                    <option value="installation">Installation</option>
                    <option value="formation">Formation</option>
                    <option value="video">Vidéo</option>
                    <option value="robotique">Robotique</option>
                    <option value="projets">Projets</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label>Chemin du fichier</label>
            <input type="text" id="galleryImage" placeholder="images/mon-image.jpg">
        </div>
        <div class="form-group">
            <label>Titre</label>
            <input type="text" id="galleryTitle" placeholder="Titre de l'élément">
        </div>
        <button class="btn-save" onclick="saveGalleryItem()" style="width:auto;margin-top:1rem;">Enregistrer</button>
    </div>`;

    container.innerHTML = html;
}

let editingGalleryIndex = -1;

function addGalleryItem() {
    editingGalleryIndex = -1;
    document.getElementById('galleryEditCard').style.display = 'block';
    document.getElementById('galleryEditTitle').textContent = 'Ajouter un élément';
    document.getElementById('galleryType').value = 'image';
    document.getElementById('galleryCategory').value = 'maintenance';
    document.getElementById('galleryImage').value = '';
    document.getElementById('galleryTitle').value = '';
}

function editGalleryItem(index) {
    editingGalleryIndex = index;
    const g = siteData.gallery[index];
    document.getElementById('galleryEditCard').style.display = 'block';
    document.getElementById('galleryEditTitle').textContent = 'Modifier l\'élément';
    document.getElementById('galleryType').value = g.type;
    document.getElementById('galleryCategory').value = g.category;
    document.getElementById('galleryImage').value = g.image;
    document.getElementById('galleryTitle').value = g.title;
}

function saveGalleryItem() {
    const item = {
        type: document.getElementById('galleryType').value,
        category: document.getElementById('galleryCategory').value,
        image: document.getElementById('galleryImage').value,
        title: document.getElementById('galleryTitle').value
    };
    if (!item.image || !item.title) {
        showToast('Veuillez remplir tous les champs', 'error');
        return;
    }
    if (editingGalleryIndex >= 0) {
        siteData.gallery[editingGalleryIndex] = item;
    } else {
        siteData.gallery.push(item);
    }
    saveSiteData(siteData);
    renderGallery(document.getElementById('adminContent'));
    showToast('Élément sauvegardé', 'success');
}

function removeGalleryItem(index) {
    if (confirm('Supprimer cet élément de la galerie ?')) {
        siteData.gallery.splice(index, 1);
        saveSiteData(siteData);
        renderGallery(document.getElementById('adminContent'));
        showToast('Élément supprimé', 'success');
    }
}

// ========== EXPERIENCE SECTION ==========
function renderExperience(container) {
    let html = '';
    siteData.experience.forEach((e, i) => {
        html += `
        <div class="admin-card">
            <div class="card-header">
                <h3>${esc(e.title)}</h3>
                <button class="btn-remove" onclick="removeExperience(${i})">Supprimer</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Titre du poste</label>
                    <input type="text" class="exp-title" data-index="${i}" value="${esc(e.title)}">
                </div>
                <div class="form-group">
                    <label>Période</label>
                    <input type="text" class="exp-year" data-index="${i}" value="${esc(e.year)}">
                </div>
            </div>
            <div class="form-group">
                <label>Entreprise</label>
                <input type="text" class="exp-company" data-index="${i}" value="${esc(e.company)}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="exp-description" data-index="${i}">${esc(e.description)}</textarea>
            </div>
        </div>`;
    });
    html += '<button class="btn-add" onclick="addExperience()">+ Ajouter une expérience</button>';
    container.innerHTML = html;
}

function addExperience() {
    siteData.experience.push({ title: 'Nouveau Poste', company: '', year: '', description: '' });
    renderExperience(document.getElementById('adminContent'));
}

function removeExperience(index) {
    siteData.experience.splice(index, 1);
    renderExperience(document.getElementById('adminContent'));
}

// ========== STATS SECTION ==========
function renderStats(container) {
    let html = '<div class="admin-card"><h3>Statistiques du Site</h3>';
    siteData.stats.forEach((s, i) => {
        html += `
        <div class="form-row" style="margin-bottom:1rem;align-items:end;">
            <div class="form-group" style="margin-bottom:0">
                <label>Valeur ${i + 1}</label>
                <input type="number" class="stat-target" data-index="${i}" value="${s.target}">
            </div>
            <div class="form-group" style="margin-bottom:0">
                <label>Label</label>
                <input type="text" class="stat-label" data-index="${i}" value="${esc(s.label)}">
            </div>
        </div>`;
    });
    html += '<button class="btn-add" onclick="addStat()">+ Ajouter une statistique</button>';
    html += '</div>';
    container.innerHTML = html;
}

function addStat() {
    siteData.stats.push({ target: 0, label: 'Nouveau' });
    renderStats(document.getElementById('adminContent'));
}

// ========== SAVE LOGIC ==========
function saveCurrentSection() {
    collectCurrentData();
    if (saveSiteData(siteData)) {
        showToast('Données sauvegardées avec succès !', 'success');
    } else {
        showToast('Erreur lors de la sauvegarde', 'error');
    }
}

function collectCurrentData() {
    switch (currentSection) {
        case 'profile':
            siteData.profile.name = val('profileName');
            siteData.profile.title = val('profileTitle');
            siteData.profile.description = val('profileDescription');
            siteData.profile.quote = val('profileQuote');
            siteData.profile.heroImage = val('profileHeroImage');
            siteData.profile.aboutImage = val('profileAboutImage');
            siteData.profile.contactImage = val('profileContactImage');
            siteData.profile.phone = val('profilePhone');
            siteData.profile.email = val('profileEmail');
            siteData.profile.linkedin = val('profileLinkedin');
            siteData.profile.linkedinName = val('profileLinkedinName');
            siteData.profile.location = val('profileLocation');
            break;

        case 'about':
            document.querySelectorAll('.about-paragraph').forEach((el, i) => {
                siteData.about.paragraphs[i] = el.value;
            });
            break;

        case 'formation':
            document.querySelectorAll('.formation-year').forEach((el, i) => {
                siteData.formation[i].year = el.value;
            });
            document.querySelectorAll('.formation-school').forEach((el, i) => {
                siteData.formation[i].school = el.value;
            });
            document.querySelectorAll('.formation-degree').forEach((el, i) => {
                siteData.formation[i].degree = el.value;
            });
            document.querySelectorAll('.formation-description').forEach((el, i) => {
                siteData.formation[i].description = el.value;
            });
            document.querySelectorAll('.formation-items').forEach((el, i) => {
                siteData.formation[i].items = el.value.split('\n').filter(x => x.trim());
            });
            break;

        case 'skills':
            document.querySelectorAll('.skill-icon').forEach((el, i) => {
                siteData.skills[i].icon = el.value;
            });
            document.querySelectorAll('.skill-title').forEach((el, i) => {
                siteData.skills[i].title = el.value;
            });
            document.querySelectorAll('.skill-description').forEach((el, i) => {
                siteData.skills[i].description = el.value;
            });
            break;

        case 'projects':
            document.querySelectorAll('.project-number').forEach((el, i) => {
                siteData.projects[i].number = el.value;
            });
            document.querySelectorAll('.project-icon').forEach((el, i) => {
                siteData.projects[i].icon = el.value;
            });
            document.querySelectorAll('.project-image').forEach((el, i) => {
                siteData.projects[i].image = el.value;
            });
            document.querySelectorAll('.project-title').forEach((el, i) => {
                siteData.projects[i].title = el.value;
            });
            document.querySelectorAll('.project-location').forEach((el, i) => {
                siteData.projects[i].location = el.value;
            });
            document.querySelectorAll('.project-description').forEach((el, i) => {
                siteData.projects[i].description = el.value;
            });
            document.querySelectorAll('.project-tags').forEach((el, i) => {
                siteData.projects[i].tags = el.value.split(',').map(t => t.trim()).filter(Boolean);
            });
            break;

        case 'experience':
            document.querySelectorAll('.exp-title').forEach((el, i) => {
                siteData.experience[i].title = el.value;
            });
            document.querySelectorAll('.exp-company').forEach((el, i) => {
                siteData.experience[i].company = el.value;
            });
            document.querySelectorAll('.exp-year').forEach((el, i) => {
                siteData.experience[i].year = el.value;
            });
            document.querySelectorAll('.exp-description').forEach((el, i) => {
                siteData.experience[i].description = el.value;
            });
            break;

        case 'stats':
            document.querySelectorAll('.stat-target').forEach((el, i) => {
                siteData.stats[i].target = parseInt(el.value) || 0;
            });
            document.querySelectorAll('.stat-label').forEach((el, i) => {
                siteData.stats[i].label = el.value;
            });
            break;
    }
}

// Utility functions
function val(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
