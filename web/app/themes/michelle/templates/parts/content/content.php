<?php
/**
 * Template part for displaying posts.
 *
 * @package    Michelle
 * @copyright  WebMan Design, Oliver Juhas
 *
 * @since    1.0.0
 * @version  1.3.0
 */

namespace WebManDesign\Michelle;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

do_action( 'tha_entry_before' );

?>

<article data-id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php do_action( 'tha_entry_top' ); ?>

	<div class="<?php echo esc_attr( Entry\Component::get_entry_class( 'content' ) ); ?>"><?php

		do_action( 'tha_entry_content_before' );

		if ( Entry\Component::is_singular() ) {
			the_content();
		} else {
			the_excerpt();
		}

		do_action( 'tha_entry_content_after' );

	?></div>

	<?php do_action( 'tha_entry_bottom' ); ?>

</article>

<?php

do_action( 'tha_entry_after' );
