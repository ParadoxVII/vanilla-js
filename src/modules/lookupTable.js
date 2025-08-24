// Custom lookup table mapping characters to 6-bit binary codes.
// Assumption: A = 1 ("000001") through Z = 26 ("011010").
// Digits '0'..'9' are mapped to 27..36 respectively (6-bit values).
// If you want a different numeric mapping (for example making '9' equal to 32),
// tell me and I will update the table.

export const customLookup = new Map([
    // Space and dot -> 0
    [' ', '00000'],
    ['.', '00000'],

    // Letters A-Z (1..26)
    ['A', '00001'], ['B', '00010'], ['C', '00011'], ['D', '00100'],
    ['E', '00101'], ['F', '00110'], ['G', '00111'], ['H', '01000'],
    ['I', '01001'], ['J', '01010'], ['K', '01011'], ['L', '01100'],
    ['M', '01101'], ['N', '01110'], ['O', '01111'], ['P', '10000'],
    ['Q', '10001'], ['R', '10010'], ['S', '10011'], ['T', '10100'],
    ['U', '10101'], ['V', '10110'], ['W', '10111'], ['X', '11000'],
    ['Y', '11001'], ['Z', '11010'],

    // Digits (0 and 1 reuse letters O and I)
    ['0', '01111'], // same as 'O'
    ['1', '01001'], // same as 'I'
    ['2', '11011'], ['3', '11100'], ['4', '11101'],
    ['5', '11110'], ['6', '11111'],

]);

export default customLookup;
