const segmenter = new Intl.Segmenter();
const zeroWidthSpace = "\u200B";
const isGraphemeUnit = combination => Array.from(segmenter.segment(combination)).length === 1;
const removeUnwantedZws = (current, index, { [index - 1]: previous, [index + 1]: next }) => {
	const currentSegment = current.segment;
	if (currentSegment === zeroWidthSpace) {
		if (previous) {
			return isGraphemeUnit(`${previous.segment}${currentSegment}`);
		} else if (next) {
			return isGraphemeUnit(`${currentSegment}${next.segment}`);
		}
	}
	return true;
};
const mapGrapheme = (current, index, { [index - 1]: previous }) => {
	const currentSegment = current.segment;
	if (previous && isGraphemeUnit(`${currentSegment}${previous.segment}`)) {
		return `${currentSegment}${zeroWidthSpace}`;
	}
	return currentSegment;
};
const reverseUnicodeText = text => Array.from(segmenter.segment(text)).filter(removeUnwantedZws).map(mapGrapheme).reverse().join("");