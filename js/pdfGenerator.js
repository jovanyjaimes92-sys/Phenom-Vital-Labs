/**
 * PDF Generator Module
 * Creates professional protocol PDFs using jsPDF
 * 
 * @module pdfGenerator
 */

/**
 * Generate protocol PDF
 * @param {Object} peptide
 * @param {Object} results
 * @param {Object} inputs
 * @param {boolean} previewMode - If true, opens in new tab instead of downloading
 */
export function generatePDF(peptide, results, inputs, previewMode = false) {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        console.error('jsPDF library not loaded');
        alert('PDF generation failed: library not loaded');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Check if it's a blend
    const isBlend = peptide.id.includes('blend') || peptide.category.toLowerCase().includes('blend');
    const unit = isBlend ? 'mg' : 'mcg';
    
    // Header - Blue theme
    doc.setFillColor(30, 64, 175); // Deep blue
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('Phenom Vital Labs', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    if (isBlend) {
        doc.text('Peptide Blend Protocol', 105, 30, { align: 'center' });
    } else {
        doc.text('Peptide Protocol', 105, 30, { align: 'center' });
    }
    
    // Generated info
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    const date = new Date().toLocaleDateString();
    doc.text(`Generated: ${date}`, 20, 50);
    
    // Patient info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Patient Information', 20, 65);
    
    // Patient info table (manual)
    let y = 75;
    doc.setFillColor(30, 64, 175);
    doc.rect(20, y - 6, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Parameter', 22, y);
    doc.text('Value', 120, y);
    
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.text('Weight', 22, y);
    doc.text(`${inputs.weight} lbs`, 120, y);
    y += 8;
    doc.text('Age', 22, y);
    doc.text(`${inputs.age} years`, 120, y);
    y += 15;
    
    // Peptide info
    doc.setFontSize(14);
    doc.text('Peptide Information', 20, y);
    y += 10;
    
    // Table header
    doc.setFillColor(30, 64, 175);
    doc.rect(20, y - 6, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Property', 22, y);
    doc.text('Value', 120, y);
    
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.text('Name', 22, y);
    doc.text(peptide.name, 120, y);
    y += 8;
    doc.text('Category', 22, y);
    doc.text(peptide.category, 120, y);
    y += 8;
    doc.text('Half-Life', 22, y);
    doc.text(peptide.halfLife || 'N/A', 120, y);
    y += 8;
    doc.text('Frequency', 22, y);
    doc.text(peptide.freq || 'N/A', 120, y);
    
    // Show blend info if applicable
    if (isBlend && peptide.inst) {
        y += 8;
        doc.text('Components', 22, y);
        // Extract component info from instructions
        const componentLine = peptide.inst.find(line => line.includes('Contains') || line.includes('mg'));
        if (componentLine) {
            doc.text(componentLine.replace('Contains ', '').substring(0, 40), 120, y);
        }
    }
    
    y += 15;
    
    // Dosing table
    doc.setFontSize(14);
    doc.text('Dosing Protocol', 20, y);
    y += 10;
    
    // Table header
    doc.setFillColor(30, 64, 175);
    doc.rect(20, y - 6, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Level', 22, y);
    doc.text('Dose', 70, y);
    doc.text('Units', 110, y);
    doc.text('Vials', 150, y);
    
    y += 10;
    doc.setTextColor(0, 0, 0);
    
    // Low dose
    doc.text('Low', 22, y);
    doc.text(`${results.doses.low} ${unit}`, 70, y);
    doc.text(`${results.syringeUnits.low || results.syringeUnits}`, 110, y);
    doc.text(`${results.vialsNeeded}`, 150, y);
    y += 8;
    
    // Med dose
    doc.text('Medium', 22, y);
    doc.text(`${results.doses.med} ${unit}`, 70, y);
    doc.text(`${results.syringeUnits.med || results.syringeUnits}`, 110, y);
    doc.text(`${results.vialsNeeded}`, 150, y);
    y += 8;
    
    // High dose
    doc.text('High', 22, y);
    doc.text(`${results.doses.high} ${unit}`, 70, y);
    doc.text(`${results.syringeUnits.high || results.syringeUnits}`, 110, y);
    doc.text(`${results.vialsNeeded}`, 150, y);
    y += 15;
    
    // Blend note
    if (isBlend) {
        doc.setFontSize(11);
        doc.setTextColor(30, 64, 175);
        doc.text('Note: Doses shown in milligrams (mg). Each vial contains pre-mixed blend.', 20, y);
        doc.setTextColor(0, 0, 0);
        y += 15;
    }
    
    // Warnings section
    if (peptide.warnings && peptide.warnings.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(200, 0, 0);
        doc.text('Important Warnings', 20, y);
        y += 10;
        
        doc.setFontSize(10);
        peptide.warnings.forEach((warning) => {
            // Handle text wrapping
            const lines = doc.splitTextToSize(`• ${warning}`, 160);
            lines.forEach((line) => {
                doc.text(line, 20, y);
                y += 5;
            });
            y += 2;
        });
    }
    
    // Disclaimer
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    const disclaimer = 'This protocol is generated for research purposes only. Consult a healthcare provider before use.';
    doc.text(disclaimer, 20, 280, { maxWidth: 170 });
    
    // Either preview or download
    if (previewMode) {
        // Open PDF in new tab
        const pdfData = doc.output('bloburl');
        window.open(pdfData, '_blank');
    } else {
        // Download
        doc.save(`${peptide.id}_protocol.pdf`);
    }
}
