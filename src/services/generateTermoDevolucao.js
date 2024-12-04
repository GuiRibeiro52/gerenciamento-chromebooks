import { jsPDF } from "jspdf";

const generateTermoDevolucao = (chromebook) => {
  // Inicializando o PDF
  const doc = new jsPDF();

  // Título do documento
  doc.setFontSize(20);
  doc.text("Termo de Devolução de Chromebook", 20, 20);

  // Adicionando os detalhes do Chromebook e do professor
  doc.setFontSize(12);
  doc.text(`Número de Série: ${chromebook.serie}`, 20, 30);
  doc.text(`Número de Patrimônio: ${chromebook.patrimonio}`, 20, 40);
  
  // Garantir que o nome do professor seja exibido corretamente
  doc.text(`Professor: ${chromebook.professorNome || "Nome do Professor"}`, 20, 50);

  // Gerar o PDF no formato padrão ou baixar
  doc.save(`Termo_Devolucao_${chromebook.serie}.pdf`);
};

export default generateTermoDevolucao;
