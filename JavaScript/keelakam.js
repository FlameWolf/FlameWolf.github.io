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
	["ഇ", "ഉ"],
	["ഈ", "ഊ"],
	["ഋ", "ഌ"],
	["ൠ", "ൡ"],
	["എ", "ഒ"],
	["ഏ", "ഓ"],
	["ഐ", "ഔ"],
	["ി", "ു"],
	["ീ", "ൂ"],
	["ൃ", "ൢ"],
	["ൄ", "ൣ"],
	["െ", "ൊ"],
	["േ", "ോ"],
	["ൈ", "ൌ"],
	["ക", "പ"],
	["ഖ", "ഫ"],
	["ഗ", "ബ"],
	["ഘ", "ഭ"],
	["ങ", "മ"],
	["ച", "ത"],
	["ഛ", "ഥ"],
	["ജ", "ദ"],
	["ഝ", "ധ"],
	["ഞ", "ന"],
	["ട", "റ"],
	["ഠ", "ഴ"],
	["ഡ", "ഷ"],
	["ഢ", "ഹ"],
	["ണ", "ള"],
	["യ", "വ"],
	["ര", "ശ"],
	["ല", "സ"],
	["ഺ", "ഩ"],
	["ൿ", "ൺ"],
	["ൾ", "ർ"],
	["ൽ", "ൻ"],
	["൦", "൯"],
	["൧", "൮"],
	["൨", "൭"],
	["൩", "൬"],
	["൪", "൫"],
	["0", "9"],
	["1", "8"],
	["2", "7"],
	["3", "6"],
	["4", "5"]
];
const oneWayTransforms = [
	["ൟ", "ഊ"],
	["ൕ", "വ്"],
	["ൗ", "ൈ"],
	["ൔ", "ങ്"],
	["ൖ", "ഠ്"],
	["ൎ", "ൾ"]
];
const transformMap = (() => {
	const reverseTransforms = baseTransforms.map(([x, y]) => [y, x]);
	return new Map([...baseTransforms, ...reverseTransforms, ...oneWayTransforms]);
})();
const transformText = input => {
	for (const [conjunct, atomic] of similarVariants) {
		input = input.replaceAll(conjunct, atomic);
	}
	return input.replace(/\S/gu, token => transformMap.get(token) ?? token);
};