/** Number of printable ASCII characters (32-126) */
const BASE95_RADIX = 95n;
/** Number of bits in a byte */
const BITS_PER_BYTE = 8n;
/** Bits per base-95 character for size calculations */
const BITS_PER_BASE95_CHAR = Math.log2(Number(BASE95_RADIX));
/** Ratio of bytes to base-95 characters (used for encoding) */
const BYTES_TO_CHARS_RATIO = Number(BITS_PER_BYTE) / BITS_PER_BASE95_CHAR;
/** Ratio of base-95 characters to bytes (used for decoding) */
const CHARS_TO_BYTES_RATIO = BITS_PER_BASE95_CHAR / Number(BITS_PER_BYTE);
/** Number of bytes to process at a time for efficient chunking */
const BYTES_PER_CHUNK = 9;
/** Number of base-95 characters that correspond to one chunk of bytes */
const CHARS_PER_CHUNK = 11;
/** Starting ASCII code point for printable characters */
const PRINTABLE_ASCII_START = 32;
/** Lookup table mapping numbers to base-95 characters */
const base95EncodeMap = Array.from({ length: Number(BASE95_RADIX) }, (_, index) => String.fromCharCode(index + PRINTABLE_ASCII_START));
/** Lookup table mapping base-95 characters to numbers */
const base95DecodeMap = Array.from({ length: Number(BASE95_RADIX) }, (_, index) => index);
/**
 * Encodes byte array into base-95 string using chunked processing.
 * @param {Uint8Array[]} bytes Array of bytes
 * @returns {string} Base-95 encoded string
 */
function encodeBase95(bytes) {
	const inputLength = bytes.length;
	let result = "";
	// Process bytes in chunks
	for (let chunkStart = 0; chunkStart < inputLength; chunkStart += BYTES_PER_CHUNK) {
		// Convert chunk to big number
		let chunkValue = 0n;
		const chunkEnd = Math.min(chunkStart + BYTES_PER_CHUNK, inputLength);
		for (let byteIndex = chunkStart; byteIndex < chunkEnd; byteIndex++) {
			chunkValue = (chunkValue << BITS_PER_BYTE) | BigInt(bytes[byteIndex]);
		}
		// Convert chunk to base-95 string
		let chunkResult = "";
		while (chunkValue > 0n) {
			const remainder = Number(chunkValue % BASE95_RADIX);
			chunkResult = base95EncodeMap[remainder] + chunkResult;
			chunkValue = chunkValue / BASE95_RADIX;
		}
		// Pad chunk result to expected length
		const chunkBytes = chunkEnd - chunkStart;
		result += chunkResult.padStart(Math.ceil(chunkBytes * BYTES_TO_CHARS_RATIO), base95EncodeMap[0]);
	}
	return result;
}
/**
 * Decodes base-95 string into byte array using chunked processing.
 * @param {string} encoded Base-95 encoded string
 * @returns {Uint8Array} Array of bytes
 */
function decodeBase95(encoded) {
	const inputLength = encoded.length;
	const result = new Uint8Array(Math.floor(inputLength / CHARS_PER_CHUNK) * BYTES_PER_CHUNK + Math.floor((inputLength % CHARS_PER_CHUNK) * CHARS_TO_BYTES_RATIO));
	let resultIndex = 0;
	// Process text in chunks
	for (let chunkStart = 0; chunkStart < inputLength; chunkStart += CHARS_PER_CHUNK) {
		const chunk = encoded.slice(chunkStart, chunkStart + CHARS_PER_CHUNK);
		// Convert chunk to number
		let chunkValue = 0n;
		for (const char of chunk) {
			chunkValue = chunkValue * BASE95_RADIX + BigInt(base95DecodeMap[char.charCodeAt(0) - PRINTABLE_ASCII_START]);
		}
		// Extract bytes from chunk
		const chunkBytes = new Uint8Array(Math.floor(chunk.length * CHARS_TO_BYTES_RATIO));
		let chunkIndex = chunkBytes.length - 1;
		while (chunkValue > 0n) {
			chunkBytes[chunkIndex--] = Number(chunkValue & 255n);
			chunkValue = chunkValue >> BITS_PER_BYTE;
		}
		// Copy chunk bytes to result
		result.set(chunkBytes, resultIndex);
		resultIndex += chunkBytes.length;
	}
	return result;
}