/**
 * AB-Performance Website JavaScript
 * Mit GSAP Animationen und interaktiven Elementen
 */

// Warten, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
    // Preloader komplett entfernen
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Header-Bild-Animation (dunkel zu hell)
    animateHeaderImage();
    
    // GSAP Animationen initialisieren
    initAnimations();
    
    // Header-Animation verbessern
    animateHeader();
    
    // Interaktive Elemente initialisieren
    initInteractions();
    
    // Projekt-Gallery initialisieren
    initProjectGallery();
    
    // Testimonial-Slider initialisieren
    initTestimonialSlider();
    
    // Partner-Slideshow initialisieren
    initPartnerSlideshow();
    
    // Sprachschalter initialisieren
    initLanguageSwitch();
    
    // Google Maps initialisieren (deaktiviert)
    window.initMap = initMap;
});

// Header-Bild-Animation (dunkel zu hell)
function animateHeaderImage() {
    const headerImg = document.querySelector('#home img');
    const overlay = document.querySelector('#home div[style*="background-color: rgba(0,0,0,0.5)"]');
    
    if (headerImg && overlay) {
        // Bild initial dunkler machen
        gsap.set(headerImg, { filter: 'brightness(0.3)' });
        gsap.set(overlay, { backgroundColor: 'rgba(0,0,0,0.8)' });
        
        // Animation, die das Bild heller werden lässt
        gsap.to(headerImg, {
            filter: 'brightness(1)',
            duration: 2.5,
            ease: "power2.out",
            delay: 0.5
        });
        
        // Overlay gleichzeitig transparenter machen
        gsap.to(overlay, {
            backgroundColor: 'rgba(0,0,0,0.5)',
            duration: 2.5,
            ease: "power2.out",
            delay: 0.5
        });
    }
}

// Verbesserte Header-Animationen
function animateHeader() {
    // Eleganter Hover-Effekt für Navigationslinks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, { y: -2, duration: 0.3, ease: "power2.out" });
            
            // Finden und animieren des goldenen Punkts vor dem Link
            const navItem = this.closest('.nav-item');
            if (navItem) {
                gsap.to(this.querySelector('::before'), { 
                    scale: 1.5, 
                    duration: 0.3, 
                    ease: "back.out(1.7)" 
                });
            }
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, { y: 0, duration: 0.3, ease: "power2.out" });
            
            // Zurücksetzen der Animation
            const navItem = this.closest('.nav-item');
            if (navItem) {
                gsap.to(this.querySelector('::before'), { 
                    scale: 1, 
                    duration: 0.3, 
                    ease: "power2.out" 
                });
            }
        });
    });
    
    // Button Hover-Animation verbessern
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, { 
                scale: 1.05, 
                duration: 0.3, 
                ease: "back.out(1.5)" 
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, { 
                scale: 1, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });
}

