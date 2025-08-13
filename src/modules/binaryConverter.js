// Binary conversion utilities
export function textToBinary(text) {
    if (!text) return '';

    return text
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
