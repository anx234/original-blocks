import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';

const removeBr = val => {
  return val.split('<br>').join('');
}

export default function Edit({attributes, setAttributes}) {
  return (
    <div {...useBlockProps()}>
      <RichText
        className="wpedit-accordion__title"
        tagName="span"
        allowedFormats={[]}
        placeholder="タイトルを入力"
        onChange={(val)=> setAttributes({title:removeBr(val)})}
        value={attributes.title}
      />
	<div className="wpedit-accordion__content">
		<InnerBlocks/>
	</div>

    </div>
  );
}