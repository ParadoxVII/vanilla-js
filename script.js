// DOM Elements
const title = document.getElementById('title');
const message = document.getElementById('message');
const clickButton = document.getElementById('clickMe');
const output = document.getElementById('output');

// State
let clickCount = 0;

// Functions
function updateTitle() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    title.style.color = randomColor;
}

function generateRandomMessage() {
    const messages = [
        "🎉 Awesome! You clicked the button!",
        "✨ JavaScript is working perfectly!",
        "🚀 Great job! Keep exploring!",
        "💡 You're getting the hang of this!",
        "🎯 Nice click! Try clicking again!",
        "🌟 Fantastic! The magic is happening!",
        "🎈 Woohoo! Interactive web development!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function handleButtonClick() {
    clickCount++;

    // Update output
    output.textContent = `${generateRandomMessage()} (Click #${clickCount})`;
    output.classList.add('active');

    // Update title color
    updateTitle();

    // Add some animation feedback
    clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickButton.style.transform = 'scale(1)';
    }, 100);

    // Special message for milestone clicks
    if (clickCount === 5) {
        setTimeout(() => {
            alert('🎊 Congratulations! You\'ve clicked 5 times! You\'re a clicking champion!');
        }, 500);
    } else if (clickCount === 10) {
        setTimeout(() => {
            alert('🏆 Amazing! 10 clicks! You really love this button!');
        }, 500);
    }
}

// Event Listeners
clickButton.addEventListener('click', handleButtonClick);

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Vanilla JavaScript app loaded successfully!');

    // Set initial output message
    output.textContent = 'Click the button above to see the magic! ✨';

    // Add a subtle entrance animation
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '0';
        document.querySelector('.container').style.transform = 'translateY(20px)';
        document.querySelector('.container').style.transition = 'all 0.5s ease';

        setTimeout(() => {
            document.querySelector('.container').style.opacity = '1';
            document.querySelector('.container').style.transform = 'translateY(0)';
        }, 100);
    }, 100);
});

// Optional: Add keyboard support
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleButtonClick();
    }
});
