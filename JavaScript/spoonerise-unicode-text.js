const segmenter = new Intl.Segmenter();
const emptyString = "";
const letterRegex = /\p{L}(\p{Mc}|\p{Mn}\p{L}?)*/u;
const sentenceEndRegex = /([.!?]+)/;
/**
 * Get the segments of a string as an array.
 * @param {string} input The string to segment.
 * @return {string[]} An array of segments.
*/
const getSegmentsAsArray = input => Array.from(segmenter.segment(input)).map(({ segment }) => segment);
/**
 * Take two words and swap their first graphemes while skipping any non-letter graphemes at the start of the words.
 * @param {string} first The first word to spoonerise.
 * @param {string} second The second word to spoonerise.
 * @returns {string[]} An array containing the two spoonerised words.
*/
const spooneriseWords = (first, second) => {
	const firstLetterIndex = first?.search(letterRegex);
	const secondLetterIndex = second?.search(letterRegex);
	if (firstLetterIndex > -1 && secondLetterIndex > -1) {
		const firstSegments = getSegmentsAsArray(first);
		const secondSegments = getSegmentsAsArray(second);
		[firstSegments[firstLetterIndex], secondSegments[secondLetterIndex]] = [secondSegments[secondLetterIndex], firstSegments[firstLetterIndex]];
		return [firstSegments.join(emptyString), secondSegments.join(emptyString)];
	}
	return [first, second];
}
/**
 * Take a string of text and swap the first grapheme of each word with the first grapheme of the next word, while skipping any non-letter graphemes at the start of the words.
 * @param {string} text The text to spoonerise.
 * @returns {string} The spoonerised text.
 */
const spooneriseUnicodeText = text => {
	const sentences = text.split(sentenceEndRegex).filter(sentence => sentence.trim().length > 0);
	const spoonerisedSentences = sentences.map(sentence => {
		const words = sentence.split(/\s+/).filter(word => word.trim().length > 0);
		for (let i = 0; i < words.length - 1; i += 2) {
			[words[i], words[i + 1]] = spooneriseWords(words[i], words[i + 1]);
		}
		return words.join(" ");
	});
	return spoonerisedSentences.reduce((result, sentence) => {
		if (sentenceEndRegex.test(result.slice(-1))) {
			return result + " " + sentence;
		} else {
			return result + sentence;
		}
	}, emptyString).trim();
};