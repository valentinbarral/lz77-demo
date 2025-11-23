# LZ77 Interactive Demo (Deflate & Inflate)

An interactive, step-by-step visualization of the LZ77 compression algorithm, demonstrating both the encoding (deflate) and decoding (inflate) processes.

## Overview

This web application provides an educational tool to understand how the LZ77 compression algorithm works. LZ77 is a lossless data compression algorithm that forms the basis of many modern compression formats including DEFLATE (used in ZIP, gzip, and PNG).

## Features

### LZ77 Encoder (Deflate)
- **Interactive Step-by-Step Execution**: Walk through the compression process one step at a time
- **Auto-play Mode**: Watch the algorithm run automatically with visual feedback
- **Visual Representation**: 
  - Color-coded sliding window showing search buffer and look-ahead buffer
  - Real-time highlighting of pattern matching attempts
  - Visual feedback for successful matches and failures
- **Decision Log**: Track each decision made by the algorithm
- **Token Output**: See the compressed output as a sequence of literals ('C') and back-references <distance, length>

### LZ77 Decoder (Inflate)
- **Token Processing**: Step through the decompression of encoded sequences
- **Visual Reconstruction**: Watch as the original text is rebuilt character by character
- **Copy Visualization**: See exactly where data is copied from (source) and to (destination)
- **Overlap Handling**: Correctly handles cases where distance < length (self-referential copies)

### Additional Features
- **Multi-language Support**: Interface available in English, Spanish (Español), and Galician (Galego)
- **Dark/Light Theme**: Toggle between dark and light display modes
- **Customizable Input**: Test with your own text strings to see how they compress
- **Educational Messages**: Detailed explanations of each step in the algorithm

## How to Use

### Running the Demo
1. Open `index.html` in a modern web browser
2. No installation or build process required - it's a standalone HTML/CSS/JavaScript application

### Using the Encoder
1. Enter your text in the "Input" field (or use the default example)
2. Click "Next step ▶" to execute one step of the algorithm
3. Use "Auto play ⏯" to run the algorithm automatically
4. Click "Reset ↺" to start over with the same or different input

### Using the Decoder
1. The encoder output automatically populates the decoder input
2. Alternatively, manually enter a token sequence (format: `'A' 'B' <1,2> 'C'`)
3. Use the same step/auto/reset controls to watch the decoding process

### Understanding the Visualization

**Encoder Colors:**
- **Blue background**: Search window (sliding window/history buffer)
- **Blue border**: Current character(s) being checked
- **Green background**: Match found in the search window
- **Red background**: No match found, will emit literal

**Decoder Colors:**
- **Gray background**: Already decoded text
- **Yellow background**: Source position (reading from)
- **Green background**: Destination position (writing to)

## Algorithm Details

### LZ77 Encoding Process
1. Maintain a sliding window over previously processed data
2. Try to find the longest match in the window for the current position
3. If a match is found: emit a back-reference <distance, length>
4. If no match: emit the literal character 'C'
5. Move forward and repeat

### LZ77 Decoding Process
1. Read each token from the encoded sequence
2. For literals: append the character directly to output
3. For back-references <d, l>: copy 'l' characters from position 'd' bytes back in the output buffer
4. Continue until all tokens are processed

## Configuration

The algorithm parameters can be modified in `script.js`:
- `WINDOW_SIZE`: Size of the sliding window (default: 16)
- `MIN_MATCH_LENGTH`: Minimum match length to emit a reference (default: 1)

## Technical Stack

- **HTML5**: Structure and layout
- **CSS3**: Styling with custom properties for theming
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage**: Persists language and theme preferences

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Custom Properties (CSS Variables)
- LocalStorage API

## Educational Use

This demo is ideal for:
- Computer Science students learning about compression algorithms
- Teaching data structures (sliding windows, pattern matching)
- Understanding how ZIP, gzip, and PNG compression work
- Algorithm visualization and step-by-step debugging

## Files Structure

```
lz77-demo/
├── index.html          # Main HTML structure
├── script.js           # LZ77 encoder/decoder logic
├── styles.css          # Styling and themes
├── translations.js     # Multi-language support
└── README.md          # This file
```

## License

This project is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

**Copyright © 2025 Valentin Barral**

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution** — You must give appropriate credit to Valentin Barral, provide a link to the license, and indicate if changes were made.

For more details, see: https://creativecommons.org/licenses/by/4.0/

## Author

**Valentin Barral**

## Contributing

Contributions, suggestions, and feedback are welcome! This is an educational project aimed at making compression algorithms more accessible and understandable.

## Acknowledgments

LZ77 was published by Abraham Lempel and Jacob Ziv in 1977 in the paper "A Universal Algorithm for Sequential Data Compression" (IEEE Transactions on Information Theory).

