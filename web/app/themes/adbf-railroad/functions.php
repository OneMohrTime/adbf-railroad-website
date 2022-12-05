<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
    require_once $composer_autoload;
    $timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

    add_action(
        'admin_notices',
        function() {
            echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
        }
    );

    add_filter(
        'template_include',
        function( $template ) {
            return get_stylesheet_directory() . '/src/no-timber.html';
        }
    );
    return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
    /** Add timber support. */
    public function __construct() {
        add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
        add_filter( 'timber/context', array( $this, 'add_to_context' ) );
        add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
        add_action( 'init', array( $this, 'register_post_types' ) );
        add_action( 'init', array( $this, 'register_taxonomies' ) );
        // add_action( 'init', array( $this, 'add_acf_fields' ) );
        add_action( 'init', array( $this, 'disable_emojis' ) );
        add_filter( 'wpseo_metabox_prio', array( $this, 'yoast_to_bottom' ) );
        add_action( 'acf/init', array( $this, 'acf_api_update' ) );
        // add_filter('acf/fields/google_map/api', array( $this, 'my_acf_google_map_api' ) );
        parent::__construct();
    }

    /**
     * This is where you can register custom post types
     */
    public function register_post_types() {
    }

    /**
     * This is where you can register custom taxonomies
     */
    public function register_taxonomies() {
    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context( $context ) {
        $context['site']    = $this;
        $context['menu']    = new Timber\Menu('primary');
        $context['sidebar'] = new Timber\Menu('sidebar');
        return $context;
    }

    /**
     * Disable the emoji's
     */
    public function disable_emojis() {
        remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
        remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
        remove_action( 'wp_print_styles', 'print_emoji_styles' );
        remove_action( 'admin_print_styles', 'print_emoji_styles' );
        remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
        remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
        remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
        add_filter( 'wp_resource_hints', function( $urls ) {

            foreach ($urls as $key => $url) {
                // Remove dns-prefetch for w.org (we really don't need it)
                // See https://core.trac.wordpress.org/ticket/40426 for details
                if ( 'https://s.w.org/images/core/emoji/13.0.0/svg/' === $url ) {
                    unset( $urls[ $key ] );
                }
            }

            return $urls;
        } );
    }

    /**
     * Move Yoast to bottom
     */
    public function yoast_to_bottom() {
        return 'low';
    }

    /**
     * Add Google Maps API
     */
    // public function my_acf_google_map_api( $api ){
    //     $api['key'] = '';
    //     return $api;
    // }
    public function acf_api_update() {
        acf_update_setting('google_api_key', '');
    }

    public function theme_supports() {
        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        /**
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support( 'title-tag' );

        /**
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support( 'post-thumbnails' );

        /**
         * Enable the use of a custom logo in your theme.
         *
         * @link https://developer.wordpress.org/themes/functionality/custom-logo/
         */
        add_theme_support( 'custom-logo' );

        /**
         * Supports editor style in page & post editor backend
         *
         * @link https://developer.wordpress.org/reference/functions/add_editor_style/
         */
        add_editor_style( 'css/editor-style.css' );

        /**
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'gallery',
                'caption',
            )
        );

        add_theme_support( 'menus' );
    }

    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension.
     */
    public function add_to_twig( $twig ) {
        $twig->addExtension( new Twig\Extension\StringLoaderExtension() );
        $twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
        return $twig;
    }

}

new StarterSite();
