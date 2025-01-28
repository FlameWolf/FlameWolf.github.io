/** Number of printable ASCII characters (32-126) */
const BASE95_RADIX = 95n;
/** Number of bits in a byte */
const BITS_PER_BYTE = 8n;
/** Starting ASCII code point for printable characters */
const PRINTABLE_ASCII_START = 32;
/** Bits per base-95 character for size calculations */
const BITS_PER_BASE95_CHAR = Math.log2(Number(BASE95_RADIX));
/** Ratio of bytes to base-95 characters (used for encoding) */
const BYTES_TO_CHARS_RATIO = Number(BITS_PER_BYTE) / BITS_PER_BASE95_CHAR;
/** Ratio of base-95 characters to bytes (used for decoding) */
const CHARS_TO_BYTES_RATIO = BITS_PER_BASE95_CHAR / Number(BITS_PER_BYTE);
/** Number of base-95 characters in a chunk of bytes */
const CHARS_PER_CHUNK = Number(BASE95_RADIX / BITS_PER_BYTE);
/** Number of bytes packed in a chunk */
const BYTES_PER_CHUNK = Math.floor(CHARS_PER_CHUNK * CHARS_TO_BYTES_RATIO);
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
	const result = new Array(Math.ceil(inputLength * BYTES_TO_CHARS_RATIO));
	let resultIndex = 0;
	// Process bytes in chunks
	for (let chunkStart = 0; chunkStart < inputLength; chunkStart += BYTES_PER_CHUNK) {
		// Combine bytes into chunk
		let chunkValue = 0n;
		const chunkEnd = Math.min(chunkStart + BYTES_PER_CHUNK, inputLength);
		for (let byteIndex = chunkStart; byteIndex < chunkEnd; byteIndex++) {
			chunkValue = (chunkValue << BITS_PER_BYTE) | BigInt(bytes[byteIndex]);
		}
		// Convert chunk to base-95 and store in result
		const chunkLength = Math.ceil((chunkEnd - chunkStart) * BYTES_TO_CHARS_RATIO);
		for (let chunkIndex = chunkLength - 1; chunkIndex >= 0; chunkIndex--) {
			result[resultIndex + chunkIndex] = base95EncodeMap[chunkValue % BASE95_RADIX];
			chunkValue /= BASE95_RADIX;
		}
		resultIndex += chunkLength;
	}
	return result.join("");
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
		// Convert chunk to big number
		let chunkValue = 0n;
		const chunkEnd = Math.min(chunkStart + CHARS_PER_CHUNK, inputLength);
		for (let chunkIndex = chunkStart; chunkIndex < chunkEnd; chunkIndex++) {
			chunkValue = chunkValue * BASE95_RADIX + BigInt(base95DecodeMap[encoded.charCodeAt(chunkIndex) - PRINTABLE_ASCII_START]);
		}
		// Extract bytes from chunk and store in result
		const chunkLength = Math.floor((chunkEnd - chunkStart) * CHARS_TO_BYTES_RATIO);
		for (let byteIndex = chunkLength - 1; byteIndex >= 0; byteIndex--) {
			result[resultIndex + byteIndex] = Number(chunkValue & 255n);
			chunkValue >>= BITS_PER_BYTE;
		}
		resultIndex += chunkLength;
	}
	return result;
}