import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getImageUrl } from './imageUtils';

const generateIDCardPDF = (userData) => {
    const pageWidth = 325;
    const pageHeight = 204;

    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [pageWidth, pageHeight]
    });

    const padding = 20;


    pdf.setFillColor(240, 240, 240);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    
    const imageUrl = userData.image ? getImageUrl(userData.image) : 'placeholder_image_url.jpg';
    pdf.addImage(imageUrl, 'JPEG', padding, padding, 100, 120);

    const detailsXStart = padding + 120;
    let currentY = padding + 10;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    const addDetailLine = (label, value) => {
        pdf.setFont("helvetica", "bold");
        pdf.text(`${label}:`, detailsXStart, currentY);
        pdf.setFont("helvetica", "normal");
        pdf.text(value, detailsXStart + 50, currentY);
        currentY += 20; 
    };

    addDetailLine("Name", userData.name);
    addDetailLine("Role", userData.role.identity);
    addDetailLine("Student ID", userData.student_id);
    addDetailLine("Email", userData.email);
    addDetailLine("Contact", userData.contact);
    addDetailLine("Address", `${userData.address.address_line_one}, ${userData.address.city}`);
    addDetailLine("State", userData.address.state);
    addDetailLine("Pin Code", userData.address.pin_code.toString());

    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text("Issued By: YOHO Institute", padding, pageHeight - 20);

    pdf.save(`${userData.name.replace(" ", "_")}_ID_Card.pdf`);
};

export default generateIDCardPDF;
