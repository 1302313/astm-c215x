import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { ModulusResult, SpecimenGeometry } from '@/types/astm-c215';

export async function exportReport(
  chartElementId: string,
  result: ModulusResult,
  metadata: SpecimenGeometry
): Promise<void> {
  const chartElement = document.getElementById(chartElementId);
  if (!chartElement) {
    throw new Error('Chart element not found');
  }

  // Capture chart as image
  const canvas = await html2canvas(chartElement);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  
  // Header
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ASTM C215 Modulus Report', 10, 20);
  
  // Subheader
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80);
  pdf.text('Dynamic Modulus of Elasticity via Resonant Frequency Method', 10, 28);
  
  // Divider line
  pdf.setDrawColor(150);
  pdf.setLineWidth(0.5);
  pdf.line(10, 32, 200, 32);
  
  // Result data
  pdf.setTextColor(0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${result.mode.charAt(0).toUpperCase() + result.mode.slice(1)} Mode`, 10, 42);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Frequency: ${result.frequency} Hz`, 10, 50);
  pdf.text(`Modulus: ${result.modulus.toFixed(3)} ${result.unit}`, 10, 57);
  
  // Specimen data
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Specimen Data:', 10, 70);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Type: ${metadata.type}`, 10, 77);
  pdf.text(`Length: ${metadata.length} m`, 10, 83);
  pdf.text(`Mass: ${metadata.mass} kg`, 10, 89);
  pdf.text(`Density: ${metadata.density} kg/m³`, 10, 95);
  
  if (metadata.type === 'beam' && metadata.width && metadata.depth) {
    pdf.text(`Width: ${metadata.width} m`, 10, 101);
    pdf.text(`Depth: ${metadata.depth} m`, 10, 107);
  } else if (metadata.type === 'cylinder' && metadata.diameter) {
    pdf.text(`Diameter: ${metadata.diameter} m`, 10, 101);
  }
  
  // Chart image
  pdf.addImage(imgData, 'PNG', 10, 115, 180, 90);
  
  // Footer
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(100);
  pdf.text('Based on ASTM C215-14: Standard Test Method for Fundamental', 10, 215);
  pdf.text('Transverse, Longitudinal, and Torsional Resonant Frequencies', 10, 220);
  pdf.text('of Concrete Specimens', 10, 225);
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 10, 235);
  
  pdf.save(`astm-c215-${result.mode}-report.pdf`);
}

export async function exportCombinedReport(
  chartElementId: string,
  results: ModulusResult[],
  metadata: SpecimenGeometry,
  poissonsRatio?: number
): Promise<void> {
  const chartElement = document.getElementById(chartElementId);
  if (!chartElement) {
    throw new Error('Chart element not found');
  }

  const canvas = await html2canvas(chartElement);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  
  // Header
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ASTM C215 Unified Modulus Report', 10, 20);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80);
  pdf.text('Complete Dynamic Modulus Analysis', 10, 28);
  
  pdf.setDrawColor(150);
  pdf.setLineWidth(0.5);
  pdf.line(10, 32, 200, 32);
  
  // Specimen data
  pdf.setTextColor(0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Specimen Data:', 10, 42);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Type: ${metadata.type}`, 10, 49);
  pdf.text(`Length: ${metadata.length} m | Mass: ${metadata.mass} kg | Density: ${metadata.density} kg/m³`, 10, 55);
  
  if (metadata.type === 'beam' && metadata.width && metadata.depth) {
    pdf.text(`Width: ${metadata.width} m | Depth: ${metadata.depth} m`, 10, 61);
  } else if (metadata.type === 'cylinder' && metadata.diameter) {
    pdf.text(`Diameter: ${metadata.diameter} m`, 10, 61);
  }
  
  // Results table
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Calculated Moduli:', 10, 72);
  
  let y = 80;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  results.forEach(result => {
    const modeName = result.mode.charAt(0).toUpperCase() + result.mode.slice(1);
    pdf.text(`${modeName}: ${result.modulus.toFixed(3)} GPa @ ${result.frequency} Hz`, 10, y);
    y += 6;
  });
  
  if (poissonsRatio !== undefined) {
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Poisson's Ratio (μ): ${poissonsRatio.toFixed(4)}`, 10, y + 3);
    y += 9;
  }
  
  // Chart
  pdf.addImage(imgData, 'PNG', 10, y + 5, 180, 90);
  
  // Footer
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(100);
  pdf.text('Based on ASTM C215-14 Standard', 10, 215);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 10, 235);
  
  pdf.save('astm-c215-combined-report.pdf');
}
