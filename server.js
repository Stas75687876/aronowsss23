/**
 * AB-Performance Website Server
 * Ein einfacher Express-Server für die AB-Performance Website
 */

// Abhängigkeiten importieren
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Express-App initialisieren
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));

// Hauptroute
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Kontaktformular-Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    
    // Einfache Validierung
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Bitte füllen Sie alle Pflichtfelder aus' 
      });
    }
    
    // Nodemailer-Transporter konfigurieren
    // In der Produktion würden Sie echte SMTP-Anmeldedaten verwenden
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.example.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || 'user@example.com',
        pass: process.env.EMAIL_PASS || 'password'
      }
    });
    
    // E-Mail-Optionen
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'website@ab-performance.rocks',
      to: process.env.EMAIL_TO || 'info@ab-performance.rocks',
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage von der Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Gewünschte Leistung:</strong> ${service || 'Nicht angegeben'}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // E-Mail senden
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.' 
    });
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' 
    });
  }
});

// Projekte-API-Route (für dynamische Projekte)
app.get('/api/projects', (req, res) => {
  // In einer echten Anwendung würde dies Daten aus einer Datenbank abrufen
  const projects = [
    {
      id: 1,
      title: 'Audi RS6 Leistungssteigerung',
      category: 'audi',
      image: 'images/projects/project1.webp',
      description: 'Leistungssteigerung von 600 auf 780 PS'
    },
    {
      id: 2,
      title: 'BMW M4 Competition',
      category: 'bmw',
      image: 'images/projects/project2.webp',
      description: 'Komplettumbau mit 630 PS'
    },
    {
      id: 3,
      title: 'Mercedes-AMG A45S',
      category: 'mercedes',
      image: 'images/projects/project3.webp',
      description: 'Pop & Bang Konfiguration mit 500 PS'
    },
    {
      id: 4,
      title: 'VW Golf 8 R',
      category: 'vw',
      image: 'images/projects/project4.webp',
      description: 'Leistungssteigerung und DSG-Optimierung'
    },
    {
      id: 5,
      title: 'Audi RS3 Soundoptimierung',
      category: 'audi',
      image: 'images/projects/project5.webp',
      description: 'Klappenabgasanlage mit Pop & Bang'
    },
    {
      id: 6,
      title: 'BMW M5 Competition',
      category: 'bmw',
      image: 'images/projects/project6.webp',
      description: 'Leistungssteigerung auf 800 PS'
    }
  ];
  
  res.json({ success: true, data: projects });
});

// Newsletter-Anmeldung
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Bitte geben Sie eine E-Mail-Adresse ein' 
      });
    }
    
    // Hier würde in der Produktion die E-Mail-Adresse in einer Datenbank gespeichert werden
    console.log(`Neue Newsletter-Anmeldung: ${email}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Vielen Dank für Ihre Anmeldung zum Newsletter!' 
    });
  } catch (error) {
    console.error('Fehler bei der Newsletter-Anmeldung:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Bei der Anmeldung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' 
    });
  }
});

// 404-Route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
}); 