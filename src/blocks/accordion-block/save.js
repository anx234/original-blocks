import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()}>
			<details className="wp-accordion">
				<summary className="wp-accordion__title">
					<RichText.Content
						tagName="span"
						value={attributes.title}
					/>
				</summary>
				<div className="wp-accordion__content">
					<InnerBlocks.Content />
				</div>
			</details>
		</div>
	);
}
