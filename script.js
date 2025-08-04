// Navigation mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling pour les liens de navigation
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

// Animation de la navbar au scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Animation des éléments au scroll avec Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.feature-card, .stat-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Particules de pluie bleu clair et vert
function createRainParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const rainCount = 80; // Plus de gouttes pour un effet pluie dense
    const occupiedPositions = new Set(); // Pour éviter les chevauchements
    
    for (let i = 0; i < rainCount; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain-drop';
        
        // Position aléatoire avec vérification des chevauchements
        let x, y;
        let attempts = 0;
        const maxAttempts = 50;
        
        do {
            x = Math.random() * 100;
            y = Math.random() * 100;
            const positionKey = `${Math.floor(x/3)}-${Math.floor(y/3)}`; // Grille plus fine pour plus de gouttes
            attempts++;
            
            if (!occupiedPositions.has(positionKey)) {
                occupiedPositions.add(positionKey);
                break;
            }
        } while (attempts < maxAttempts);
        
        rainDrop.style.left = x + '%';
        rainDrop.style.top = y + '%';
        rainDrop.style.animationDelay = Math.random() * 2 + 's'; // Délai plus court pour la pluie
        rainDrop.style.animationDuration = (Math.random() * 0.8 + 1.2) + 's'; // Vitesse de chute plus rapide
        rainDrop.style.opacity = Math.random() * 0.5 + 0.3; // Opacité plus visible
        rainDrop.style.width = (Math.random() * 2 + 1) + 'px'; // Gouttes fines
        rainDrop.style.height = (Math.random() * 20 + 15) + 'px'; // Gouttes plus allongées
        
        container.appendChild(rainDrop);
    }
}

// Éléments naturels avec animations modernes
function createNatureElements() {
    const sections = document.querySelectorAll('section');
    const natureEmojis = ['🌳', '🌿', '🌸', '💧', '🍃', '🌲', '🌱', '🌺', '🌻', '🍀'];
    const occupiedPositions = new Set(); // Pour éviter les chevauchements
    
    sections.forEach((section, sectionIndex) => {
        // Réduire le nombre d'éléments pour éviter l'encombrement
        const elementCount = Math.min(3, Math.floor(Math.random() * 2) + 2);
        
        for (let i = 0; i < elementCount; i++) {
            const element = document.createElement('div');
            element.className = 'nature-decoration';
            element.innerHTML = natureEmojis[Math.floor(Math.random() * natureEmojis.length)];
            
            // Positionnement avec grille plus précise pour éviter les chevauchements
            let x, y;
            let attempts = 0;
            const maxAttempts = 20;
            
            do {
                // Utiliser une grille de 10% pour un meilleur espacement
                x = Math.floor(Math.random() * 10) * 10;
                y = Math.floor(Math.random() * 10) * 10;
                const positionKey = `${sectionIndex}-${Math.floor(x/10)}-${Math.floor(y/10)}`;
                attempts++;
                
                if (!occupiedPositions.has(positionKey)) {
                    occupiedPositions.add(positionKey);
                    break;
                }
            } while (attempts < maxAttempts);
            
            // Positionner l'élément
            element.style.left = x + '%';
            element.style.top = y + '%';
            element.style.position = 'absolute';
            
            // Tailles variées
            const sizes = ['tree', 'plant', 'flower', 'rock'];
            const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
            element.classList.add(randomSize);
            
            // Animation delay basé sur la section et l'élément
            element.style.animationDelay = (sectionIndex * 0.5 + i * 0.3) + 's';
            
            section.appendChild(element);
        }
    });
    
    // Faire apparaître les éléments progressivement
    setTimeout(() => {
        const natureElements = document.querySelectorAll('.nature-decoration');
        natureElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0.7';
                element.style.transform = 'scale(1)';
            }, index * 200);
        });
    }, 1000);
}

// Gestion du formulaire de contact
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            content: `Nouveau message de ${formData.get('name')} (${formData.get('email')}):\n\n${formData.get('message')}`
        };
        
        try {
            const response = await fetch('https://discord.com/api/webhooks/1401866763271933952/TcsLS_kxiuJ3xUR77dC6LjzJ24PPi6Zpr9A5TIhOmuii0HqXrZabvwuRaAejz9LfcDAY', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Message envoyé avec succès !');
                contactForm.reset();
            } else {
                alert('Erreur lors de l\'envoi du message.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'envoi du message.');
        }
    });
}

// Initialisation optimisée
document.addEventListener('DOMContentLoaded', () => {
    // Délai pour éviter de surcharger la page
    setTimeout(() => {
        createRainParticles();
        createNatureElements();
    }, 500);
});

// Optimisation des performances - Désactiver les animations sur mobile
if (window.innerWidth <= 768) {
    document.querySelectorAll('.rain-drop, .nature-decoration').forEach(el => {
        el.style.animation = 'none';
    });
} 