// Main application logic
import { textToBinary } from './modules/binaryConverter.js';
import { updateCharCounter, showTemporaryMessage, copyToClipboard } from './modules/domHelpers.js';

class BinaryConverter {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.charCount = document.getElementById('charCount');
        this.binaryResult = document.getElementById('binaryResult');
        this.maxLength = 28;

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.textInput.focus();
        console.log('🔢 Binary Converter initialized with ES6 modules');
    }

    bindEvents() {
        // Real-time conversion
        this.textInput.addEventListener('input', () => this.updateDisplay());

        // Copy functionality
        this.binaryResult.addEventListener('click', () => this.handleCopy());

        // Keyboard shortcuts
        this.textInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.textInput.value = '';
                this.updateDisplay();
            }
            if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
                event.preventDefault();
                this.textInput.select();
            }
        });
    }

    updateDisplay() {
        const inputText = this.textInput.value;
        const currentLength = inputText.length;

        // Update character counter
        updateCharCounter(currentLength, this.maxLength, this.charCount);

        // Convert and display binary
        if (inputText) {
            const binary = textToBinary(inputText);
            this.binaryResult.textContent = binary;
            this.binaryResult.classList.add('has-content');
            this.binaryResult.classList.remove('empty');
            this.binaryResult.title = 'Click to copy';
        } else {
            this.binaryResult.textContent = 'Start typing to see binary...';
            this.binaryResult.classList.remove('has-content');
            this.binaryResult.classList.add('empty');
            this.binaryResult.title = '';
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
    new BinaryConverter();
});
