import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TEMPLES } from '../data/templeEvents';
import { getEventStatus } from './eventStatus';

/**
 * Generate and download a formatted PDF Panchangam Calendar document
 * @param {Object} options
 * @param {Array} options.events - Array of event objects
 * @param {string} options.selectedMonth - 'all' or 'YYYY-MM'
 * @param {string} options.selectedTemple - 'all' or temple ID
 * @param {string} options.lang - 'en' or 'te'
 */
export function exportPanchangamPdf({ events = [], selectedMonth = 'all', selectedTemple = 'all', lang = 'en' }) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // Header Banner Background (Deep Navy / Crimson accent)
    doc.setFillColor(11, 14, 20); // #0B0E14
    doc.rect(0, 0, pageWidth, 38, 'F');

    // Decorative Golden Line
    doc.setFillColor(212, 175, 55); // #D4AF37
    doc.rect(0, 38, pageWidth, 2, 'F');

    // Title
    doc.setTextColor(255, 215, 0); // #FFD700
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('TIRUMALA TIRUPATI DIVYA UTSAVAM', pageWidth / 2, 14, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('Official TTD Event Calendar & Festival Schedule 2026-2027', pageWidth / 2, 22, { align: 'center' });

    // Filter Subtitle Details
    let filterText = 'All Shrines';
    if (selectedTemple !== 'all') {
      const templeObj = TEMPLES.find(t => t.id === selectedTemple);
      if (templeObj) filterText = templeObj.name;
    }
    let monthText = selectedMonth === 'all' ? 'Full Year 2026-2027' : `Month: ${selectedMonth}`;

    doc.setFontSize(9);
    doc.setTextColor(212, 175, 55);
    doc.text(`Scope: ${filterText} | ${monthText} | Export Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth / 2, 30, { align: 'center' });

    // Filter Events
    let filtered = (events || []).filter(evt => {
      if (!evt) return false;
      if (selectedTemple !== 'all' && evt.templeId !== selectedTemple) return false;
      if (selectedMonth !== 'all' && evt.startDate && !evt.startDate.startsWith(selectedMonth)) return false;
      return true;
    });

    // Sort chronologically
    filtered.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));

    // Prepare AutoTable Data
    const tableHead = [['#', 'Date Range', 'Festival Name', 'Sacred Shrine', 'Status', 'Details & Tithi']];
    const tableRows = filtered.map((evt, idx) => {
      const statusObj = getEventStatus(evt.startDate, evt.endDate);
      const templeObj = TEMPLES.find(t => t.id === evt.templeId);
      const templeName = templeObj ? templeObj.name : 'Tirumala Temple';

      let dateStr = evt.startDate || '';
      if (evt.endDate && evt.endDate !== evt.startDate) {
        dateStr += ` to\n${evt.endDate}`;
      }

      const titleText = evt.title || 'Temple Utsavam';
      const descText = evt.description || evt.category || 'Special Festival Ritual';
      const statusLabel = (statusObj && statusObj.status) ? statusObj.status.toUpperCase() : 'UPCOMING';

      return [
        (idx + 1).toString(),
        dateStr,
        titleText,
        templeName,
        statusLabel,
        descText
      ];
    });

    // Render Table
    autoTable(doc, {
      startY: 45,
      head: tableHead,
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [20, 25, 35],
        textColor: [255, 215, 0],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center'
      },
      bodyStyles: {
        textColor: [30, 30, 30],
        fontSize: 8.5,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 26, halign: 'center' },
        2: { cellWidth: 45, fontStyle: 'bold' },
        3: { cellWidth: 35 },
        4: { cellWidth: 24, halign: 'center', fontStyle: 'bold' },
        5: { cellWidth: 'auto' }
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      didParseCell: function (data) {
        if (data.section === 'body' && data.column.index === 4) {
          const val = String(data.cell.raw || '');
          if (val.includes('LIVE')) {
            data.cell.styles.textColor = [220, 38, 38]; // Red
          } else if (val.includes('UPCOMING')) {
            data.cell.styles.textColor = [16, 185, 129]; // Green
          } else {
            data.cell.styles.textColor = [100, 116, 139]; // Slate
          }
        }
      }
    });

    // Footer on each page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        `Tirumala Tirupati Devasthanams - Divya Utsavam Portal | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 8,
        { align: 'center' }
      );
    }

    // Trigger Download
    const filename = selectedMonth === 'all' 
      ? `Tirumala_Calendar_2026_2027.pdf` 
      : `Tirumala_Calendar_${selectedMonth}.pdf`;
      
    doc.save(filename);
  } catch (err) {
    console.error('PDF Generation Error:', err);
    alert('Unable to generate PDF. Please try again.');
  }
}
