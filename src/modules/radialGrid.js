// Radial Grid - Challenge 1: Create star with N rays based on character count
export class RadialStarGrid {
    constructor(svgElement) {
        this.svg = svgElement;
        this.centerX = 100; // Center of 200x200 viewBox
        this.centerY = 100;
        this.innerRadius = 10; // Start of rays
        this.outerRadius = 80; // End of rays
        this.maxRays = 28; // Maximum number of characters

        this.init();
    }

    init() {
        // Clear any existing content
        this.svg.innerHTML = '';
    }

    // Complete clear - removes everything
    clearRays() {
        this.svg.innerHTML = '';
    }

    // Challenge 2: Create binary-mapped rays with line segments
    createBinaryMappedStar(text, binaryString) {
        this.clearRays(); // Use complete clear instead of clearRays

        if (!text || !binaryString) return;

        const characters = text.split('');
        const binaryBytes = binaryString.split(' '); // Each byte represents one character

        // Calculate angle between rays
        const angleStep = (2 * Math.PI) / characters.length;

        // Create rays for each character
        characters.forEach((char, charIndex) => {
            if (charIndex < binaryBytes.length) {
                const binary = binaryBytes[charIndex];
                this.createOptimizedBinaryRay(charIndex, angleStep, binary);
            }
        });
    }

    createBinaryRay(charIndex, angleStep, binaryByte) {
        const angle = charIndex * angleStep - (Math.PI / 2); // Start from top
        const segmentLength = (this.outerRadius - this.innerRadius) / 8; // 8 bits per character

        // Process each bit in the byte
        for (let bitIndex = 0; bitIndex < binaryByte.length; bitIndex++) {
            const bit = binaryByte[bitIndex];

            // Calculate segment position along the ray
            const segmentStart = this.innerRadius + (bitIndex * segmentLength);
            const segmentEnd = segmentStart + segmentLength;

            // Calculate segment endpoints
            const startX = this.centerX + segmentStart * Math.cos(angle);
            const startY = this.centerY + segmentStart * Math.sin(angle);
            const endX = this.centerX + segmentEnd * Math.cos(angle);
            const endY = this.centerY + segmentEnd * Math.sin(angle);

            // Create line segment
            const segment = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            segment.setAttribute('x1', startX);
            segment.setAttribute('y1', startY);
            segment.setAttribute('x2', endX);
            segment.setAttribute('y2', endY);
            segment.setAttribute('class', `binary-segment ${bit === '1' ? 'bit-one' : 'bit-zero'}`);
            segment.setAttribute('data-char-index', charIndex);
            segment.setAttribute('data-bit-index', bitIndex);
            segment.setAttribute('data-bit-value', bit);

            this.svg.appendChild(segment);
        }
    }

    // Enhanced version: Group consecutive bits into longer segments
    createOptimizedBinaryRay(charIndex, angleStep, binaryByte) {
        const angle = charIndex * angleStep - (Math.PI / 2);
        const totalRayLength = this.outerRadius - this.innerRadius;

        // Group consecutive bits
        const segments = this.groupConsecutiveBits(binaryByte);

        let currentPosition = this.innerRadius;

        segments.forEach(segment => {
            const segmentLength = (segment.count / 8) * totalRayLength;
            const segmentEnd = currentPosition + segmentLength;

            // Calculate segment endpoints
            const startX = this.centerX + currentPosition * Math.cos(angle);
            const startY = this.centerY + currentPosition * Math.sin(angle);
            const endX = this.centerX + segmentEnd * Math.cos(angle);
            const endY = this.centerY + segmentEnd * Math.sin(angle);

            // Create line segment
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', startX);
            line.setAttribute('y1', startY);
            line.setAttribute('x2', endX);
            line.setAttribute('y2', endY);
            line.setAttribute('class', `binary-segment ${segment.value === '1' ? 'bit-one' : 'bit-zero'}`);
            line.setAttribute('data-char-index', charIndex);
            line.setAttribute('data-segment-value', segment.value);
            line.setAttribute('data-segment-count', segment.count);

            this.svg.appendChild(line);
            currentPosition = segmentEnd;
        });
    }

    // Group consecutive identical bits
    groupConsecutiveBits(binaryByte) {
        const segments = [];
        let currentBit = binaryByte[0];
        let count = 1;

        for (let i = 1; i < binaryByte.length; i++) {
            if (binaryByte[i] === currentBit) {
                count++;
            } else {
                segments.push({ value: currentBit, count: count });
                currentBit = binaryByte[i];
                count = 1;
            }
        }

        // Add the last segment
        segments.push({ value: currentBit, count: count });
        return segments;
    }

    // Debug method to count current elements
    getDebugInfo() {
        const rays = this.svg.querySelectorAll('.star-ray').length;
        const segments = this.svg.querySelectorAll('.binary-segment').length;

        return {
            rays: rays,
            segments: segments,
            total: rays + segments
        };
    }
}

// Factory function to create radial star grid
export function createRadialStarGrid(svgElement) {
    return new RadialStarGrid(svgElement);
}
