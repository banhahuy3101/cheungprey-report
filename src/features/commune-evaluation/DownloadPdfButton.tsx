"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface DownloadPdfButtonProps {
  id: string;
  fileName?: string;
}

// Fixed capture width in CSS pixels — independent of browser zoom.
// Content reflow is determined by this width, not the viewport.
const CAPTURE_WIDTH = 1200;

export default function DownloadPdfButton({
  id,
  fileName = "របាយការណ៍_វាយតម្លៃ_ឃុំ_សង្កាត់",
}: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const contentEl = document.getElementById("evaluation-content");
    if (!contentEl) return;

    setLoading(true);
    try {
      // Clone the content into a fixed-width offscreen container so
      // the browser zoom level of the main page has no effect on the layout.
      const clone = contentEl.cloneNode(true) as HTMLElement;
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "0";
      wrapper.style.width = `${CAPTURE_WIDTH}px`;
      wrapper.style.backgroundColor = "#ffffff";
      wrapper.style.zIndex = "-1";

      // Reduce table text size for PDF readability
      const styleEl = document.createElement("style");
      styleEl.textContent = `
        #pdf-clone,
        #pdf-clone table,
        #pdf-clone td,
        #pdf-clone th,
        #pdf-clone li,
        #pdf-clone p,
        #pdf-clone span,
        #pdf-clone div {
          font-size: 13px !important;
        }
        #pdf-clone td,
        #pdf-clone th {
          padding: 6px !important;
        }
      `;
      clone.id = "pdf-clone";
      wrapper.appendChild(styleEl);
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(clone, {
        scale: 2,
        width: CAPTURE_WIDTH,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(wrapper);

      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      const pdf = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if content overflows
      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${fileName}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <FileDown size={16} />
      )}
      {loading ? "កំពុងបង្កើត..." : "ទាញយក PDF"}
    </Button>
  );
}
