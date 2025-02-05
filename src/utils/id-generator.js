import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getImageUrl } from './imageUtils';
import { imagePlaceholder } from './placeholders';

const generateStaffIDCardPDF = (userData) => {
    const pageWidth = 325;
    const pageHeight = 204;

    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [pageWidth, pageHeight]
    });

    // Add gradient background
    const gradient = pdf.context2d.createLinearGradient(0, 0, pageWidth, 0);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    pdf.setFillColor(gradient);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Add security pattern background
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    for(let i = 0; i < pageWidth; i += 25) {
        pdf.line(i, 0, i + pageHeight, pageHeight);
    }

    // Add header stripe
    pdf.setFillColor(0, 47, 87); // Dark blue
    pdf.rect(0, 0, pageWidth, 30, 'F');
    pdf.setFontSize(14);
    pdf.setTextColor(255, 255, 255);
    pdf.text("YOHO INSTITUTE", pageWidth/2, 20, { align: 'center' });

    // Add photo frame
    const photoX = 20;
    const photoY = 50;
    const photoWidth = 100;
    const photoHeight = 120;
    
    // Photo background
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(
        photoX - 5, photoY - 5, 
        photoWidth + 10, photoHeight + 10, 
        5, 5, 'F'
    );
    
    const imageUrl = userData.image ? getImageUrl(userData.image) : imagePlaceholder;
    pdf.addImage(imageUrl, 'JPEG', photoX, photoY, photoWidth, photoHeight);

    // Add QR code placeholder (replace with actual QR code implementation)
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(pageWidth - 70, photoY, 60, 60, 5, 5, 'F');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(8);
    pdf.text("QR CODE", pageWidth - 40, photoY + 35, { align: 'center' });

    // User details styling
    const detailsXStart = 140;
    let currentY = 60;
    
    // Name styling
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 47, 87);
    pdf.text(userData.name.toUpperCase(), detailsXStart, currentY);
    currentY += 25;

    // Role styling
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(100, 100, 100);
    pdf.text(userData.role.identity.toUpperCase(), detailsXStart, currentY);
    currentY += 40;

    // Details grid
    const columnWidth = 140;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    
    const details = [
        { label: "Staff ID", value: userData.staff_id || "N/A" },
        { label: "Email", value: userData.email },
        { label: "Contact", value: userData.contact },
        { label: "Address", value: `${userData.address.address_line_one}, ${userData.address.city}` },
        { label: "State", value: userData.address.state },
        { label: "PIN Code", value: userData.address.pin_code.toString() },
    ];

    details.forEach(({ label, value }, index) => {
        const col = index % 2 === 0 ? detailsXStart : detailsXStart + columnWidth;
        const rowY = currentY + Math.floor(index/2) * 20;

        pdf.setTextColor(0, 47, 87);
        pdf.text(`${label}:`, col, rowY);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        pdf.text(value, col + 45, rowY);
    });

    // Footer section
    pdf.setFillColor(0, 47, 87);
    pdf.rect(0, pageHeight - 30, pageWidth, 30, 'F');
    
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text("ISSUED DATE: " + new Date().toLocaleDateString(), 20, pageHeight - 15);
    pdf.text("AUTHORIZED SIGNATURE", pageWidth - 120, pageHeight - 15, { align: 'right' });

    // Security hologram effect
    pdf.setGState(new pdf.GState({ opacity: 0.3 }));
    pdf.setDrawColor(150, 150, 150);
    pdf.setLineWidth(2);
    pdf.line(pageWidth - 100, 40, pageWidth - 20, 80);
    pdf.setGState(new pdf.GState({ opacity: 1 }));

    pdf.save(`${userData.name.replace(" ", "_")}_ID_Card_${Date.now()}.pdf`);
};

export default generateStaffIDCardPDF;