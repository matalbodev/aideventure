<?php
/**
 * Plugin Name: Gemini writer
 * Plugin URI: https://example.com/
 * Description: Test
 * Version: 1.0.0
 * Author: Mathieu Alboré
 * Author URI: https://example.com
 */

// Empêcher l'accès direct au fichier
if (!defined('ABSPATH')) {
    exit;
}

// Inclure le fichier contenant les fonctions du plugin
require_once plugin_dir_path(__FILE__) . 'includes/gemini-settings.php';