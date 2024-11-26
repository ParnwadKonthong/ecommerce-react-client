// rafce = ket react fomat
import React from "react";
import { jsPDF } from "jspdf";
import { font } from "./THSarabunNew-normal";

// moment
import moment from "moment/min/moment-with-locales";

const InvoiceJsPDF = ({ order }) => {
  const handlePDF = () => {
    const doc = new jsPDF();
    // add the font to jsPDF
    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    let width = doc.internal.pageSize.getWidth();

    doc.text("ปานวาด นักพัฒนา", width / 2, 10, { align: "center" });
    doc.text(moment(Date.now()).locale("th").format("LL"), width / 2, 16, {
      align: "center",
    });

    let data = order.products.map((p, i) => [
      p.product.title,
      p.price,
      p.count,
    ]);

    let content = {
      startY: 20,
      head: [["ราการสินค้า", "ราคา", "จำนวน"]],
      body: data,
      styles: { font: "MyFont" },
    };

    doc.autoTable(content);
    doc.text("ยอดรวมสุทธิ : " + order.cartTotal, 190, 100, { align: "right" });
    doc.save("a4.pdf");
  };
  return (
    <div>
      <button onClick={handlePDF} className="btn btn-info">
        Download PDF
      </button>
    </div>
  );
};

export default InvoiceJsPDF;
