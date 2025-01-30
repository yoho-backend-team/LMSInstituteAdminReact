import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getImageUrl } from './imageUtils';

const generateIDCardPDF = (userData) => {
    const pageWidth = 300;
    const pageHeight = 500;
    const padding = 20;
    const imageWidth = 100;
    const imageHeight = 100;
    
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [pageWidth, pageHeight]
    });

    pdf.setFillColor(0, 150, 100);
    pdf.rect(0, 0, pageWidth, 100, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text("Yoho Institute", pageWidth / 2, 40, { align: "center" });

    pdf.setFillColor(255);

    const imageUrl = userData.image ? getImageUrl(userData.image) : 'placeholder_image_url.jpg';
    pdf.addImage(imageUrl, 'JPEG', (pageWidth - imageWidth) / 2, 110, imageWidth, imageHeight);

    let currentY = 230;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
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

    addDetailLine("Role", userData.role.identity);
    addDetailLine("ID No", userData.student_id || "N/A");
    addDetailLine("E-mail", userData.email);
    addDetailLine("Phone", userData.contact);
    addDetailLine("Address", `${userData.address.address_line_one}, ${userData.address.city}`);
    addDetailLine("State", userData.address.state);
    addDetailLine("Pin Code", userData.address.pin_code.toString());

    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text("Issued By: YOHO Institute", padding, pageHeight - 20);

    pdf.save(`${userData.name.replace(" ", "_")}_ID_Card.pdf`);
};

export default generateIDCardPDF;
