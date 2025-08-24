// Main application logic
import { textToBinary, filterValidChars, isValidChar } from './modules/binaryConverter.js';
import { updateCharCounter, showTemporaryMessage, copyToClipboard, showErrorPopup } from './modules/domHelpers.js';
import { createRadialStarGrid } from './modules/radialGrid.js';

class App {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.charCount = document.getElementById('charCount');
        this.binaryResult = document.getElementById('binaryResult');
        this.starSvg = document.getElementById('starSvg');
        this.maxLength = 32;

        // Initialize radial star grid
        this.radialGrid = createRadialStarGrid(this.starSvg);

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.textInput.focus();
    }

    bindEvents() {
        // Prevent invalid characters from being entered
        this.textInput.addEventListener('beforeinput', (event) => {
            if (event.inputType === 'insertText' || event.inputType === 'insertCompositionText') {
                const inputChar = event.data;
                if (inputChar && !isValidChar(inputChar)) {
                    event.preventDefault();
                    showErrorPopup('Only basic characters allowed');
                }
            }
        });

        // Handle paste events
        this.textInput.addEventListener('paste', (event) => {
            event.preventDefault();
            const paste = event.clipboardData.getData('text');
            const validPaste = filterValidChars(paste);

            if (validPaste.length !== paste.length) {
                showErrorPopup('Invalid characters removed from paste');
            }

            // Insert valid characters at cursor position
            const start = this.textInput.selectionStart;
            const end = this.textInput.selectionEnd;
            const currentValue = this.textInput.value;
            const newValue = currentValue.slice(0, start) + validPaste + currentValue.slice(end);

            // Respect max length
            if (newValue.length <= this.maxLength) {
                this.textInput.value = newValue;
                this.textInput.setSelectionRange(start + validPaste.length, start + validPaste.length);
            } else {
                const truncated = newValue.slice(0, this.maxLength);
                this.textInput.value = truncated;
                this.textInput.setSelectionRange(this.maxLength, this.maxLength);
                showErrorPopup('Text truncated to 32 characters');
            }

            this.updateDisplay();
        });

        // Real-time conversion
        this.textInput.addEventListener('input', () => this.updateDisplay());

        // Copy functionality
        this.binaryResult.addEventListener('click', () => this.handleCopy());
    }

    updateDisplay() {
        const inputText = this.textInput.value;
        const currentLength = inputText.length;

        // Check for invalid characters (emojis, Unicode beyond 8-bit)
        const validText = filterValidChars(inputText);
        const hasInvalidChars = validText.length !== inputText.length;

        // If invalid characters were found, update input to only valid chars
        if (hasInvalidChars) {
            // Update input value to filtered version
            const cursorPos = this.textInput.selectionStart;
            this.textInput.value = validText;
            // Try to maintain cursor position
            this.textInput.setSelectionRange(cursorPos - (inputText.length - validText.length), cursorPos - (inputText.length - validText.length));
        }

        // Update character counter with valid text length
        const validLength = validText.length;
        updateCharCounter(validLength, this.maxLength, this.charCount);

        // Convert and display binary
        if (validText) {
            const binary = textToBinary(validText);
            this.binaryResult.textContent = binary;
            this.binaryResult.classList.add('has-content');
            this.binaryResult.classList.remove('empty');
            this.binaryResult.title = 'Click to copy';

            // Update radial grid with binary mapping
            this.radialGrid.createBinaryMappedStar(validText, binary);
        } else {
            this.binaryResult.textContent = 'Start typing to see binary...';
            this.binaryResult.classList.remove('has-content');
            this.binaryResult.classList.add('empty');
            this.binaryResult.title = '';

            // Clear radial grid
            this.radialGrid.clearRays();
        }
    }

    async handleCopy() {
        if (!this.binaryResult.classList.contains('has-content')) return;

        const binaryText = this.binaryResult.textContent;
        try {
            await copyToClipboard(binaryText);
            showTemporaryMessage(this.binaryResult, 'Copied!');
        } catch (error) {
            console.error('Copy failed:', error);
            showTemporaryMessage(this.binaryResult, 'Copy failed');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
