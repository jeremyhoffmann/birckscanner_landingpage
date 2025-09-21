#!/bin/bash

# Script pour lancer un serveur web local pour tester la landing page
# Usage: bash serve-local.sh

echo "🚀 Démarrage du serveur local sur http://localhost:8000"
echo "📁 Dossier servi: $(pwd)"
echo "⚡ Appuyez sur Ctrl+C pour arrêter"
echo ""

# Vérifier si Python 3 est disponible
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Sinon essayer Python 2
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
# Sinon essayer Node.js
elif command -v npx &> /dev/null; then
    npx http-server -p 8000
else
    echo "❌ Erreur: Python ou Node.js requis pour lancer le serveur"
    echo "💡 Installez Python 3 ou Node.js pour utiliser ce script"
    exit 1
fi