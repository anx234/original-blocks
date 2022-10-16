import { useSelect } from '@wordpress/data';
 
import { __ } from '@wordpress/i18n';
 
import {
    dateI18n,                   // 日付をフォーマットし、サイトのロケールに変換
    format,                     // 日付のフォーマット
    __experimentalGetSettings   // WordPress の一般設定の日付フォーマットにする
} from '@wordpress/date';
 
import {
    useBlockProps,
    InspectorControls,
} from '@wordpress/block-editor';
 
import {
    Disabled,
    PanelBody,
    PanelRow,
    QueryControls,
    RangeControl,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
 
export default function Edit( { attributes, setAttributes } ) {
 
    const {
        numberOfItems,
        displayDate,
        displayThumbnail
    } = attributes;
 
    const posts = useSelect(
        ( select ) => {
            return select( 'core' ).getEntityRecords( 'postType', 'post', {
                'per_page': numberOfItems,
                '_embed': true
            });
        },
        [ numberOfItems ]
    );
    const [ size, setSize ] = useState( '50%' );


    const postTypes = useSelect(
        ( select ) => {
            return select( 'core').getPostTypes( { per_page: -1 });
        }
    );

    const blockProps = useBlockProps();
 
    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Content Settings', 'my-blocks' ) }>
                    <PanelRow>
                        <QueryControls
                            numberOfItems={ numberOfItems }
                            onNumberOfItemsChange={ ( value ) =>
                                setAttributes( { numberOfItems: value } )
                            }
                            minItems={ 1 }
                            maxItems={ 10 }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={ __( 'Show Featured Image', 'my-blocks' ) }
                            checked={ displayThumbnail }
                            onChange={ () =>
                                setAttributes( { displayThumbnail: ! displayThumbnail } )
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={ __( 'Show Date', 'my-blocks' ) }
                            checked={ displayDate }
                            onChange={ () =>
                                setAttributes( { displayDate: ! displayDate } )
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                    <SelectControl
            label="Size"
            value={ size }
            options={ [
                { label: 'Big', value: '100%' },
                { label: 'Medium', value: '50%' },
                { label: 'Small', value: '25%' },
            ] }
            onChange={ ( newSize ) => setSize( newSize ) }
            __nextHasNoMarginBottom
        />
                    </PanelRow>

                </PanelBody>
            </InspectorControls>
 
            <div { ...useBlockProps() }>
                <Disabled>
                    <ul className='wp-block-create-block-slider-block__post-items'>
                        { posts && posts.map(( post ) => {
                            return (
                                <li key={ post.id }>
                                    {
                                        displayThumbnail &&
                                        post._embedded &&
                                        post._embedded['wp:featuredmedia'] &&
                                        post._embedded['wp:featuredmedia'][0] &&
                                        <a href={ post.link } className='wp-block-create-block-slider-block__post-thumbnail-link'>
                                            <img
                                                className='wp-block-create-block-slider-block__post-thumbnail'
                                                src={ post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url }
                                                alt={ post._embedded['wp:featuredmedia'][0].alt_text }
                                            />
                                        </a>
                                    }
                                    <div className='wp-block-create-block-slider-block__text-contents'>
                                        <h3 className='wp-block-create-block-slider-block__post-title'>
                                            <a href={ post.link }>
                                                { post.title.rendered ? (
                                                    post.title.rendered
                                                ) : (
                                                    __( 'Default title', 'my-blocks' )
                                                )}
                                            </a>
                                        </h3>
                                        {
                                            displayDate && (
                                                <time
                                                    className='wp-block-create-block-slider-block__post-date'
                                                    dateTime={ format( 'c', post.date_gmt ) }
                                                >
                                                    { dateI18n(
                                                        __experimentalGetSettings().formats.date,
                                                        post.date_gmt
                                                    )}
                                                </time>
                                            )
                                        }
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </Disabled>
            </div>
        </>
	);
}
