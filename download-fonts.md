# Anleitung zum Herunterladen der Schriftarten

Diese Anleitung erklärt, wie Sie die benötigten Schriftdateien für die AB-Performance-Website herunterladen und installieren können.

## Schritt 1: Google Webfonts Helper aufrufen

Besuchen Sie die Website [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts).

## Schritt 2: Montserrat-Schriftart herunterladen

1. Suchen Sie nach "Montserrat" im Suchfeld.
2. Wählen Sie die Schriftart "Montserrat" aus den Suchergebnissen aus.
3. Wählen Sie die folgenden Schriftschnitte aus:
   - 300 (Light)
   - 400 (Regular)
   - 500 (Medium)
   - 600 (Semi-Bold)
   - 700 (Bold)
4. Wählen Sie unter "Charsets" die Option "latin" aus.
5. Wählen Sie unter "Styles" die benötigten Schnitte (300, 400, 500, 600, 700) aus.
6. Unter "Copy CSS" wählen Sie den "Modern Browsers"-Tab aus.
7. Klicken Sie auf "Download files" und speichern Sie die ZIP-Datei.
8. Entpacken Sie die heruntergeladenen Dateien.
9. Kopieren Sie alle WOFF- und WOFF2-Dateien in den Ordner `fonts/montserrat/` im Projekt.

## Schritt 3: Playfair Display-Schriftart herunterladen

1. Gehen Sie zurück zu [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts).
2. Suchen Sie nach "Playfair Display" im Suchfeld.
3. Wählen Sie die Schriftart "Playfair Display" aus den Suchergebnissen aus.
4. Wählen Sie die folgenden Schriftschnitte aus:
   - 400 (Regular)
   - 500 (Medium)
   - 700 (Bold)
5. Wählen Sie unter "Charsets" die Option "latin" aus.
6. Wählen Sie unter "Styles" die benötigten Schnitte (400, 500, 700) aus.
7. Unter "Copy CSS" wählen Sie den "Modern Browsers"-Tab aus.
8. Klicken Sie auf "Download files" und speichern Sie die ZIP-Datei.
9. Entpacken Sie die heruntergeladenen Dateien.
10. Kopieren Sie alle WOFF- und WOFF2-Dateien in den Ordner `fonts/playfair-display/` im Projekt.

## Schritt 4: Google Fonts-Links entfernen (optional)

Nachdem Sie die lokalen Schriftdateien installiert haben, können Sie die Google Fonts-Links aus den HTML-Dateien entfernen. Suchen Sie in allen HTML-Dateien nach den folgenden Zeilen und entfernen Sie sie:

```html
<!-- Temporärer Google Fonts Link bis lokale Schriftarten verfügbar sind -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;700&display=swap" rel="stylesheet">
```

## Schritt 5: Testen

Öffnen Sie die Website lokal in Ihrem Browser und überprüfen Sie, ob die Schriftarten korrekt angezeigt werden. Die Website sollte jetzt die lokalen Schriftdateien verwenden und keine Verbindung zu Google Fonts herstellen. 