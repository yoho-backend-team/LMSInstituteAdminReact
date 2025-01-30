import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getImageUrl } from './imageUtils';

const generateIDCardPDF = (userData) => {
    const pageWidth = 280;
    const pageHeight = 400; 
    const padding = 50;
    const imageWidth = 70;
    const imageHeight = 70;
    const headerHeight = 60; 
    
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [pageWidth, pageHeight]
    });

    pdf.setFillColor(0, 150, 100);
    pdf.rect(0, 0, pageWidth, headerHeight, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text("Yoho Institute", pageWidth / 2, 30, { align: "center" });

    pdf.setFillColor(255);

    const imageUrl = userData.image ? getImageUrl(userData.image) : 'placeholder_image_url.jpg';
    pdf.addImage(imageUrl, 'JPEG', (pageWidth - imageWidth) / 2, headerHeight + 20, imageWidth, imageHeight);

    let currentY = headerHeight + imageHeight + 40;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(userData.name, pageWidth / 2, currentY, { align: "center" });
    pdf.setFontSize(12);
    
    currentY += 50;
    const addDetailLine = (label, value) => {
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${label}: `, padding, currentY);
        pdf.setFont("helvetica", "normal");
        pdf.text(value, padding + 80, currentY);
        currentY += 20;
    };

    addDetailLine("ID No", userData.student_id || "N/A");
    addDetailLine("Role", userData.role.identity);
    addDetailLine("E-mail", userData.email);
    addDetailLine("Phone", userData.contact);
    addDetailLine("Address", `${userData.address.address_line_one}, ${userData.address.city}` || "N/A");
    addDetailLine("State", userData.address.state);
    addDetailLine("Pin Code", userData.address.pin_code.toString());

    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text("Issued By: YOHO Institute", padding - 20, pageHeight - 10);

    pdf.save(`${userData.name.replace(" ", "_")}_ID_Card.pdf`);
};

export default generateIDCardPDF;
