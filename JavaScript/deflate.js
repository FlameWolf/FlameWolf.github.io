/**
 * Polyfill for ReadableStream.from which creates a ReadableStream from an iterable source.
 */
if (typeof ReadableStream.from === "undefined") {
	Object.defineProperty(ReadableStream, "from", {
		value(iterable) {
			return new ReadableStream({
				async start(controller) {
					for await (const chunk of iterable) {
						controller.enqueue(chunk);
					}
					controller.close();
				}
			});
		}
	});
}
/**
 * Merges multiple Uint8Array chunks into a single Uint8Array.
 * @param {Uint8Array[]} chunks Array of Uint8Array chunks
 * @returns {Uint8Array} Concatenated Uint8Array containing all chunks
 */
function combineChunks(chunks) {
	const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
	const result = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}
	return result;
}
/**
 * Transforms input data through a given TransformStream.
 * @param {Uint8Array} input Data to be transformed
 * @param {new (format: CompressionFormat) => TransformStream} StreamClass TransformStream constructor
 * @returns {Promise<Uint8Array>} Promise resolving to transformed data
 */
async function processStream(input, StreamClass) {
	const stream = new StreamClass("deflate-raw");
	const processed = ReadableStream.from([input]).pipeThrough(stream);
	const chunks = [];
	for await (const chunk of processed) {
		chunks.push(chunk);
	}
	return combineChunks(chunks);
}
/**
 * Compresses input data using DEFLATE compression.
 * @param {Uint8Array} input Data to compress
 * @returns {Promise<Uint8Array>} Promise resolving to DEFLATE-compressed data
 */
const deflate = input => processStream(input, CompressionStream);
/**
 * Decompresses DEFLATE-compressed data.
 * @param {Uint8Array} input DEFLATE-compressed data
 * @returns {Promise<Uint8Array>} Promise resolving to decompressed data
 */
const inflate = input => processStream(input, DecompressionStream);