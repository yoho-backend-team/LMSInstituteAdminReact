import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getImageUrl } from './imageUtils';

const generateIDCardPDF = async (userData) => {
    const pageWidth = 260;
    const pageHeight = 380;
    const padding = 40;
    const imageWidth = 70;
    const imageHeight = 70;
    const headerHeight = 50;
    
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [pageWidth, pageHeight]
    });

    const backgroundImageUrl = 'https://png.pngtree.com/background/20210714/original/pngtree-blue-business-atmosphere-line-board-background-material-picture-image_1216242.jpg';

    const getBase64FromURL = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result);
        });
    };

    const backgroundBase64 = await getBase64FromURL(backgroundImageUrl);

    pdf.addImage(backgroundBase64, 'JPEG', 0, 0, pageWidth, pageHeight);

    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text("Yoho Institute", pageWidth / 2, 35, { align: "center" });

    const imageUrl = userData.image ? getImageUrl(userData.image) : 'placeholder_image_url.jpg';
    pdf.addImage(imageUrl, 'JPEG', (pageWidth - imageWidth) / 2, headerHeight + 10, imageWidth, imageHeight);

    let currentY = headerHeight + imageHeight + 40;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(userData.name, pageWidth / 2, currentY, { align: "center" });

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
    pdf.text("Issued By: YOHO Institute", padding - 25, pageHeight - 20);

    pdf.save(`${userData.name.replace(" ", "_")}_ID_Card.pdf`);
};

export default generateIDCardPDF;
