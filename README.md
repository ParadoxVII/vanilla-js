# Vanilla JS Text to Binary Converter

A clean, minimalist text-to-binary converter built with vanilla JavaScript and ES6 modules. Features real-time conversion as you type and a professional, Apple-inspired design.

## ✨ Features

- **Real-time conversion** - Binary updates as you type
- **Clean, professional UI** - Minimalist design showcasing vanilla JS elegance
- **28 character limit** - Perfect for short text conversion
- **Click to copy** - Easy clipboard functionality
- **Keyboard shortcuts** - Escape to clear, Cmd/Ctrl+A to select all
- **Responsive design** - Works on desktop and mobile
- **ES6 modules** - Clean, modular code structure

## 🚀 Quick Start

Since this project uses ES6 modules, you need to run it through an HTTP server (not by opening the HTML file directly).

### Prerequisites

Choose one of these options (most computers already have at least one):

- **Python 3** (usually pre-installed on Mac/Linux)
- **Node.js** (if you want to use npx)
- **PHP** (if available)
- **VS Code** with Live Server extension

### Running the Project

**Option 1: Python HTTP Server (Recommended)**
```bash
# Navigate to project folder
cd vanilla-puzzle

# Start server
python3 -m http.server 3000

# Open browser to: http://localhost:3000
```

**Option 2: Node.js Live Server**
```bash
# Navigate to project folder
cd vanilla-puzzle

# Start server (no installation needed)
npx live-server --port=3000

# Opens automatically in browser
```

**Option 3: PHP Server**
```bash
# Navigate to project folder
cd vanilla-puzzle

# Start server
php -S localhost:3000

# Open browser to: http://localhost:3000
```

**Option 4: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Open project folder in VS Code
3. Right-click `index.html` → "Open with Live Server"

## 🗂️ Project Structure

```
vanilla-puzzle/
├── index.html              # Main HTML file
├── styles.css              # Clean, modern styling
├── README.md              # This file
└── src/
    ├── main.js             # Main application logic
    └── modules/
        ├── binaryConverter.js  # Binary conversion utilities
        └── domHelpers.js       # DOM manipulation helpers
```

## 🎯 Usage

1. Start typing in the input field
2. Watch binary conversion happen in real-time
3. Click the binary output to copy to clipboard
4. Use `Escape` to clear all text
5. Use `Cmd/Ctrl+A` to select all text in input

## 🔧 Why HTTP Server?

This project uses ES6 modules (`import`/`export`), which require an HTTP server due to browser security restrictions. This keeps the code clean and modular while remaining 100% vanilla JavaScript with no build tools or dependencies.

## 🌟 Technical Highlights

- **Pure vanilla JavaScript** - No frameworks, no dependencies
- **ES6 modules** - Clean, maintainable code structure
- **Modern CSS** - Professional design with Apple-inspired aesthetics
- **Responsive design** - Mobile-friendly interface
- **Real-time updates** - Reactive programming with vanilla JS

---

**Made with ❤️ using vanilla JavaScript**
