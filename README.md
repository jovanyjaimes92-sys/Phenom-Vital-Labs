# Peptide Calculator - Refactored

A modular, maintainable peptide dosing calculator built with vanilla JavaScript and ES6 modules.

## File Structure

```
phenom-vital-labs/
├── index-refactored.html    # Main HTML file
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── main.js             # Entry point & event handling
│   ├── calculator.js       # Pure calculation functions
│   ├── ui.js               # DOM manipulation
│   ├── dataLoader.js       # JSON data fetching
│   └── pdfGenerator.js     # PDF generation
└── data/
    └── peptides.json       # Peptide database
```

## Key Improvements

### 1. Modular Architecture
- **Separation of concerns**: Each module has one responsibility
- **ES6 modules**: Import/export for clean dependencies
- **No global variables**: All state managed properly

### 2. Type Safety (JSDoc)
```javascript
/**
 * Calculate dose in mcg
 * @param {Object} peptide - Peptide object
 * @param {number} weightLbs - Weight in pounds
 * @param {number} age - Age in years
 * @param {string} level - 'low', 'med', or 'high'
 * @returns {number} Dose in mcg
 */
export function calculateDose(peptide, weightLbs, age, level = 'med') { ... }
```

### 3. Professional PDF Generation
- Uses jsPDF library (CDN loaded)
- Manual table drawing (no external plugins required)
- Error handling for library load failures

### 4. Bug Fixes Applied

#### Fixed: Missing `vialSize` parameter in `calculateVialsNeeded()`
**Before:**
```javascript
export function calculateVialsNeeded(peptide, doseMcg) {
    // Used peptide.vialSize which doesn't exist
}
```
**After:**
```javascript
export function calculateVialsNeeded(peptide, doseMcg, vialSizeMg = 5) {
    // Uses passed vialSizeMg parameter
}
```

#### Fixed: PDF generation dependency on autoTable
**Before:**
```javascript
// Required jspdf-autotable plugin
doc.autoTable({ ... });
```
**After:**
```javascript
// Manual table drawing - no dependencies
// Check if library loaded
if (typeof window.jspdf === 'undefined') { ... }
// Draw tables manually with doc.text() and doc.rect()
```

#### Fixed: Missing error handling in PDF generator
**Before:**
```javascript
// Would crash if jsPDF failed to load
const { jsPDF } = window.jspdf;
```
**After:**
```javascript
// Validates library availability
if (typeof window.jspdf === 'undefined') {
    console.error('jsPDF library not loaded');
    alert('PDF generation failed: library not loaded');
    return;
}
```

#### Fixed: Text overflow in PDF warnings
**Before:**
```javascript
// Could overflow page
peptide.warnings.forEach((warning) => {
    doc.text(`• ${warning}`, 20, y);
});
```
**After:**
```javascript
// Uses splitTextToSize for wrapping
const lines = doc.splitTextToSize(`• ${warning}`, 160);
lines.forEach((line) => {
    doc.text(line, 20, y);
    y += 5;
});
```

## Usage

1. Open `index-refactored.html` in a browser
2. Select a peptide from the dropdown
3. Enter weight and age
4. Click "Generate Protocol"
5. View results and download PDF

## Browser Requirements

- Modern browser with ES6 module support (Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+)
- Local file access (for `fetch()` to work with local JSON)

## Testing Checklist

### Calculation Tests
- [ ] BPC-157, 180 lbs, age 35 → Medium dose: 500 mcg
- [ ] Semaglutide, 200 lbs, age 45 → Medium dose: 500 mcg
- [ ] Vials calculation: Verify formula accuracy
- [ ] Syringe units: Check unit conversion

### UI Tests
- [ ] Peptide dropdown populates correctly
- [ ] Weight dropdown shows 100-350 lbs
- [ ] Age dropdown shows 18-80 years
- [ ] Results display with proper formatting
- [ ] Mobile responsive layout

### PDF Tests
- [ ] PDF generates without errors
- [ ] Tables display correctly
- [ ] Text doesn't overflow
- [ ] File saves with correct name
- [ ] All sections present (Patient, Peptide, Dosing, Warnings)

### Error Handling
- [ ] Graceful failure if JSON doesn't load
- [ ] Alert if peptide not selected
- [ ] PDF fallback if jsPDF fails

## Known Limitations

1. **Requires local server**: ES6 modules don't work with `file://` protocol. Use:
   - VS Code Live Server extension
   - Python: `python -m http.server 8000`
   - Node: `npx serve`

2. **peptides.json**: Currently uses sample data. Full extraction from original HTML needed for production.

3. **Browser compatibility**: IE11 not supported (uses ES6 modules)

## Future Enhancements

- [ ] Add unit tests (Jest)
- [ ] Implement service worker for offline support
- [ ] Add history/save functionality
- [ ] User preferences (default weight, age, etc.)
- [ ] Compare multiple peptides side-by-side

## Migration from Original

To migrate from `index.html`:

1. Extract all peptides from `index.html` into `data/peptides.json`
2. Copy `index-refactored.html` to `index.html`
3. Test all functionality
4. Deploy

## License

Same as original project.
