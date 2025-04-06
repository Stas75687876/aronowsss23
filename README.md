# AB-Performance Website

Eine moderne, luxuriöse Website für AB-Performance - Spezialist für hochwertige Chiptuning-Lösungen, Soundoptimierungen und DSG-Optimierungen.

![AB-Performance Website](screenshot.png)

## Funktionen

- Modernes, responsives Design mit dunklem Farbschema und goldenen Akzenten
- Animierte UI-Elemente mit GSAP (GreenSock Animation Platform)
- Interaktive Projektgalerie mit Filteroptionen und Lightbox-Effekt
- Kontaktformular mit E-Mail-Integration
- Google Maps-Integration
- Node.js Backend mit Express
- Responsive auf allen Geräten (Desktop, Tablet, Smartphone)

## Technologie-Stack

### Frontend
- HTML5 & CSS3
- Tailwind CSS für Styling
- JavaScript (ES6+)
- GSAP für Animationen

### Backend
- Node.js mit Express.js
- MongoDB (vorbereitet, aber nicht implementiert)
- Nodemailer für E-Mail-Funktionalität

### Build-Tools
- Webpack für Asset-Bundling
- Babel für JavaScript-Kompatibilität

## Installation

1. Repository klonen:
```bash
git clone https://github.com/yourusername/ab-performance-website.git
cd ab-performance-website
```

2. Dependencies installieren:
```bash
npm install
```

3. Umgebungsvariablen einrichten:
Erstellen Sie eine `.env`-Datei im Hauptverzeichnis mit folgenden Variablen:
```
PORT=3000
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=website@ab-performance.rocks
EMAIL_TO=info@ab-performance.rocks
```

4. Server starten:
```bash
npm run dev
```

5. Öffnen Sie die Website im Browser unter:
```
http://localhost:3000
```

## Projektstruktur

```
ab-performance-website/
├── index.html              # Hauptseite
├── styles.css              # CSS-Styling
├── main.js                 # Frontend JavaScript
├── server.js               # Express-Server
├── package.json            # Projekt-Konfiguration
├── .env                    # Umgebungsvariablen (ignoriert durch Git)
├── images/                 # Bilddateien
│   ├── about-us.jpg
│   ├── chiptuning.jpg
│   ├── soundoptimierung.jpg
│   ├── dsg-optimierung.jpg
│   ├── ab-performance-logo.png
│   ├── partner-logos/      # Partner-Logos
│   ├── projects/           # Projektbilder
│   └── testimonials/       # Kundenbilder
├── videos/                 # Videodateien
│   └── hero-background.mp4
└── README.md               # Projekt-Dokumentation
```

## Development

### Frontend-Entwicklung

Die Website verwendet Tailwind CSS für das Styling und GSAP für Animationen. Die UI-Komponenten befinden sich in der `index.html`-Datei.

So fügen Sie neue Projekte hinzu:
1. Fügen Sie ein neues Bild in den `images/projects/`-Ordner ein
2. Fügen Sie ein neues Projekt zum Array in der Funktion `initProjectGallery()` in `main.js` hinzu

### Backend-Entwicklung

Die serverseitige Logik befindet sich in `server.js`. Um neue API-Endpunkte hinzuzufügen:

1. Erstellen Sie eine neue Route in `server.js`
2. Implementieren Sie die entsprechende Funktion
3. Rufen Sie die API vom Frontend aus auf

## Produktion

Für die Produktionsumgebung:

1. Build erstellen:
```bash
npm run build
```

2. Server starten:
```bash
npm start
```

## Lizenz

MIT

## Anpassungsanleitung

### Farben ändern

Farben können in der Datei `styles.css` unter den CSS-Variablen angepasst werden:

```css
:root {
  --color-black: #0a0a0a;
  --color-darkgray: #141414;
  --color-gray: #333333;
  --color-gold: #D4AF37;
  --color-chrome: #E8E8E8;
  --color-white: #FFFFFF;
}
```

### Bilder ersetzen

Ersetzen Sie die Bilder im `images/`-Ordner mit Ihren eigenen. Stellen Sie sicher, dass die Dateien die gleichen Namen haben oder aktualisieren Sie die Verweise im HTML und JavaScript.

### Texte ändern

Texte können direkt in der `index.html`-Datei bearbeitet werden.