// GSAP Scroll-Animationen initialisieren
function initAnimations() {
    // Header-Effekt beim Scrollen
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            gsap.to(header, {
                backgroundColor: 'rgba(10, 10, 10, 0.95)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                duration: 0.3
            });
        } else {
            header.classList.remove('scrolled');
            gsap.to(header, {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                duration: 0.3
            });
        }
    });

    // ScrollTrigger für Sektionen initialisieren
    gsap.registerPlugin(ScrollTrigger);

    // Selektiver Ansatz: Nur Elemente unsichtbar machen, die wir animieren werden
    // Vermeidung der Teambereich-Texte und Reduktion des Scopes
    gsap.set('#ueber-uns .section-title, .values-card, .partner-logo', {
        opacity: 0,
        y: 30
    });

    // Separate Behandlung für Service Cards zur Vermeidung von Scrollbars
    document.querySelectorAll('.service-card').forEach((card) => {
        // Nicht den gesamten Card-Container unsichtbar machen, sondern nur bestimmte Elemente
        const title = card.querySelector('h3');
        const text = card.querySelectorAll('p');
        const list = card.querySelectorAll('ul li');
        
        if (title) gsap.set(title, { opacity: 0, y: 20 });
        if (text.length) gsap.set(text, { opacity: 0, y: 20 });
        if (list.length) gsap.set(list, { opacity: 0, y: 20 });
    });

    // Über Uns Sektion
    gsap.from('#ueber-uns .section-title', {
        scrollTrigger: {
            trigger: '#ueber-uns',
            start: 'top 80%',
            toggleActions: 'play none none none',
            markers: false
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // Die Team-Texte nicht animieren, nur die Bilder
    // Animation für das Team-Bild
    const teamContainer = document.querySelector('#ueber-uns .relative');
    if (teamContainer) {
        gsap.from(teamContainer, {
            scrollTrigger: {
                trigger: teamContainer,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Performance-Indikator ist bereits im Container und wird mit animiert
        const badge = teamContainer.querySelector('.performance-indicator');
        if (badge) {
            gsap.from(badge, {
                scrollTrigger: {
                    trigger: badge,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                scale: 0.7,
                opacity: 0,
                delay: 0.2,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }
    }

    gsap.from('.image-frame', {
        scrollTrigger: {
            trigger: '.image-frame',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from('.values-card', {
        scrollTrigger: {
            trigger: '.values-card',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Partner-Logo Animation verbessert
    const partnerSection = document.querySelector('.partner-container');
    if (partnerSection) {
        // Mache die Partner-Logos zunächst unsichtbar
        gsap.set('.partner-logo', { opacity: 0, y: 30 });
        
        // Animiere sie, wenn die Sektion wirklich sichtbar ist
        gsap.from('.partner-logo', {
            scrollTrigger: {
                trigger: partnerSection,
                start: 'top 75%',
                toggleActions: 'play none none reset'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    // Leistungen Sektion - Überarbeiteter Ansatz für Service Cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const title = card.querySelector('h3');
        const paragraphs = card.querySelectorAll('p');
        const listItems = card.querySelectorAll('ul li');
        const buttons = card.querySelectorAll('.btn-primary, .btn-secondary');
        
        // Animiere die Titel
        if (title) {
            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reset'
                },
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.out"
            });
        }
        
        // Animiere die Textabsätze
        if (paragraphs.length) {
            gsap.to(paragraphs, {
                scrollTrigger: {
                    trigger: paragraphs[0],
                    start: 'top 85%',
                    toggleActions: 'play none none reset'
                },
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "power2.out"
            });
        }
        
        // Animiere die Listeneinträge
        if (listItems.length) {
            gsap.to(listItems, {
                scrollTrigger: {
                    trigger: listItems[0],
                    start: 'top 85%',
                    toggleActions: 'play none none reset'
                },
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
        
        // Animiere die Buttons
        if (buttons.length) {
            gsap.to(buttons, {
                scrollTrigger: {
                    trigger: buttons[0],
                    start: 'top 90%',
                    toggleActions: 'play none none reset'
                },
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.2)"
            });
        }
    });

    // Testimonial-Karten
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reset'
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.2,
            ease: "back.out(1.2)"
        });
    });

    // Projekte Sektion
    gsap.from('.project-filter button', {
        scrollTrigger: {
            trigger: '.project-filter',
            start: 'top 85%',
            toggleActions: 'play none none reset'
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Projekt-Items
    document.querySelectorAll('.project-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reset'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out"
        });
    });

    // Buttons pulsieren lassen
    gsap.to('.btn-primary, .btn-secondary', {
        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.5)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Interaktive Elemente initialisieren
function initInteractions() {
    // Header-Menü-Interaktionen
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && closeMenu && mobileMenu) {
        console.log('Mobile-Menü-Elemente gefunden'); // Debug-Log
        
        menuToggle.addEventListener('click', () => {
            console.log('Menü-Button geklickt');
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            document.body.classList.add('overflow-hidden'); // Scroll verhindern
        });
        
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            document.body.classList.remove('overflow-hidden');
        });
        
        // Mobile-Menü-Links schließen das Menü bei Klick
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                document.body.classList.remove('overflow-hidden');
            });
        });
    } else {
        console.warn('Mobile-Menü-Elemente nicht gefunden!');
    }
    
    // Smooth Scroll für Anker-Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sound-Button Interaktion
    const playButtons = document.querySelectorAll('.play-sound-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hier würde die Audiowiedergabe implementiert
            console.log('Sound abspielen');
            
            // Visuelle Rückmeldung für den Button
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });
    
    // Kontaktformular-Validierung
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Das Standardverhalten nicht mehr verhindern, damit das Formular an FormSubmit gesendet wird
            // Stattdessen nur visuelle Rückmeldung geben und ggf. clientseitige Validierung durchführen
            
            // Visuelle Animation des Buttons (wird vor dem Submit ausgeführt)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            gsap.to(submitButton, {
                scale: 1.05,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
            
            // Lokale Speicherung der Formularwerte für verbesserte UX falls nötig
            localStorage.setItem('contactName', document.getElementById('name').value);
            localStorage.setItem('contactEmail', document.getElementById('email').value);
            
            // Das Formular wird automatisch gesendet, da wir e.preventDefault() entfernt haben
        });
    }
}

// Projekt-Galerie initialisieren
function initProjectGallery() {
    console.log("Projekte werden initialisiert");
    
    // Statt dynamisch geladener Bilder, statische Platzhalter einfügen
    const projectContainer = document.querySelector('.project-grid');
    if (projectContainer) {
        projectContainer.innerHTML = '';
        
        // 3 Platzhalter für Projekte
        const projectData = [
            {
                title: 'Chiptuning Projekt',
                description: 'Leistungssteigerung & Optimierung',
                imagePath: 'images/projekte/chiptuning-projekt.webp'
            },
            {
                title: 'Soundoptimierung',
                description: 'Pop & Bang Konfiguration',
                imagePath: 'images/projekte/soundoptimierung-projekt.webp'
            },
            {
                title: 'DSG-Tuning',
                description: 'Schaltoptimierung & Launch Control',
                imagePath: 'images/projekte/dsg-tuning-projekt.webp'
            }
        ];
        
        projectData.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            
            // Prüfen ob das Bild existiert, ansonsten Fallback verwenden
            const imgContent = `
                <div class="w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
                    <img src="${project.imagePath}" alt="${project.title}" 
                         class="w-full h-full object-cover"
                         onerror="this.onerror=null; this.src=''; this.parentElement.innerHTML='<div class=\'w-full h-full flex items-center justify-center\'><span class=\'text-gold text-xl\'>${project.title}</span></div>'">
                </div>
            `;
            
            projectElement.innerHTML = `
                ${imgContent}
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-category">${project.description}</p>
                </div>
            `;
            
            projectContainer.appendChild(projectElement);
        });
    }
}

