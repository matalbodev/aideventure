#!/bin/bash

set -e

cd /var/www/html

# Attente de la base de données
echo "⏳ Attente de la base de données sur $WORDPRESS_DB_HOST..."
until wp db check --allow-root > /dev/null 2>&1; do
    echo "⏳ Attente de la base de données..."
    sleep 2
done
echo "✅ MySQL est prêt."

# Télécharger WordPress si le dossier est vide
if [ ! -f wp-load.php ]; then
    echo "⬇️ Téléchargement de WordPress..."
    wp core download --allow-root
else
    echo "📦 WordPress déjà présent, téléchargement ignoré."
fi

# Générer wp-config.php si nécessaire
if [ ! -f wp-config.php ]; then
    echo "⚙️ Génération de wp-config.php..."
    wp config create \
      --dbname="$WORDPRESS_DB_NAME" \
      --dbuser="$WORDPRESS_DB_USER" \
      --dbpass="$WORDPRESS_DB_PASSWORD" \
      --dbhost="$WORDPRESS_DB_HOST" \
      --dbprefix="$WORDPRESS_TABLE_PREFIX" \
      --skip-check \
      --allow-root
else
    echo "🔧 Fichier wp-config.php déjà présent."
fi

# Installation de WordPress si nécessaire
if ! wp core is-installed --allow-root; then
    echo "🛠️ Installation de WordPress..."
    wp core install \
      --url="http://localhost:8080" \
      --title="Aideventure" \
      --admin_user=admin \
      --admin_password=admin \
      --admin_email=admin@example.com \
      --allow-root
else
    echo "✅ WordPress déjà installé."
fi

# Lancer le serveur Apache
echo "🚀 Lancement du serveur Apache..."
exec docker-entrypoint.sh apache2-foreground
