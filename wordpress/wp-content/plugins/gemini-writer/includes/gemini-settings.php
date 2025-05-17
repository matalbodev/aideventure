<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Ajoute une page de réglages pour la clé API Gemini avec des onglets.
 */
function gemini_api_key_settings_page() {
    add_options_page(
        'Réglages Gemini',
        'Gemini',
        'manage_options',
        'gemini-settings',
        'gemini_api_key_settings_content'
    );
}
add_action('admin_menu', 'gemini_api_key_settings_page');

/**
 * Affiche le contenu de la page de réglages avec des onglets.
 */
function gemini_api_key_settings_content() {
    $active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'dashboard';
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Réglages Gemini', 'gemini-api-key'); ?></h1>

        <h2 class="nav-tab-wrapper">
            <a href="?page=gemini-settings&tab=dashboard" class="nav-tab <?php echo $active_tab == 'dashboard' ? 'nav-tab-active' : ''; ?>">
                <?php esc_html_e('Tableau de bord', 'gemini-api-key'); ?>
            </a>
            <a href="?page=gemini-settings&tab=settings" class="nav-tab <?php echo $active_tab == 'settings' ? 'nav-tab-active' : ''; ?>">
                <?php esc_html_e('Réglages', 'gemini-api-key'); ?>
            </a>
        </h2>

        <form method="post" action="options.php">
            <?php
            if ($active_tab == 'settings') {
                settings_fields('gemini_api_key_settings_group');
                do_settings_sections('gemini-settings'); // Utilisation d'un nouvel slug pour la page
                submit_button();
            } else {
                // Contenu du tableau de bord
                ?>
                <p><?php esc_html_e('Bienvenue sur le tableau de bord des réglages Gemini !', 'gemini-api-key'); ?></p>
                <?php

                // Enqueue et localise le script pour le tableau de bord
                wp_enqueue_script('gemini-dashboard-script', plugins_url('js/gemini-dashboard.js', __FILE__), array('wp-i18n'), filemtime(plugin_dir_path(__FILE__) . 'includes/js/gemini-dashboard.js'), true);
                wp_localize_script(
                    'gemini-dashboard-script',
                    'geminiDashboardData',
                    array(
                        'apiKey' => get_gemini_api_key(),
                        'i18n' => array(
                            'apiKeyLabel' => __('Votre clé API Gemini :', 'gemini-api-key'),
                        ),
                    )
                );

            }
            ?>
        </form>
    </div>
    <?php
}

/**
 * Enregistre les réglages.
 */
function gemini_api_key_register_settings() {
    register_setting(
        'gemini_api_key_settings_group', // Nom du groupe de réglages
        'gemini_api_key',              // Nom de l'option dans la base de données
        'sanitize_text_field'          // Fonction de sanitisation
    );

    add_settings_section(
        'gemini_api_key_section',      // ID de la section
        'Clé API Gemini',              // Titre de la section
        'gemini_api_key_section_info', // Fonction de callback pour la description de la section
        'gemini-settings'             // Utilisation du nouveau slug de page
    );

    add_settings_field(
        'gemini_api_key_field',        // ID du champ
        'Clé API',                    // Label du champ
        'gemini_api_key_field_render', // Fonction de callback pour afficher le champ
        'gemini-settings',             // Utilisation du nouveau slug de page
        'gemini_api_key_section'      // Section à laquelle le champ est ajoutée
    );
}
add_action('admin_init', 'gemini_api_key_register_settings');

/**
 * Affiche la description de la section.
 */
function gemini_api_key_section_info() {
    esc_html_e('Entrez votre clé API Gemini ici.', 'gemini-api-key');
}

/**
 * Affiche le champ de saisie pour la clé API.
 */
function gemini_api_key_field_render() {
    $options = get_option('gemini_api_key');
    ?>
    <input type="text" id="gemini_api_key" name="gemini_api_key" value="<?php echo isset($options) ? esc_attr($options) : ''; ?>" class="regular-text">
    <?php
}

/**
 * Récupère la clé API Gemini.
 *
 * @return string|false La clé API si elle est définie, sinon false.
 */
function get_gemini_api_key() {
    return get_option('gemini_api_key');
}