// Testimonial-Slider initialisieren
function initTestimonialSlider() {
    console.log("Testimonials werden initialisiert");
    
    // Testimonial-Container auswählen
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (testimonialContainer) {
        testimonialContainer.innerHTML = '';
        
        // Container für Testimonials
        const testimonialWrapper = document.createElement('div');
        testimonialWrapper.className = 'grid grid-cols-1 md:grid-cols-3 gap-6';
        
        // Bewertungen der Kunden mit echten Daten
        const testimonials = [
            {
                name: "Ates Nurettin",
                text: "Super Service und exzellente Arbeit! Die Beratung war kompetent, und das Ergebnis hat meine Erwartungen übertroffen. Hier ist man mit seinem Auto in den besten Händen. Klare Empfehlung!"
            },
            {
                name: "Bastian Lueb",
                text: "Sehr positive Erfahrung gemacht!! Service und Leistung 1+ mit Sternchen nur weiter zu empfehlen"
            },
            {
                name: "Hanne Braun",
                text: "Super Service, sehr freundlich. Mein Auto ist nicht wiederzuerkennen. Jeder, der etwas Außergewöhnliches möchte, ist hier bestens beraten."
            }
        ];
        
        // Testimonials erstellen und zum Container hinzufügen
        testimonials.forEach(testimonial => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial-card';
            
            // Initialen für Avatar erstellen
            const initials = testimonial.name.split(' ').map(n => n[0]).join('');
            
            testimonialElement.innerHTML = `
                <div class="flex flex-col items-center mb-4">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-3 border-2 border-gold">
                        <span class="text-gold font-bold text-xl">${initials}</span>
                    </div>
                    <h4 class="testimonial-author font-bold">${testimonial.name}</h4>
                </div>
                <div class="testimonial-quote">
                    <p>${testimonial.text}</p>
                </div>
            `;
            
            testimonialWrapper.appendChild(testimonialElement);
        });
        
        testimonialContainer.appendChild(testimonialWrapper);
    }
}

