<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/templates/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();

$galleries = array(
    'post_type' => 'photo_album',
    'posts_per_page' => -1,
    // 'orderby' => array(
    //     'date' => 'DESC'
    // )
);

$timber_post          = new Timber\Post();
$context['post']      = $timber_post;
$context['posts']     = new Timber\PostQuery();
$context['galleries'] = Timber::get_posts($galleries);
$templates            = array( '_views/page-' . $timber_post->post_name . '.twig', '_layouts/page.twig' );

if ( is_front_page() ) {
    array_unshift( $templates, '_views/front-page.twig' );
}

Timber::render( $templates, $context );
