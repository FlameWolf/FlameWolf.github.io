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
const cipherSchemes = {
	moolabhadri: {
		name: "മൂലഭദ്രി",
		description: "അകോ ഖഗോ ഘങശ്ചൈവ / ചടോ ഞണ തപോ നമ / ജഝോ ഡഢോ ദധശ്ചൈവ / ബഭോ ഥഫ ഛഠേതി ച / യശോ രഷോ ലസശ്ചൈവ / വഹ ക്ഷള ഴറ ക്രമാൽ / ങ്കഞ്ച ന്തണ്ട മ്പഩ്ഩ ൻ്ററ്റ ൻൽ ർൾ",
		baseTransforms: [
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
		],
		oneWayTransforms: [
			["ൟ", "കീ"],
			["ഩ", "മ"],
			["ൕ", "ശ്"],
			["ൖ", "റ്"],
			["ഺ", "റ്റ"],
			["ൎ", "ൾ"],
			["കൗ", "ഔ"],
			["ൔ", "ന്"]
		]
	},
	moolabhadri_v2: {
		name: "മൂലഭദ്രി (Simple)",
		description: "അകോ ഖഗോ ഘങശ്ചൈവ / ചടോ ഞണ തപോ നമ / യശോ രഷോ ലസശ്ചൈവ / വഹ ക്ഷള ഴറ റ്റഩ",
		baseTransforms: [
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
			["ജ", "ഡ"],
			["ഝ", "ഢ"],
			["ഞ", "ണ"],
			["ഞ്‍", "ൺ"],
			["ത", "പ"],
			["ഥ", "ഫ"],
			["ദ", "ബ"],
			["ധ", "ഭ"],
			["ന", "മ"],
			["യ", "ശ"],
			["ര", "ഷ"],
			["ർ", "ഷ്‍"],
			["ല", "സ"],
			["ൽ", "സ്‍"],
			["വ", "ഹ"],
			["ള", "ക്ഷ"],
			["ൾ", "ക്ഷ്‍"],
			["ഴ", "റ"],
			["റ്റ", "ഩ"],
			["റ്റ്‍", "ൻ"],
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
		],
		oneWayTransforms: [
			["ൟ", "കീ"],
			["ൕ", "ശ്"],
			["ൎ", "ഷ്‍"],
			["ൖ", "റ്"],
			["ഺ", "ഩ"],
			["കൗ", "ഔ"],
			["ൔ", "ന്"]
		]
	}
};
for (const scheme of Object.values(cipherSchemes)) {
	const baseTransforms = scheme.baseTransforms;
	const reverseTransforms = baseTransforms.map(([x, y]) => [y, x]);
	const transformMap = new Map([...baseTransforms, ...reverseTransforms, ...scheme.oneWayTransforms]);
	const mappedConjuncts = Array.from(transformMap.keys())
		.filter(x => Array.from(x).length > 1)
		.sort((x, y) => y.length - x.length);
	const tokenisationPattern = new RegExp(`${mappedConjuncts.length ? `${mappedConjuncts.join("|")}|` : ""}\\S`, "gu");
	Object.assign(scheme, {
		transformMap,
		tokenisationPattern
	});
}
let activeCipherScheme = cipherSchemes["moolabhadri"];
const transformText = input => {
	for (const [conjunct, atomic] of similarVariants) {
		input = input.replaceAll(conjunct, atomic);
	}
	const { tokenisationPattern, transformMap } = activeCipherScheme;
	return input.replace(tokenisationPattern, token => transformMap.get(token) ?? token);
};