// Partner-Slideshow Funktionalität
function initPartnerSlideshow() {
    const partnerSlideshows = document.querySelectorAll('.partner-slideshow');
    
    // Für jede Slideshow auf der Seite (könnte mehrere geben)
    partnerSlideshows.forEach(slideshow => {
        const partnerSlides = slideshow.querySelectorAll('.partner-slide');
        const prevButton = slideshow.querySelector('.partner-prev');
        const nextButton = slideshow.querySelector('.partner-next');
        const dots = slideshow.querySelectorAll('.partner-dot');
        
        let currentSlide = 0;
        let slideInterval;
        
        // Funktion zum Anzeigen eines bestimmten Slides
        function showSlide(index) {
            // Verstecke alle Slides
            partnerSlides.forEach(slide => {
                slide.style.display = 'none';
                slide.classList.remove('active');
            });
            
            // Entferne 'active' Klasse von allen Dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Zeige den aktuellen Slide und setze den entsprechenden Dot auf aktiv
            if (partnerSlides[index]) {
                partnerSlides[index].style.display = 'block';
                partnerSlides[index].classList.add('active');
                currentSlide = index;
            }
            
            // Aktiviere den entsprechenden Dot
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
        
        // Automatischer Slideshow-Wechsel
        function startAutoSlide() {
            stopAutoSlide(); // Vorher stoppen, um doppelte Intervalle zu vermeiden
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % partnerSlides.length;
                showSlide(currentSlide);
            }, 5000); // Alle 5 Sekunden wechseln
        }
        
        function stopAutoSlide() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }
        
        // Event-Listener für Prev-Button
        if (prevButton) {
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                stopAutoSlide(); // Stoppe automatischen Wechsel bei manuellem Klick
                currentSlide = (currentSlide - 1 + partnerSlides.length) % partnerSlides.length;
                showSlide(currentSlide);
                startAutoSlide(); // Starte automatischen Wechsel neu
            });
        }
        
        // Event-Listener für Next-Button
        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                stopAutoSlide(); // Stoppe automatischen Wechsel bei manuellem Klick
                currentSlide = (currentSlide + 1) % partnerSlides.length;
                showSlide(currentSlide);
                startAutoSlide(); // Starte automatischen Wechsel neu
            });
        }
        
        // Event-Listener für Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                stopAutoSlide(); // Stoppe automatischen Wechsel bei manuellem Klick
                showSlide(index);
                startAutoSlide(); // Starte automatischen Wechsel neu
            });
        });
        
        // Touch-Swipe-Unterstützung für mobile Geräte
        let touchStartX = 0;
        let touchEndX = 0;
        
        slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimale Swipe-Distanz in Pixeln
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe nach links -> nächster Slide
                stopAutoSlide();
                currentSlide = (currentSlide + 1) % partnerSlides.length;
                showSlide(currentSlide);
                startAutoSlide();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe nach rechts -> vorheriger Slide
                stopAutoSlide();
                currentSlide = (currentSlide - 1 + partnerSlides.length) % partnerSlides.length;
                showSlide(currentSlide);
                startAutoSlide();
            }
        }
        
        // Pause bei Hover
        slideshow.addEventListener('mouseenter', stopAutoSlide);
        slideshow.addEventListener('mouseleave', startAutoSlide);
        
        // Initialisierung - zeige ersten Slide und starte automatischen Wechsel
        if (partnerSlides.length > 0) {
            showSlide(0);
            startAutoSlide();
        }
    });
}

// Google Maps initialisieren (deaktiviert)
function initMap() {
    console.log("Google Maps ist deaktiviert - Platzhalter wird angezeigt");
}

