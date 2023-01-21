<?php
/**
 * Template Name: Contact Page
 * Description: A page template for an "Contact Us," or similar.
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
$templates        = array( '_views/page-contact.twig' );

Timber::render( $templates, $context );
