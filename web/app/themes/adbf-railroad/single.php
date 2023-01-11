<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;

if ( post_password_required( $timber_post->ID ) ) {
    Timber::render( '_layouts/single-password.twig', $context );
} else {
    Timber::render( array(
        '_layouts/single-' . $timber_post->ID . '.twig',
        '_layouts/single-' . $timber_post->post_type . '.twig',
        '_layouts/single-' . $timber_post->category->slug . '.twig',
        '_layouts/single-' . $timber_post->slug . '.twig',
        '_layouts/single.twig'
    ), $context );
}
