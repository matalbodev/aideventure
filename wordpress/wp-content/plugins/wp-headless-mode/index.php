<?php
/**
 * Plugin Name: Disable Frontend
 * Description: Désactive totalement le front WordPress pour un usage headless.
 * Version: 1.0
 * Author: aideventure
 */

add_action('template_redirect', function () {
    // Laisser passer si c'est une requête REST, admin ou AJAX
    if (
        defined('REST_REQUEST') && REST_REQUEST ||
        is_admin() ||
        (defined('DOING_AJAX') && DOING_AJAX)
    ) {
        return;
    }

    // Autoriser l'accès aux médias (uploads)
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    if (strpos($request_uri, '/wp-content/uploads/') === 0) {
        return;
    }

    // Sinon : interdire l'accès
    wp_die(
        'Ce site utilise un front-end headless. Merci de passer par l\'application officielle.',
        'Accès refusé',
        ['response' => 403]
    );
});
