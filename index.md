---
layout: page
title:  "Home"
---

# FlameWolf // &#x1F525;&#x1F43A;

## About Me

Autistic dimwit.

## Interests

- Programming
- Linguistics
- Prosody
- Creative writing
- Birds
- Guns
- Movies
- Philosophy
- Gender issues

## Links

### [Base-95 Converter](base-95.html)

A web utility for encoding and decoding text using Base-95 conversion and GZip compression.

**Features:**

- Two tabs: Encode and Decode.
- Encoding: Compresses input text with GZip, then encodes it in Base-95.
- Decoding: Decodes Base-95 input, decompresses with GZip, and displays the original text.
- Clipboard integration: Paste and Copy buttons for input/output fields.
- Toast notifications for user feedback.
- Responsive design.

**Usage:**

- Encode sensitive or large text for compact transmission/storage.
- Decode previously encoded Base-95 strings.

**Limitations:**

- Only works with text; binary data must be converted to text first.
- Relies on browser support for GZip and clipboard APIs.
- No authentication or security features.

---

### [Encrypted Message Generator](enc-dec.html)

A web tool for encrypting and decrypting text using AES-GCM, GZip, and Base-95 encoding.

**Features:**

- Two tabs: Encrypt and Decrypt.
- Encryption: Generates a random AES-GCM key, compresses and encodes input, encrypts, and outputs Base-95 cipher text.
- Decryption: Requires the correct key to decrypt cipher text.
- Key is displayed and can be copied or shared via QR code.
- Clipboard integration.
- Toast notifications.
- Responsive design.

**Usage:**

- Securely transmit messages; receiver must have the key.
- Share key via QR code for convenience.

**Limitations:**

- Key changes on every page reload; must be shared securely.
- If key is lost, message cannot be decrypted.
- No password-based key derivation.
- Relies on browser crypto APIs.

---

### [Malayalam Base-95 converter](ml-base-95.html)

Malayalam text to/from Base-95 encoding using range compression and GZip.

**Features:**

- Two tabs: Encode and Decode.
- Encoding: Compresses Malayalam and ASCII text, applies range compression, encodes in Base-95.
- Decoding: Decodes Base-95, decompresses, reconstructs Malayalam text.
- Clipboard integration.
- Toast notifications.
- Warning for unsupported Unicode ranges.

**Usage:**

- Compactly encode Malayalam and ASCII text for transmission/storage.

**Limitations:**

- Only supports Malayalam (Unicode 3328-3455) and ASCII (1-127).
- Characters outside these ranges are not processed correctly.

---

### [Moolabhadri Converter](ml-cipher.html)

A tool for encrypting/decrypting Malayalam text using either of the two versions of the Moolabhadri substitution cipher scheme.

**Features:**

- Cipher scheme selection (from `cipherSchemes` in ml-cipher.js).
- Input and Output text areas.
- Paste, Convert, and Copy buttons.
- Displays description of selected cipher.
- Remembers last used scheme via localStorage.
- Toast notifications.

**Usage:**

- Encrypt/decrypt Malayalam text using different schemes.

**Limitations:**

- Only supports schemes defined in the JS file.
- No details on the security of each scheme.
- No error details for failed conversions.

---

### [Unicode Text Reverser](reverse-unicode-text.html)

A utility to reverse Unicode text.

**Features:**

- Input and Output text areas.
- Paste and Copy buttons.
- Output updates live as input changes.
- Uses `reverseUnicodeText` from reverseUnicodeText.js.
- Toast notifications.

**Usage:**

- Reverse the order of Unicode characters in a string (useful for palindromes, RTL/LTR text, etc.).

**Limitations:**

- No options for word/character-level reversal.
- No error details for failed operations.

---

### [ROT-18 Converter](rot-18.html)

A utility for ROT-18 encoding/decoding.

**Features:**

- Input and Output text areas.
- Paste and Copy buttons.
- Output updates live as input changes.
- Uses `rot18` from rot-18.js.
- Toast notifications.

**Usage:**

- Apply ROT-18 cipher (a combination of ROT-13 for letters and ROT-5 for digits).

**Limitations:**

- Only works for Latin letters and digits.
- No error details for failed operations.