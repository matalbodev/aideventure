#!/bin/bash

# Chargement des variables d'environnement
set -a
source .env
set +a

# Optionnel : vérification des dépendances
command -v lftp >/dev/null 2>&1 || { echo >&2 "lftp est requis mais non installé."; exit 1; }

# Création de la commande mirror avec exclusions
EXCLUDES_ARGS=""
for item in $EXCLUDES; do
  EXCLUDES_ARGS="$EXCLUDES_ARGS --exclude-glob $item"
done

echo "📦 Déploiement de $LOCAL_PATH vers $FTP_USER@$FTP_HOST:$FTP_REMOTE_PATH..."

lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<EOF
set ftp:list-options -a
set ssl:verify-certificate no
mirror -R $LOCAL_PATH $FTP_REMOTE_PATH $EXCLUDES_ARGS --parallel=2 --verbose
bye
EOF

echo "✅ Déploiement terminé."
