import { PDFDocument, rgb } from 'pdf-lib';

const generateTermoDevolucao = async (professor, chromebook) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const font = await pdfDoc.embedFont('Helvetica');

  const title = 'Termo de Devolução de Chromebook';
  const professorInfo = `Professor(a): ${professor.nome} - MASP: ${professor.masp}`;
  const chromebookInfo = `Chromebook: Série ${chromebook.serie} - Patrimônio: ${chromebook.patrimonio}`;
  const dataDevolucao = `Data da Devolução: ${new Date().toLocaleDateString()}`;

  page.drawText(title, { x: 50, y: 350, size: 20, font, color: rgb(0, 0, 0) });
  page.drawText(professorInfo, { x: 50, y: 300, size: 14, font, color: rgb(0, 0, 0) });
  page.drawText(chromebookInfo, { x: 50, y: 270, size: 14, font, color: rgb(0, 0, 0) });
  page.drawText(dataDevolucao, { x: 50, y: 240, size: 14, font, color: rgb(0, 0, 0) });

  page.drawText('Assinatura do Professor: __________________________', { x: 50, y: 180, size: 14, font, color: rgb(0, 0, 0) });
  page.drawText('Assinatura do Responsável: _________________________', { x: 50, y: 150, size: 14, font, color: rgb(0, 0, 0) });

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = `Termo_Devolucao_${professor.masp}_${chromebook.serie}.pdf`;
  link.click();
};

export default generateTermoDevolucao;
