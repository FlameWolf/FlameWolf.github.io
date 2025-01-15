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
	["ഇ", "എ"],
	["ഈ", "ഏ"],
	["ഋ", "ഌ"],
	["ൠ", "ൡ"],
	["ഉ", "ഒ"],
	["ഊ", "ഓ"],
	["ഐ", "ഔ"],
	["ി", "െ"],
	["ീ", "േ"],
	["ൃ", "ൢ"],
	["ൄ", "ൣ"],
	["ു", "ൊ"],
	["ൂ", "ോ"],
	["ൈ", "ൌ"],
	["ക", "മ"],
	["ഖ", "ഭ"],
	["ഗ", "ബ"],
	["ച", "ന"],
	["ഛ", "ധ"],
	["ജ", "ദ"],
	["ട", "ണ"],
	["ഠ", "ഢ"],
	["ഡ", "സ"],
	["ത", "ഞ"],
	["ഥ", "ഝ"],
	["പ", "ങ"],
	["ഫ", "ഘ"],
	["യ", "ള"],
	["ര", "ഴ"],
	["ല", "റ"],
	["വ", "ശ"],
	["ഷ", "ഹ"],
	["ൿ", "ൔ"],
	["ൾ", "ൕ"],
	["ൺ", "ട്‍"],
	["ൽ", "റ്‍"],
	["ർ", "ൖ"],
	["ൻ", "ച്‍"],
	["ഩ", "ഺ"],
	["൦", "൪"],
	["൧", "൩"],
	["൨", "൭"],
	["൫", "൯"],
	["൬", "൮"],
	["0", "4"],
	["1", "3"],
	["2", "7"],
	["5", "9"],
	["6", "8"]
];
const oneWayTransforms = [["ൗ", "ൈ"]];
const transformMap = (() => {
	const reverseTransforms = baseTransforms.map(([x, y]) => [y, x]);
	return new Map([...baseTransforms, ...reverseTransforms, ...oneWayTransforms]);
})();
const tokenisationPattern = (() => {
	const mappedConjuncts = Array.from(transformMap.keys())
		.filter(x => Array.from(x).length > 1)
		.sort((x, y) => y.length - x.length);
	return new RegExp(`(${mappedConjuncts.join("|")}|\\S)`, "gu");
})();
const transformText = input => {
	for (const [conjunct, atomic] of similarVariants) {
		input = input.replaceAll(conjunct, atomic);
	}
	return input.replace(tokenisationPattern, token => transformMap.get(token) ?? token);
};