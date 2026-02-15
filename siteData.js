// Site Data Management System
// Stores all editable content - loads from localStorage if available, falls back to defaults

const DEFAULT_SITE_DATA = {
    profile: {
        name: "KOUASSI Fidèle Madjé Messan",
        title: "Étudiant en Génie Mécanique & Productique",
        description: "Passionné par la robotique, l'automatisation et la conception mécanique. Je transforme des idées en solutions techniques concrètes et optimisées, avec un accent sur l'innovation et l'excellence en ingénierie.",
        heroImage: "images/portrait-fidele-2cit.jpg",
        aboutImage: "images/maintenance-navale-otam-portrait.jpeg",
        contactImage: "images/portrait-fidele-2cit.jpg",
        phone: "+228 93 73 77 98",
        email: "kfidelemadejemessan@gmail.com",
        linkedin: "https://www.linkedin.com/in/fid%C3%A8le-madj%C3%A9-messan-kouassi/",
        linkedinName: "Fidèle Madjé Messan KOUASSI",
        location: "Lomé, Togo",
        quote: "Qui ne tente rien n'a rien"
    },
    about: {
        paragraphs: [
            "Je suis <strong>KOUASSI Fidèle Madjé Messan</strong>, étudiant en génie mécanique avec un fort intérêt pour la conception, la robotique et les solutions d'ingénierie innovantes. Actuellement en deuxième année de Licence, j'ai construit des bases solides en génie mécanique et technologies appliquées.",
            "Passionné par la transformation d'idées en systèmes mécaniques fonctionnels, efficaces et optimisés, mon travail combine précision technique, créativité et résolution de problèmes, avec un accent constant sur les applications du monde réel et le développement durable.",
            "Fort d'expériences variées en conception 3D, usinage, programmation et gestion de projets, j'ambitionne de devenir ingénieur spécialisé dans la robotique et la maintenance industrielle et nucléaire, contribuant ainsi à la modernisation des infrastructures industrielles."
        ]
    },
    formation: [
        {
            year: "2023-2024",
            school: "OBSERVATOIRE PANAFRICAIN (OPEM)",
            degree: "Baccalauréat série E",
            description: "Formation scientifique avec spécialisation en sciences de l'ingénieur, mathématiques et physique appliquée."
        },
        {
            year: "2024-2025",
            school: "ESIG GLOBAL SUCCESS",
            degree: "Licence 1 - Génie Mécanique",
            description: "Introduction aux principes fondamentaux du génie mécanique",
            items: ["Mathématiques de l'ingénieur et physique appliquée", "Statique et mécanique de base", "Dessin technique et CAO", "Science des matériaux", "Procédés de fabrication"]
        },
        {
            year: "2025-2026",
            school: "ESIG GLOBAL SUCCESS",
            degree: "Licence 2 - Génie Mécanique & Productique",
            description: "Développement de compétences en ingénierie appliquée",
            items: ["Conception mécanique avancée (SolidWorks, AutoCAD, Fusion 360)", "Résistance des matériaux et analyse structurelle", "Cinématique et dynamique des mécanismes", "Robotique et automatisation industrielle", "Gestion de projet et leadership"]
        }
    ],
    skills: [
        { icon: "🎨", title: "CAO/CAD", description: "Maîtrise de SolidWorks, AutoCAD, Fusion 360 et Blender pour la modélisation 3D et la conception mécanique avancée." },
        { icon: "⚙️", title: "Robotique & Automatisation", description: "Conception de systèmes robotiques intelligents, automatisation industrielle et programmation Arduino." },
        { icon: "🔧", title: "Fabrication & Usinage", description: "Expertise en impression 3D, soudure, menuiserie, machines CNC et procédés de fabrication mécanique." },
        { icon: "💻", title: "Programmation", description: "Compétences en Python, HTML, Arduino IDE pour l'automatisation et le contrôle de systèmes." },
        { icon: "📊", title: "Maintenance Industrielle", description: "Maintenance mécanique, navale, diagnostic et réparation de systèmes électromécaniques complexes." },
        { icon: "👥", title: "Gestion de Projet", description: "Leadership d'équipe, coordination pluridisciplinaire, planification et livraison de solutions techniques." }
    ],
    projects: [
        {
            number: "01",
            icon: "🤖",
            image: "images/formation-atelier-usinage.jpeg",
            title: "Bras Robotique Industriel",
            location: "ESIG Global Success • Octobre-Novembre 2025",
            description: "Conception et fabrication complète d'un bras robotique industriel pour automatiser les tâches de manipulation. Participation à un concours interuniversitaire de pitch et innovation avec démonstration de compétences en robotique et automatisation.",
            tags: ["Robotique", "Automatisation", "CAO 3D", "Innovation"]
        },
        {
            number: "02",
            icon: "⚡",
            image: "images/equipe-chantier-2cit.jpg",
            title: "Véhicule Électrique Compact",
            location: "ESIG Global Success • Mai 2025",
            description: "Chef de projet pour la conception et fabrication d'un véhicule électrique compact dédié à la logistique interne industrielle. Coordination d'équipe pluridisciplinaire et gestion complète des ressources durant la semaine de professionnalisation.",
            tags: ["Chef de Projet", "Mobilité Électrique", "Leadership", "Logistique"]
        },
        {
            number: "03",
            icon: "⚙️",
            image: "images/installation-echafaudage-2cit.jpg",
            title: "Bobinage de Moteur Asynchrone",
            location: "2CIT Centre d'Innovation • Août 2025",
            description: "Formation approfondie en bobinage et rebobinage de moteurs asynchrones. Réalisation pratique de diagnostics et réparations sur moteurs électriques, avec acquisition de compétences en maintenance et fiabilité des systèmes électromécaniques.",
            tags: ["Électromécanique", "Maintenance", "Moteurs", "Diagnostic"]
        },
        {
            number: "04",
            icon: "🔧",
            image: "images/maintenance-navale-otam-portrait.jpeg",
            title: "Maintenance Navale & Ponts Élévateurs",
            location: "OTAM & 2CIT • Juillet-Août 2024 & Février 2025",
            description: "Travaux de maintenance et mécanique navale chez OTAM (Omnium Togolais Assistance Maritime). Installation et maintenance professionnelle de ponts élévateurs pour ateliers automobiles de concessionnaires. Optimisation des équipements et amélioration de la fiabilité des systèmes.",
            tags: ["Maintenance Navale", "Installation", "Automobile", "Optimisation"]
        }
    ],
    gallery: [
        { image: "images/maintenance-navale-otam-portrait.jpeg", category: "maintenance", title: "Chantier Naval - OTAM Lomé", type: "image" },
        { image: "images/maintenance-navale-otam.jpeg", category: "maintenance", title: "Stage Maintenance Navale - OTAM", type: "image" },
        { image: "images/portrait-fidele-2cit.jpg", category: "installation", title: "Portrait Professionnel - Chantier 2CIT", type: "image" },
        { image: "images/installation-echafaudage-2cit.jpg", category: "installation", title: "Travaux en Hauteur - Échafaudage 2CIT", type: "image" },
        { image: "images/equipe-chantier-2cit.jpg", category: "installation", title: "Équipe de Chantier - 2CIT", type: "image" },
        { image: "images/maintenance-pont-elevateur.jpg", category: "maintenance", title: "Maintenance Pont Élévateur - Atelier Auto", type: "image" },
        { image: "images/formation-atelier-opem-akt.jpeg", category: "formation", title: "Atelier d'Usinage - OPEM & AKT", type: "image" },
        { image: "images/formation-atelier-usinage.jpeg", category: "formation", title: "Formation Pratique - Atelier Mécanique", type: "image" }
    ],
    experience: [
        {
            title: "Chef de Projet",
            company: "ESIG Global Success - Semaine de Professionnalisation",
            year: "Mai 2025",
            description: "Pilotage complet de la conception et fabrication d'un véhicule électrique compact dédié à la logistique interne industrielle. Coordination d'une équipe pluridisciplinaire, gestion des ressources et des délais. Livraison réussie d'un prototype fonctionnel avec présentation technique devant un jury d'experts."
        },
        {
            title: "Stagiaire - Atelier Mécanique",
            company: "Atelier de Fabrication Mécanique - Lomé",
            year: "Oct 2025",
            description: "Réalisation d'opérations d'usinage, soudure et menuiserie. Apprentissage pratique de la fabrication mécanique et suivi des processus de production. Assistance au montage et à la mise en marche de machines CNC avec formation aux standards de sécurité industrielle."
        },
        {
            title: "Stagiaire - Formation Bobinage Moteur",
            company: "2CIT, Centre de Conception et d'Innovation Technologique",
            year: "Août 2025",
            description: "Apprentissage approfondi des techniques de bobinage et rebobinage de moteurs asynchrones. Réalisation pratique de diagnostics et réparations sur moteurs électriques. Acquisition de compétences essentielles en maintenance et fiabilité des systèmes électromécaniques industriels."
        },
        {
            title: "Technicien - Installation & Maintenance",
            company: "2CIT, Centre de Conception et d'Innovation Technologique",
            year: "Fév 2025",
            description: "Installation et maintenance de ponts élévateurs pour ateliers mécaniques de concessionnaires automobiles. Participation à l'optimisation des équipements et à l'amélioration de la fiabilité des systèmes. Application rigoureuse des normes de sécurité et des procédures de maintenance préventive."
        },
        {
            title: "Stagiaire - Chantier Naval",
            company: "OTAM, Omnium Togolais Assistance Maritime",
            year: "Juil-Août 2024",
            description: "Travaux de maintenance et mécanique navale en section mécanique. Participation active aux opérations de réparation et d'entretien des équipements maritimes. Acquisition d'une expérience précieuse en maintenance industrielle dans un environnement maritime exigeant."
        }
    ],
    stats: [
        { target: 5, label: "Projets Réalisés" },
        { target: 15, label: "Technologies Maîtrisées" },
        { target: 8, label: "Logiciels CAO/DAO" },
        { target: 5, label: "Stages & Expériences" }
    ]
};

// Load site data from localStorage or use defaults
function loadSiteData() {
    try {
        const stored = localStorage.getItem('portfolioSiteData');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Deep merge to handle new default fields
            return deepMerge(DEFAULT_SITE_DATA, parsed);
        }
    } catch (e) {
        console.warn('Error loading site data from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
}

// Save site data to localStorage
function saveSiteData(data) {
    try {
        localStorage.setItem('portfolioSiteData', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving site data:', e);
        return false;
    }
}

// Reset site data to defaults
function resetSiteData() {
    localStorage.removeItem('portfolioSiteData');
    return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
}

// Deep merge utility
function deepMerge(target, source) {
    const result = JSON.parse(JSON.stringify(target));
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key]) {
                result[key] = deepMerge(target[key], source[key]);
            } else {
                result[key] = JSON.parse(JSON.stringify(source[key]));
            }
        }
    }
    return result;
}
