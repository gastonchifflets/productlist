import { jsPDF } from 'jspdf';
import { Button } from 'react-bootstrap';
import 'jspdf-autotable';

export default function ToPDF({ datos, headers }) {

    const today = (new Date()).toLocaleDateString();

    const newDatos = datos.map(dato => [dato.productName, dato.bagsAmount, dato.costPrice, dato.price50, dato.price40, dato.price30]);
    const doc = new jsPDF();
    const handlePrintPDF = () => {
        doc.autoTable({
            head: [headers],
            body: newDatos,
        });
        doc.save(`Lista de precios ${today}.pdf`);
    };

    return (
        <Button variant='info' onClick={() => handlePrintPDF()}>
            Imprimir PDF
        </Button>   
    );
}