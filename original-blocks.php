<?php
/**
 * Plugin Name:       Original Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       original-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_original_blocks_block_init() {
    foreach ( glob( plugin_dir_path( __FILE__ ) . 'build/blocks/*' ) as $block ) {
        if ( file_exists( $block . '/index.php' ) ) {
            // Dynamic block
            require_once( $block . '/index.php' );
 
            register_block_type(
                $block,
                array(
                    'render_callback' => 'my_blocks_render_callback_' . str_replace( '-', '_', basename( $block ) ),
                )
            );
 
        } else {
            // Static block
            register_block_type( $block );
        }
    }
}
add_action( 'init', 'create_block_original_blocks_block_init' );


function add_my_slider_scripts_and_styles() {
    $dir = dirname( __FILE__ );
    
    //Swiper の JavaScript ファイルの読み込み（エンキュー）
    wp_enqueue_script( 
      'swiper-slider', 
      plugins_url( '/assets/swiper/swiper.js', __FILE__ ), 
      array(), 
      filemtime( "$dir/assets/swiper/swiper.js" ),
      true
    );
    
    if(! is_admin()) {
      //Swiper を初期化するためのファイルの読み込み（エンキュー）
      wp_enqueue_script( 
        'swiper-slider-init', 
        plugins_url( '/assets/swiper/my-swiper-init.js', __FILE__ ), 
        //依存ファイルに上記 Swiper の JavaScript を指定 
        array('swiper-slider'), 
        filemtime( "$dir/assets/swiper/my-swiper-init.js" ),
        true
      );
    }
   
    //Swiper の CSS ファイルの読み込み（エンキュー）
    wp_enqueue_style(
      'swiper-style',
      plugins_url( '/assets/swiper/swiper.css', __FILE__ ), 
      array(),
      filemtime( "$dir/assets/swiper/swiper.css"  )
    );

   
  }
  add_action('enqueue_block_assets', 'add_my_slider_scripts_and_styles');
  