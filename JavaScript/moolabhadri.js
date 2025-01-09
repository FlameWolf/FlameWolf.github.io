"use strict";

const similarVariants = [
	["ന്‍റ", "ൻ്റ"],
	["മ്‍", "ൔ"],
	["യ്‍", "ൕ"],
	["ഴ്‍", "ൖ"],
	["ണ്‍", "ൺ"],
	["ന്‍", "ൻ"],
	["ര്‍", "ർ"],
	["ല്‍", "ൽ"],
	["ള്‍", "ൾ"],
	["ക്‍", "ൿ"]
];
const baseTransforms = [
	["അ", "ക"],
	["ആ", "കാ"],
	["ഇ", "കി"],
	["ഈ", "കീ"],
	["ഉ", "കു"],
	["ഊ", "കൂ"],
	["ഋ", "കൃ"],
	["ൠ", "കൄ"],
	["ഌ", "കൢ"],
	["ൡ", "കൣ"],
	["എ", "കെ"],
	["ഏ", "കേ"],
	["ഐ", "കൈ"],
	["ഒ", "കൊ"],
	["ഓ", "കോ"],
	["ഔ", "കൌ"],
	["അ്‍", "ൿ"],
	["ഖ", "ഗ"],
	["ഘ", "ങ"],
	["ച", "ട"],
	["ഛ", "ഠ"],
	["ജ", "ഝ"],
	["ഞ", "ണ"],
	["ഞ്‍", "ൺ"],
	["ഡ", "ഢ"],
	["ത", "പ"],
	["ഥ", "ഫ"],
	["ദ", "ധ"],
	["ബ", "ഭ"],
	["ന", "മ"],
	["യ", "ശ"],
	["ര", "ഷ"],
	["ല", "സ"],
	["വ", "ഹ"],
	["ള", "ക്ഷ"],
	["ഴ", "റ"],
	["ങ്ക", "ഞ്ച"],
	["ണ്ട", "ന്ത"],
	["മ്പ", "ഩ്ഩ"],
	["ൻ്റ", "റ്റ"],
	["ൻ", "ൽ"],
	["ർ", "ൾ"],
	["൧", "൨"],
	["൩", "൪"],
	["൫", "൬"],
	["൭", "൮"],
	["൯", "൦"],
	["1", "2"],
	["3", "4"],
	["5", "6"],
	["7", "8"],
	["9", "0"]
];
const additionalTransforms = [
	["ൟ", "കീ"],
	["ഩ", "മ"],
	["ൕ", "ശ്"],
	["ൖ", "റ്"],
	["ഺ", "റ്റ"],
	["ൎ", "ൾ"],
	["കൗ", "ഔ"],
	["ൔ", "ന്"]
];
const transformMap = (() => {
	const reverseTransforms = baseTransforms.map(([x, y]) => [y, x]);
	return new Map([...baseTransforms, ...reverseTransforms, ...additionalTransforms]);
})();
const tokenisationPattern = (() => {
	const mappedConjuncts = Array.from(transformMap.keys())
		.filter(x => Array.from(x).length > 1)
		.sort((x, y) => y.length - x.length);
	return new RegExp(`(${mappedConjuncts.join("|")}|\\S)`, "gu");
})();
const transformToken = token => transformMap.get(token) ?? token;
const transformText = text => {
	for (const [conjunct, atomic] of similarVariants) {
		text = text.replaceAll(conjunct, atomic);
	}
	return text.replace(tokenisationPattern, transformToken);
};