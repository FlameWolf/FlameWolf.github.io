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
 * Encodes byte array to base-95 string using chunked processing.
 * @param {number[]} bytes Input array of bytes (0-255)
 * @returns {string} Base-95 encoded string
 */
function encodeBase95(bytes) {
	if (!bytes.length) {
		return "";
	}
	let result = "";
	// Process bytes in chunks
	for (let chunkStart = 0; chunkStart < bytes.length; chunkStart += BYTES_PER_CHUNK) {
		// Convert chunk to big number
		let chunkValue = 0n;
		const chunkEnd = Math.min(chunkStart + BYTES_PER_CHUNK, bytes.length);
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
		const expectedLength = Math.ceil(chunkBytes * BYTES_TO_CHARS_RATIO);
		result += chunkResult.padStart(expectedLength, base95EncodeMap[0]);
	}
	return result;
}
/**
 * Decodes base-95 string to byte array using chunked processing.
 * @param {string} text Base-95 encoded string
 * @returns {number[]} Array of bytes
 */
function decodeBase95(text) {
	if (!text.length) {
		return [];
	}
	const result = [];
	// Process text in chunks
	for (let chunkStart = 0; chunkStart < text.length; chunkStart += CHARS_PER_CHUNK) {
		const chunk = text.slice(chunkStart, chunkStart + CHARS_PER_CHUNK);
		// Convert chunk to number
		let chunkValue = 0n;
		for (const char of chunk) {
			chunkValue = chunkValue * BASE95_RADIX + BigInt(base95DecodeMap[char.charCodeAt(0) - PRINTABLE_ASCII_START]);
		}
		// Extract bytes from chunk
		const chunkBytes = [];
		while (chunkValue > 0n) {
			chunkBytes.unshift(Number(chunkValue & 255n));
			chunkValue = chunkValue >> BITS_PER_BYTE;
		}
		// Pad chunk to expected length
		const expectedChunkBytes = Math.floor(chunk.length * CHARS_TO_BYTES_RATIO);
		while (chunkBytes.length < expectedChunkBytes) {
			chunkBytes.unshift(0);
		}
		result.push(...chunkBytes);
	}
	// Trim to expected total length
	const expectedTotalBytes = Math.floor(text.length * CHARS_TO_BYTES_RATIO);
	return result.slice(0, expectedTotalBytes);
}