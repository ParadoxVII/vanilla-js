// Binary conversion utilities

// Check if a character can be represented in 8 bits (0-255)
export function isValidChar(char) {
    const charCode = char.charCodeAt(0);
    return charCode >= 0 && charCode <= 255;
}

// Filter text to only include valid 8-bit characters
export function filterValidChars(text) {
    return text
        .split('')
        .filter(char => isValidChar(char))
        .join('');
}

export function textToBinary(text) {
    if (!text) return '';

    // Filter out invalid characters first
    const validText = filterValidChars(text);

    return validText
        .split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
}

export function binaryToText(binary) {
    if (!binary) return '';

    return binary
        .split(' ')
        .filter(byte => byte.length === 8)
        .map(byte => String.fromCharCode(parseInt(byte, 2)))
        .join('');
}

export function validateBinaryString(binary) {
    const bytes = binary.split(' ');
    return bytes.every(byte => /^[01]{8}$/.test(byte));
}
