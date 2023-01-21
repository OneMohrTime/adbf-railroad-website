<?php
/**
 * Template Name: About Page
 * Description: A page template for an "About Us," or similar.
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();

$timber_post      = new Timber\Post();
$context['post']  = $timber_post;
$context['posts'] = new Timber\PostQuery();
$templates        = array( '_views/about.twig' );

Timber::render( $templates, $context );
