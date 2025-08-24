// Binary conversion utilities
import { mapTextToCustomBinary } from './lookupMapper.js';
import customLookup from './lookupTable.js';
import { showErrorPopup } from './domHelpers.js';

// Check if a character can be represented in 8 bits (0-255)
export function isValidChar(char) {
    if (!char || char.length === 0) return false;
    const key = char.toUpperCase();
    return customLookup.has(key);
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

    // Filter out any (should be none) just to be safe
    const validText = filterValidChars(text);

    // Use custom mapping function (falls back to 8-bit conversion when mapper
    // returns an empty string or no codes matched).
    const mapped = mapTextToCustomBinary(validText);
    if (mapped && mapped.length > 0) return mapped;

    // Fallback to original 8-bit conversion
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
