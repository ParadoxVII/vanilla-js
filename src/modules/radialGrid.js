// Radial Grid - Challenge 1: Create star with N rays based on character count
export class RadialStarGrid {
    constructor(svgElement) {
        this.svg = svgElement;
        this.centerX = 100; // Center of 200x200 viewBox
        this.centerY = 100;
        this.innerRadius = 20; // Start of rays
        this.outerRadius = 80; // End of rays
        this.maxRays = 28; // Maximum number of characters

        this.init();
    }

    init() {
        // Clear any existing content
        this.svg.innerHTML = '';

        // Add center dot
        this.addCenterDot();
    }

    addCenterDot() {
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', this.centerX);
        center.setAttribute('cy', this.centerY);
        center.setAttribute('class', 'star-center');
        this.svg.appendChild(center);
    }

    // Challenge 1: Create N rays for N characters
    createStar(numCharacters) {
        // Clear existing rays (keep center dot)
        this.clearRays();

        if (numCharacters === 0) {
            return; // No rays for empty input
        }

        // Calculate angle between rays
        const angleStep = (2 * Math.PI) / numCharacters;

        // Create rays
        for (let i = 0; i < numCharacters; i++) {
            this.createRay(i, angleStep);
        }
    }

    createRay(index, angleStep) {
        const angle = index * angleStep - (Math.PI / 2); // Start from top (12 o'clock)

        // Calculate ray endpoints
        const startX = this.centerX + this.innerRadius * Math.cos(angle);
        const startY = this.centerY + this.innerRadius * Math.sin(angle);
        const endX = this.centerX + this.outerRadius * Math.cos(angle);
        const endY = this.centerY + this.outerRadius * Math.sin(angle);

        // Create line element
        const ray = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ray.setAttribute('x1', startX);
        ray.setAttribute('y1', startY);
        ray.setAttribute('x2', endX);
        ray.setAttribute('y2', endY);
        ray.setAttribute('class', 'star-ray');
        ray.setAttribute('data-index', index);

        this.svg.appendChild(ray);
    }

    clearRays() {
        // Remove all rays but keep center dot
        const rays = this.svg.querySelectorAll('.star-ray');
        rays.forEach(ray => ray.remove());
    }

    // Get current number of rays
    getRayCount() {
        return this.svg.querySelectorAll('.star-ray').length;
    }
}

// Factory function to create radial star grid
export function createRadialStarGrid(svgElement) {
    return new RadialStarGrid(svgElement);
}
