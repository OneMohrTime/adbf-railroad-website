<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context          = Timber::context();

$news = array(
    'post_type' => 'post',
    'posts_per_page' => -1,
    'cat' => '4',
);

$timber_post      = new Timber\Post();
$context['post']  = $timber_post;
$context['posts'] = new Timber\PostQuery();
$context['news']  = Timber::get_posts($news);
$templates        = array( '_layouts/index.twig' );

if ( is_home() ) {
    array_unshift( $templates, '_views/home.twig' );
}

Timber::render( $templates, $context );
