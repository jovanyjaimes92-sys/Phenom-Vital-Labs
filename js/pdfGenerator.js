/**
 * PDF Generator Module - User Friendly Version
 * Creates printable protocol cards for easy reference
 * 
 * @module pdfGenerator
 */

/**
 * Generate protocol PDF - Simple and clean
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
    const isFixed = peptide.fixed === true;
    const unit = isFixed ? 'mg' : 'mcg';
    
    // Colors
    const primaryBlue = [30, 64, 175];
    const darkBlue = [30, 58, 138];
    const lightBlue = [239, 246, 255];
    const cream = [254, 252, 243];
    const gray = [107, 114, 128];
    const successGreen = [16, 185, 129];
    const warningOrange = [245, 158, 11];
    const dangerRed = [239, 68, 68];
    
    // Page dimensions
    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    let y = 15;
    
    // === HEADER ===
    doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.roundedRect(margin, y, contentWidth, 25, 4, 4, 'F');
    
    // Logo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PHENOM VITAL LABS', margin + 5, y + 14);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Personal Peptide Protocol', margin + 5, y + 21);
    
    // Date badge
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.roundedRect(pageWidth - margin - 45, y + 5, 45, 15, 3, 3, 'F');
    doc.setFontSize(8);
    doc.text(date, pageWidth - margin - 22, y + 15, { align: 'center' });
    
    // === PEPTIDE INFO CARD ===
    y += 32;
    doc.setFillColor(cream[0], cream[1], cream[2]);
    doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.setLineWidth(0.8);
    doc.roundedRect(margin, y, contentWidth, 35, 4, 4, 'FD');
    
    // Peptide name
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(peptide.name.toUpperCase(), margin + 5, y + 12);
    
    // Category
    doc.setFontSize(8);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(peptide.category, margin + 5, y + 19);
    
    // Quick stats
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(`Half-Life: ${peptide.halfLife || 'N/A'}`, margin + 5, y + 28);
    doc.text(`Frequency: ${peptide.freq || 'N/A'}`, margin + 70, y + 28);
    doc.text(`Cycle: ${peptide.wks} weeks`, margin + 130, y + 28);
    
    // === DOSING CARDS ===
    y += 42;
    
    // Section title
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('YOUR DOSING OPTIONS', margin, y);
    
    y += 8;
    
    const colWidth = contentWidth / 3;
    
    // Three dose cards
    ['CONSERVATIVE', 'STANDARD', 'ADVANCED'].forEach((label, i) => {
        const x = margin + (i * colWidth) + 2;
        const isRec = i === 1;
        
        // Card background
        if (isRec) {
            doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
        } else {
            doc.setFillColor(250, 250, 250);
            doc.setDrawColor(gray[0], gray[1], gray[2]);
            doc.setLineWidth(0.3);
        }
        doc.roundedRect(x - 2, y, colWidth - 4, 50, 3, 3, isRec ? 'F' : 'FD');
        
        // Label
        doc.setTextColor(isRec ? 255 : gray[0], gray[1], gray[2]);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(label, x + (colWidth - 4) / 2 - 2, y + 8, { align: 'center' });
        
        // Recommended badge
        if (isRec) {
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(x + 15, y + 11, colWidth - 34, 8, 2, 2, 'F');
            doc.setTextColor(successGreen[0], successGreen[1], successGreen[2]);
            doc.setFontSize(7);
            doc.text('RECOMMENDED', x + (colWidth - 4) / 2 - 2, y + 17, { align: 'center' });
        }
        
        // Dose value
        const dose = i === 0 ? results.doses.low : i === 1 ? results.doses.med : results.doses.high;
        const units = i === 0 ? results.syringeUnits.low : i === 1 ? results.syringeUnits.med : results.syringeUnits.high;
        
        doc.setTextColor(isRec ? 255 : darkBlue[0], darkBlue[1], darkBlue[2]);
        doc.setFontSize(isRec ? 20 : 16);
        doc.setFont('helvetica', 'bold');
        
        // Format dose display
        let doseDisplay;
        if (isFixed) {
            // For mg, show as mg directly
            if (dose < 1) {
                doseDisplay = (dose * 1000).toFixed(0);
                doc.text(doseDisplay, x + (colWidth - 4) / 2 - 2, y + 30, { align: 'center' });
                doc.setFontSize(8);
                doc.text('mcg', x + (colWidth - 4) / 2 - 2, y + 37, { align: 'center' });
            } else {
                doseDisplay = dose.toFixed(1).replace(/\.0$/, '');
                doc.text(doseDisplay, x + (colWidth - 4) / 2 - 2, y + 30, { align: 'center' });
                doc.setFontSize(8);
                doc.text(unit, x + (colWidth - 4) / 2 - 2, y + 37, { align: 'center' });
            }
        } else {
            doseDisplay = dose.toLocaleString();
            doc.text(doseDisplay, x + (colWidth - 4) / 2 - 2, y + 30, { align: 'center' });
            doc.setFontSize(8);
            doc.text(unit, x + (colWidth - 4) / 2 - 2, y + 37, { align: 'center' });
        }
        
        // Syringe draw
        doc.setTextColor(isRec ? 220 : gray[0], gray[1], gray[2]);
        doc.setFontSize(7);
        doc.text(`Draw ${units} units`, x + (colWidth - 4) / 2 - 2, y + 45, { align: 'center' });
    });
    
    // === SYRINGE VISUAL GUIDE ===
    y += 60;
    
    doc.setFillColor(lightBlue[0], lightBlue[1], lightBlue[2]);
    doc.roundedRect(margin, y, contentWidth, 38, 4, 4, 'F');
    
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('SYRINGE GUIDE', margin + 5, y + 8);
    
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    const recUnits = results.syringeUnits.med;
    const percent = (recUnits / inputs.syringe) * 100;
    
    doc.text(`For STANDARD dose: Pull to ${recUnits} units on your ${inputs.syringe}U syringe`, margin + 5, y + 18);
    doc.text(`That's ${percent.toFixed(0)}% of the syringe barrel`, margin + 5, y + 26);
    
    // Visual bar
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(margin + 5, y + 30, contentWidth - 10, 5, 2, 2, 'F');
    
    const fillWidth = ((contentWidth - 10) * percent) / 100;
    doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.roundedRect(margin + 5, y + 30, fillWidth, 5, 2, 2, 'F');
    
    // Markers
    doc.setFillColor(255, 255, 255);
    doc.circle(margin + 5, y + 32.5, 3, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(6);
    doc.text('0', margin + 5, y + 38, { align: 'center' });
    
    doc.setFillColor(255, 255, 255);
    doc.circle(margin + 5 + fillWidth, y + 32.5, 4, 'F');
    doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(`${recUnits}U`, margin + 5 + fillWidth, y + 36, { align: 'center' });
    
    // === QUICK INSTRUCTIONS ===
    y += 48;
    
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('HOW TO USE', margin, y);
    
    y += 8;
    
    const steps = [
        `1. Mix your vial: ${isFixed ? inputs.vialSize + 'mg' : inputs.vialSize + 'mcg'} with ${inputs.syringe / 10}ml bacteriostatic water`,
        '2. Draw air into syringe equal to your dose units',
        `3. Inject air into vial, then draw ${results.syringeUnits.med} units of peptide`,
        '4. Inject subcutaneously (belly fat area)',
        `5. Take ${peptide.freq} for ${peptide.wks} weeks`
    ];
    
    steps.forEach((step, i) => {
        doc.setFillColor(i % 2 === 0 ? cream[0] : 255, i % 2 === 0 ? cream[1] : 255, i % 2 === 0 ? cream[2] : 255);
        doc.roundedRect(margin, y + (i * 12), contentWidth, 11, 2, 2, 'F');
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(step, margin + 4, y + 7 + (i * 12));
    });
    
    y += 70;
    
    // === SAFETY BOX ===
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(dangerRed[0], dangerRed[1], dangerRed[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'FD');
    
    doc.setTextColor(dangerRed[0], dangerRed[1], dangerRed[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SAFETY FIRST', margin + 5, y + 8);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('• Start with Conservative dose if new to peptides', margin + 5, y + 15);
    doc.text('• Keep this protocol for reference', margin + 5, y + 21);
    doc.text('• Consult healthcare provider before starting', margin + 5, y + 27);
    
    y += 38;
    
    // === FOOTER ===
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by Phenom Vital Labs Peptide Calculator | For research purposes only', margin, 290);
    doc.text('Not medical advice. Consult healthcare provider.', margin, 295);
    
    // Output
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    if (previewMode) {
        window.open(pdfUrl, '_blank');
    } else {
        doc.save(`${peptide.name.replace(/\s+/g, '_')}_Protocol.pdf`);
    }
}

export default { generatePDF };
