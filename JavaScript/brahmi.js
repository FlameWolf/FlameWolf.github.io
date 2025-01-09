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
	["അ", "𑀅"],
	["ആ", "𑀆"],
	["ഇ", "𑀇"],
	["ഈ", "𑀈"],
	["ഉ", "𑀉"],
	["ഊ", "𑀊"],
	["ഋ", "𑀋"],
	["ൠ", "𑀌"],
	["ഌ", "𑀍"],
	["ൡ", "𑀎"],
	["എ", "𑁱"],
	["ഏ", "𑀏"],
	["ഐ", "𑀐"],
	["ഒ", "𑁲"],
	["ഓ", "𑀑"],
	["ഔ", "𑀒"],
	["ാ", "𑀸"],
	["ി", "𑀺"],
	["ീ", "𑀻"],
	["ു", "𑀼"],
	["ൂ", "𑀽"],
	["ൃ", "𑀾"],
	["ൄ", "𑀿"],
	["ൢ", "𑁀"],
	["ൣ", "𑁁"],
	["െ", "𑁳"],
	["േ", "𑁂"],
	["ൈ", "𑁃"],
	["ൊ", "𑁴"],
	["ോ", "𑁄"],
	["ൌ", "𑁅"],
	["ം", "𑀁"],
	["ഃ", "𑀂"],
	["്", "𑁆"],
	["ക", "𑀓"],
	["ഖ", "𑀔"],
	["ഗ", "𑀕"],
	["ഘ", "𑀖"],
	["ങ", "𑀗"],
	["ച", "𑀘"],
	["ഛ", "𑀙"],
	["ജ", "𑀚"],
	["ഝ", "𑀛"],
	["ഞ", "𑀜"],
	["ട", "𑀝"],
	["ഠ", "𑀞"],
	["ഡ", "𑀟"],
	["ഢ", "𑀠"],
	["ണ", "𑀡"],
	["ത", "𑀢"],
	["ഥ", "𑀣"],
	["ദ", "𑀤"],
	["ധ", "𑀥"],
	["ന", "𑀦"],
	["പ", "𑀧"],
	["ഫ", "𑀨"],
	["ബ", "𑀩"],
	["ഭ", "𑀪"],
	["മ", "𑀫"],
	["യ", "𑀬"],
	["ര", "𑀭"],
	["ല", "𑀮"],
	["വ", "𑀯"],
	["ശ", "𑀰"],
	["ഷ", "𑀱"],
	["സ", "𑀲"],
	["ഹ", "𑀳"],
	["ള", "𑀴"],
	["ഴ", "𑀵"],
	["റ", "𑀶"],
	["ഩ", "𑀷"],
	["൦", "𑁦"],
	["൧", "𑁧"],
	["൨", "𑁨"],
	["൩", "𑁩"],
	["൪", "𑁪"],
	["൫", "𑁫"],
	["൬", "𑁬"],
	["൭", "𑁭"],
	["൮", "𑁮"],
	["൯", "𑁯"],
	["ഺ", "𑌟"],
	["ൔ", "𑀫𑁰"],
	["ൕ", "𑀬𑁰"],
	["ൖ", "𑀵𑁰"],
	["ൺ", "𑀡𑁰"],
	["ൻ", "𑀷𑁰"],
	["ർ", "𑀭𑁰"],
	["ൽ", "𑀮𑁰"],
	["ൾ", "𑀴𑁰"],
	["ൿ", "𑀓𑁰"]
];
const additionalTransforms = [
	["ൟ", "𑀈"],
	["ൗ", "𑁅"],
	["ൎ", "𑀭𑁰"]
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