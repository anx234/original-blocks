<?php
function my_blocks_render_callback_slider_block( $attributes ){
 
	$wrapper_attributes = get_block_wrapper_attributes();
 
	$args = array(
		'numberposts'	=> $attributes['numberOfItems'],
	);
 
	$output = sprintf( '<div %1$s>', $wrapper_attributes );
 
	$my_posts = get_posts( $args );
 
	if( ! empty( $my_posts ) ){
		$output .= '<div class="wp-block-create-block-slider-block__post-items js-swiper wp-swiper">';
		$output .= '<div class="swiper-wrapper">';
		foreach ( $my_posts as $p ){
 
			$title = $p->post_title ? $p->post_title : __( 'No title', 'my-blocks' );
			$excerpt = get_the_excerpt($p->ID );
			$url = esc_url( get_permalink( $p->ID ) );
			$thumbnail = has_post_thumbnail( $p->ID ) ? get_the_post_thumbnail( $p->ID, 'medium' ) : '';
 
			$output .= '<div class="swiper-slide">';
			$output .= '<figure class="swiper-slide__thumbnail">';
			if( ! empty( $thumbnail ) && $attributes['displayThumbnail'] ){
				$output .= '<a href="' . $url . ' class="wp-block-create-block-slider-block__post-thumbnail-link">' . $thumbnail . '</a>';
			}
			else{
				$output .= '<a href="' . $url . ' class="wp-block-create-block-slider-block__post-thumbnail-link">'.'<img src="' .plugins_url( 'noimage.jpg', __FILE__ ) . '">'. '</a>';
			}
			$output .= '</figure>';

			$output .= '<div class="swiper-slide__content">';
			$output .= '<h3 class="swiper-slide__title">';
			$output .= '<a href="' . $url . '">' . $title . '</a>';
			$output .= '</h3>';
			$output .= '<p class="swiper-slide__text">' . $excerpt . '</p>';
			if( $attributes['displayDate'] ){
				$output .= '<time class="swiper-slide__date" datetime="' . esc_attr( get_the_date( 'c', $p ) ) . '">' . esc_html( get_the_date( '', $p ) ) . '</time>';
			}
			$output .= '</div>';
			$output .= '</div>';
		}
		$output .= '</div>';

		$output .= '<div class="swiper-pagination"></div>';
		$output .= '<div class="swiper-button-prev"></div>';
		$output .= '<div class="swiper-button-next"></div>';

		$output .= '</div>';
	} else {
		$output .= sprintf( '<p>%1$s</p>', __( 'Sorry. No posts matching your criteria!', 'my-blocks' ) );
	}
 
	$output .= '</div>';
 
	return $output;
}
