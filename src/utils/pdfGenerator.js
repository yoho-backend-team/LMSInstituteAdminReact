import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getImageUrl } from './imageUtils';
import backgroundImage from '../assets/images/Idcard-pdf/pdf-background.jpg';

const generateIDCardPDF = async (userData) => {
    const pageWidth = 260;
    const pageHeight = 380;
    const padding = 40;
    const imageSize = 90;
    const headerHeight = 50;
    console.log(userData);

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [pageWidth, pageHeight]
    });

    const getBase64FromURL = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result);
        });
    };

    const backgroundBase64 = await getBase64FromURL(backgroundImage);
    pdf.addImage(backgroundBase64, 'JPEG', 0, 0, pageWidth, pageHeight);

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text("Yoho Institute", pageWidth / 2, 35, { align: "center" });

    const imageUrl = userData.image ? getImageUrl(userData.image) : imagePlaceholder;
    pdf.addImage(imageUrl, 'JPEG', (pageWidth - imageSize) / 2, headerHeight, imageSize, imageSize, '', 'FAST');

    let currentY = headerHeight + imageSize + 25;
    pdf.setTextColor(0, 128, 0);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(String(userData.name), pageWidth / 2, currentY, { align: "center" });

    currentY += 25;
    pdf.setTextColor(0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(String(userData.role.identity), pageWidth / 2, currentY, { align: "center" });

    currentY += 50;

    const addDetailLine = (label, value, maxWidth = 150, h = 14) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${label}:`, padding, currentY);

        pdf.setFont('helvetica', 'normal');

        if (value) {
            let splitText = pdf.splitTextToSize(String(value), maxWidth);
            // Loop through the split text to add each line separately
            for (let i = 0; i < splitText.length; i++) {
                pdf.text(splitText[i], padding + 50, currentY);
                currentY += h; // Adjust the vertical spacing
            }
        } else {
            pdf.text('N/A', padding + 50, currentY);
            currentY += h; // Adjust the vertical spacing
        }
    };

    addDetailLine("ID No", userData.student_id || "N/A");
    addDetailLine("Role", userData.role.identity);
    addDetailLine("E-mail", userData.email);
    addDetailLine("Phone", userData.contact);
    addDetailLine("Address", `${userData.address.address_line_one},  ${userData.address.city}` || "N/A");
    addDetailLine("State", userData.address.state);
    addDetailLine("Pin Code", userData.address.pin_code.toString());

    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text("Issued By: YOHO Institute", padding - 25, pageHeight - 20);

    pdf.save(`${userData.name.replace(" ", "_")}_ID_Card.pdf`);
};

export default generateIDCardPDF;
