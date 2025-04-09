@echo off
echo Erstelle Ordnerstruktur für Schriftarten...

if not exist fonts mkdir fonts
if not exist fonts\montserrat mkdir fonts\montserrat
if not exist fonts\playfair-display mkdir fonts\playfair-display

echo Ordnerstruktur erfolgreich erstellt!
echo.

echo Gehe zu Google Webfonts Helper, um die Schriftarten herunterzuladen...
echo Bitte beachten Sie die Anleitung in der download-fonts.md Datei.
echo.

echo Öffne die Anleitung in deinem Standard-Markdown-Viewer oder Browser...
start download-fonts.md

echo.
echo Drücke eine beliebige Taste, um den Browser mit Google Webfonts Helper zu öffnen...
pause > nul
start https://google-webfonts-helper.herokuapp.com/fonts

echo.
echo Wenn Sie fertig sind, kopieren Sie die heruntergeladenen Schriftdateien in die entsprechenden Ordner:
echo - WOFF- und WOFF2-Dateien für Montserrat in: fonts\montserrat\
echo - WOFF- und WOFF2-Dateien für Playfair Display in: fonts\playfair-display\
echo.

echo Drücke eine beliebige Taste, um dieses Fenster zu schließen...
pause > nul 