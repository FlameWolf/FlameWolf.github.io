/**
 * A function that performs the ROT18 cipher on a given input string.
 * ROT18 is a combination of ROT13 (for alphabetic characters) and ROT5 (for numeric characters),
 * effectively rotating letters by 13 places and digits by 5 places in their respective ranges.
 *
 * @param {string} input The input string to be encoded or decoded using the ROT18 cipher.
 * @returns {string} The transformed string after applying the ROT18 cipher.
 *
 * @example
 * // Encrypting a string
 * const encrypted = rot18("Hello123");
 * console.log(encrypted); // Outputs: "Uryyb678"
 *
 * @example
 * // Decrypting a string (ROT18 is symmetric)
 * const decrypted = rot18("Uryyb678");
 * console.log(decrypted); // Outputs: "Hello123"
 */
const rot18 = (() => {
	const forward = "ABCDEFGHIJKLM01234";
	const reverse = "NOPQRSTUVWXYZ56789";
	const charMap = new Map();
	for (let loopIndex = 0; loopIndex < 18; loopIndex++) {
		const key = forward[loopIndex];
		const val = reverse[loopIndex];
		charMap.set(key, val);
		charMap.set(val, key);
		if (/\D/.test(key)) {
			charMap.set(key.toLowerCase(), val.toLowerCase());
			charMap.set(val.toLowerCase(), key.toLowerCase());
		}
	}
	return input => input.replace(/\w/gu, char => charMap.get(char) ?? char);
})();