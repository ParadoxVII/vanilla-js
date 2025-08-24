import customLookup from './lookupTable.js';

// Map text to custom binary using the supplied lookup Map.
// - Uppercases letters before lookup.
// - Skips characters not present in the lookup table.
// - Returns codes separated by spaces.
export function mapTextToCustomBinary(text) {
    if (!text) return '';
    return text
        .split('')
        .map(char => {
            const key = char.toUpperCase();
            return customLookup.has(key) ? customLookup.get(key) : null;
        })
        .filter(code => code !== null)
        .join(' ');
}

export default mapTextToCustomBinary;
