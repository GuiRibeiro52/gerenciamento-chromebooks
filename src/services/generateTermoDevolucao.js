import { jsPDF } from "jspdf";

const generateTermoDevolucao = (chromebook) => {
  
  const doc = new jsPDF();

  
  doc.setFontSize(20);
  doc.text("Termo de Devolução de Chromebook", 20, 20);

  
  doc.setFontSize(12);
  doc.text(`Número de Série: ${chromebook.serie}`, 20, 30);
  doc.text(`Número de Patrimônio: ${chromebook.patrimonio}`, 20, 40);
  
  
  doc.text(`Professor: ${chromebook.professorNome || "Nome do Professor"}`, 20, 50);

  
  doc.save(`Termo_Devolucao_${chromebook.serie}.pdf`);
};

export default generateTermoDevolucao;
