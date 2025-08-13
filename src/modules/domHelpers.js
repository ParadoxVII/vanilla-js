// DOM manipulation utilities
export function updateCharCounter(count, maxCount, element) {
    element.textContent = count;

    const counterElement = element.closest('.char-counter');
    if (count > maxCount * 0.85) { // Warning at 85%
        counterElement.classList.add('warning');
    } else {
        counterElement.classList.remove('warning');
    }
}

export function showTemporaryMessage(element, message, duration = 800) {
    const originalText = element.textContent;
    const originalClass = element.className;

    element.textContent = message;
    element.className = 'binary-result';

    setTimeout(() => {
        element.textContent = originalText;
        element.className = originalClass;
    }, duration);
}

export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return Promise.resolve();
    });
}
