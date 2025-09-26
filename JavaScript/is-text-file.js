const isTextFile = (function () {
	const MAGIC_NUMBERS = [
		{ sig: [0x89, 0x50, 0x4e, 0x47] }, // PNG
		{ sig: [0xff, 0xd8, 0xff] }, // JPEG
		{ sig: [0x47, 0x49, 0x46, 0x38] }, // GIF
		{ sig: [0x25, 0x50, 0x44, 0x46] }, // PDF
		{ sig: [0x50, 0x4b, 0x03, 0x04] } // ZIP
	];
	function hasMagic(bytes) {
		return MAGIC_NUMBERS.some(({ sig }) => sig.every((value, index) => bytes[index] === value));
	}
	function hasNul(bytes) {
		return bytes.includes(0x00);
	}
	function controlCharRatio(bytes) {
		let count = 0;
		for (let index = 0; index < bytes.length; index++) {
			const byte = bytes[index];
			const allowed = byte === 0x09 || byte === 0x0a || byte === 0x0d || byte === 0x0c;
			const isControl = byte <= 0x08 || (byte >= 0x0e && byte <= 0x1f) || byte === 0x7f;
			if (!allowed && isControl) {
				count++;
			}
		}
		return count / Math.max(1, bytes.length);
	}
	function isValidUtf8(bytes) {
		try {
			new TextDecoder("utf-8", { fatal: true }).decode(bytes);
			return true;
		} catch {
			return false;
		}
	}
	return async (file, sampleSize = 8192) => {
		const blob = file.slice(0, sampleSize);
		const buffer = await blob.arrayBuffer();
		const bytes = new Uint8Array(buffer);
		if (bytes.length === 0) {
			return true;
		}
		if (hasNul(bytes) || hasMagic(bytes) || !isValidUtf8(bytes)) {
			return false;
		}
		const ratio = controlCharRatio(bytes);
		if (ratio > 0.0075) {
			return false;
		}
		return true;
	};
})();