// Sprachschalter-Funktionalität
function initLanguageSwitch() {
    const languageBtns = document.querySelectorAll('.language-btn');
    
    // Sprachdaten
    const translations = {
        'de': {
            'nav-home': 'Home',
            'nav-about': 'Über Uns',
            'nav-services': 'Leistungen',
            'nav-projects': 'Projekte',
            'nav-contact': 'Kontakt',
            'hero-title': 'Maximale <span class="text-gold">Performance</span> für Ihr Fahrzeug',
            'hero-subtitle': 'Premium Chiptuning, Soundoptimierung und DSG-Tuning',
            'btn-services': 'Unsere Leistungen',
            'btn-appointment': 'Termin vereinbaren',
            'section-about': 'Über <span class="text-gold">Uns</span>',
            'section-services': 'Unsere <span class="text-gold">Leistungen</span>',
            'section-projects': 'Unsere <span class="text-gold">Projekte</span>',
            'section-testimonials': 'Was unsere <span class="text-gold">Kunden</span> sagen',
            'section-contact': 'Kontakt <span class="text-gold">aufnehmen</span>',
            'contact-form-title': 'Schreiben Sie uns',
            'contact-details-title': 'Kontaktdetails',
            'newsletter-title': 'Newsletter',
            'newsletter-text': 'Melden Sie sich für unseren Newsletter an, um über Angebote und Neuigkeiten informiert zu werden.',
            'newsletter-button': 'Anmelden',
            'footer-links': 'Schnelllinks',
            'footer-language': 'Sprache',
            'cookie-title': 'Cookie-Hinweis',
            'cookie-text': 'Diese Website verwendet Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten.',
            'cookie-accept': 'Akzeptieren',
            'cookie-decline': 'Ablehnen',
            'cookie-more': 'Mehr erfahren',
            'about-history-title': 'Unsere Geschichte',
            'about-history-1': 'Gründung der Firma B&B Brothers GbR in Kleve am Niederrhein',
            'about-history-2': 'B&B Brothers Umzug in größere Räumlichkeit auf der Siemensstraße 7H',
            'about-history-3': 'Umwandlung der GbR in eine Einzelfirma und Änderung des Firmennamens in AB-Performance',
            'about-goal': 'Unser Ziel ist es, die Leistung und Fahrbarkeit Ihres Fahrzeugs auf ein neues Niveau zu bringen. Mit maßgeschneiderten Lösungen und modernster Technologie bieten wir Ihnen ein Tuningerlebnis, das Ihre Erwartungen übertrifft.',
            'about-partners-title': 'Unsere Partner',
            'about-partners-text': 'Wir setzen auf qualitativ hochwertige Marken in unserem Haus. Inzwischen sind wir Stützpunkthändler & Partner für einige Hersteller geworden:',
            'about-values-title': 'Unsere Werte',
            'about-value-1': 'Höchste Qualität',
            'about-value-2': 'Zuverlässigkeit',
            'about-value-3': 'Exzellenter Kundenservice',
            'about-value-4': 'Leidenschaft für Automobile',
            'service-chip-title': 'Chiptuning',
            'service-chip-text': 'Wir bieten professionelles Chiptuning speziell für VAG-Fahrzeuge (Volkswagen, Audi, Seat, Škoda). Durch präzise ECU-Programmierung optimieren wir Motorleistung, Drehmoment und Ansprechverhalten Ihres Fahrzeugs, während wir die Zuverlässigkeit erhalten.',
            'service-chip-feature-1': 'Leistungssteigerung bis zu 30% bei Benzinmotoren und 25% bei Dieselmotoren',
            'service-chip-feature-2': 'Verbessertes Ansprechverhalten und Gaspedalcharakteristik',
            'service-chip-feature-3': 'Individuelle Anpassung an Ihre Fahranforderungen und verbaute Modifikationen',
            'service-chip-performance': 'Mehr Leistung',
            'service-sound-title': 'Soundoptimierung',
            'service-sound-text': 'Verwandeln Sie den Klang Ihres VAG-Fahrzeugs mit unseren speziell entwickelten "Pop & Bang"-Funktionen und Abgasanlagenoptimierungen. Wir sorgen für ein emotionales Fahrerlebnis mit kraftvollem Motorsound und beeindruckenden Fehlzündungsgeräuschen beim Gaswegnehmen.',
            'service-sound-feature-1': 'Verschiedene Sound-Profile von dezent bis sportlich-aggressiv',
            'service-sound-feature-2': 'Aktivierbare und einstellbare "Pop & Bang"-Funktion',
            'service-sound-feature-3': 'Kompatibel mit Klappenabgasanlagen für maximalen Effekt',
            'service-sound-listen': 'Sound anhören',
            'btn-request': 'Beratung anfragen'
        },
        'en': {
            'nav-home': 'Home',
            'nav-about': 'About Us',
            'nav-services': 'Services',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            'hero-title': 'Maximum <span class="text-gold">Performance</span> for your Vehicle',
            'hero-subtitle': 'Premium Chiptuning, Sound Optimization and DSG Tuning',
            'btn-services': 'Our Services',
            'btn-appointment': 'Make an Appointment',
            'section-about': 'About <span class="text-gold">Us</span>',
            'section-services': 'Our <span class="text-gold">Services</span>',
            'section-projects': 'Our <span class="text-gold">Projects</span>',
            'section-testimonials': 'What our <span class="text-gold">Customers</span> say',
            'section-contact': 'Contact <span class="text-gold">Us</span>',
            'contact-form-title': 'Write to Us',
            'contact-details-title': 'Contact Details',
            'newsletter-title': 'Newsletter',
            'newsletter-text': 'Subscribe to our newsletter to stay informed about offers and news.',
            'newsletter-button': 'Subscribe',
            'footer-links': 'Quick Links',
            'footer-language': 'Language',
            'cookie-title': 'Cookie Notice',
            'cookie-text': 'This website uses cookies to provide you with the best experience on our website.',
            'cookie-accept': 'Accept',
            'cookie-decline': 'Decline',
            'cookie-more': 'Learn More',
            'about-history-title': 'Our History',
            'about-history-1': 'Foundation of B&B Brothers GbR in Kleve am Niederrhein',
            'about-history-2': 'B&B Brothers moved to larger premises on Siemensstraße 7H',
            'about-history-3': 'Transformation of the GbR into a sole proprietorship and change of company name to AB-Performance',
            'about-goal': 'Our goal is to take the performance and driveability of your vehicle to a new level. With customized solutions and state-of-the-art technology, we offer you a tuning experience that exceeds your expectations.',
            'about-partners-title': 'Our Partners',
            'about-partners-text': 'We rely on high-quality brands in our house. We have now become support dealers & partners for some manufacturers:',
            'about-values-title': 'Our Values',
            'about-value-1': 'Highest Quality',
            'about-value-2': 'Reliability',
            'about-value-3': 'Excellent Customer Service',
            'about-value-4': 'Passion for Automobiles',
            'service-chip-title': 'Chip Tuning',
            'service-chip-text': 'We offer professional chip tuning specifically for VAG vehicles (Volkswagen, Audi, Seat, Škoda). Through precise ECU programming, we optimize engine performance, torque, and throttle response of your vehicle while maintaining reliability.',
            'service-chip-feature-1': 'Performance increase of up to 30% for gasoline engines and 25% for diesel engines',
            'service-chip-feature-2': 'Improved throttle response and pedal characteristics',
            'service-chip-feature-3': 'Individual adaptation to your driving requirements and installed modifications',
            'service-chip-performance': 'More Power',
            'service-sound-title': 'Sound Optimization',
            'service-sound-text': 'Transform the sound of your VAG vehicle with our specially developed "Pop & Bang" functions and exhaust system optimizations. We provide an emotional driving experience with powerful engine sound and impressive backfire sounds when releasing the throttle.',
            'service-sound-feature-1': 'Various sound profiles from subtle to sporty-aggressive',
            'service-sound-feature-2': 'Activatable and adjustable "Pop & Bang" function',
            'service-sound-feature-3': 'Compatible with valve exhaust systems for maximum effect',
            'service-sound-listen': 'Listen to Sound',
            'btn-request': 'Request Consultation'
        }
    };
    
    // Funktion zum Ändern der Sprache
    function changeLanguage(lang) {
        // Speichere ausgewählte Sprache im localStorage
        localStorage.setItem('preferred-language', lang);
        
        // Aktualisiere UI-Elemente mit der neuen Sprache
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        // Aktualisiere Klassen für die Sprachbuttons
        languageBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Bei Englisch das lang-Attribut des HTML-Elements ändern
        document.documentElement.lang = lang;
    }
    
    // Event-Listener für Sprachbuttons
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    // Lade gespeicherte Spracheinstellung beim Seitenstart
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
} 