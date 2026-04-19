/**
 * Debug script for peptide calculator
 * Add this to check for JavaScript errors
 */

console.log('=== Peptide Calculator Debug ===');
console.log('Page loaded at:', new Date().toISOString());

// Check if required elements exist
const elements = {
    peptide: document.getElementById('peptide'),
    weight: document.getElementById('weight'),
    age: document.getElementById('age'),
    vialSize: document.getElementById('vialSize'),
    syringe: document.getElementById('syringe'),
    calculateBtn: document.getElementById('calculateBtn'),
    results: document.getElementById('results')
};

console.log('Elements found:', Object.entries(elements).map(([k, v]) => `${k}: ${v ? '✓' : '✗'}`).join(', '));

// Check for any JavaScript errors
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.message);
    console.error('File:', e.filename);
    console.error('Line:', e.lineno);
});

// Monitor dropdown clicks
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    
    const peptideSelect = document.getElementById('peptide');
    if (peptideSelect) {
        peptideSelect.addEventListener('click', () => {
            console.log('Peptide dropdown clicked');
            console.log('Options count:', peptideSelect.options.length);
            console.log('InnerHTML preview:', peptideSelect.innerHTML.substring(0, 200));
        });
        
        peptideSelect.addEventListener('focus', () => {
            console.log('Peptide dropdown focused');
        });
    }
});

console.log('=== Debug script loaded ===');
