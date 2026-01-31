import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
  title: string,
  headers: string[][],
  data: any[][],
) => {
  const doc = new jsPDF();
  doc.text(title, 14, 15);
  autoTable(doc, {
    head: headers,
    body: data,
    startY: 20,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillStyle: "f", fillColor: [19, 127, 236] }, // Your Primary Blue
  });
  doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
};
