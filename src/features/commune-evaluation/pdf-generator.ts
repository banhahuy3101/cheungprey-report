import jsPDF from "jspdf";
import "jspdf-autotable";
import { CommuneEvaluation } from "@/features/commune-evaluation/domain";

const SIEMREAP_URL =
  "https://fonts.gstatic.com/s/siemreap/v30/Gg82N5oFbgLvHAfNl2Yb.ttf";

async function fetchFontAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateCommunePDF(data: CommuneEvaluation) {
  const fontBase64 = await fetchFontAsBase64(SIEMREAP_URL);

  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

  doc.addFileToVFS("Siemreap.ttf", fontBase64);
  doc.addFont("Siemreap.ttf", "Siemreap", "normal");
  doc.setFont("Siemreap");

  doc.setFontSize(12);
  doc.text("សម្រាប់រដ្ឋបាលឃុំ សង្កាត់នីមួយៗ", 14, 15);
  doc.setFontSize(14);
  doc.text("សម្រង់ទិន្នន័យសម្រាប់ការវាយតម្លៃលទ្ធផលនៃការអនុវត្ត", 14, 23);
  doc.setFontSize(14);
  doc.text("គោលនយោបាយអភិវឌ្ឍន៍ឃុំ សង្កាត់អាណត្តិទី៥ (២០២២-២០២៧)", 14, 30);
  doc.setFontSize(11);
  const toKhmer = (v: string) => v.split("|")[1] || v;
  doc.text(
    `រាជធានី/ខេត្ត: ${toKhmer(data.province) || ".........."}   ក្រុង/ស្រុក/ខណ្ឌ: ${toKhmer(data.district) || ".........."}   រដ្ឋបាលឃុំ/សង្កាត់: ${toKhmer(data.commune) || ".........."}`,
    14,
    38
  );
  doc.text("គិតចាប់ពីដើមឆ្នាំ២០២២ ដល់ខែមិថុនា ឆ្នាំ២០២៦", 14, 44);

  const rows = [
    ["១", "លទ្ធិប្រជាធិបតេយ្យនៅមូលដ្ឋាន និងសិទ្ធិសេរីភាព", ""],
    ["១.១", "ភាគរយចុះឈ្មោះបោះឆ្នោតតំណាងរាស្ត្រ២០២៣", `${data.voterRegistrationNational2023 || "0"} %`],
    ["១.២", "ភាគរយចុះឈ្មោះបោះឆ្នោតឃុំ សង្កាត់២០២២", `${data.voterRegistrationLocal2022 || "0"} %`],
    ["១.៣", "ចំនួនសមាជិកក្រុមប្រឹក្សាសរុប", `${data.totalCouncilMembers || "0"} នាក់`],
    ["១.៤", "ចំនួនសមាជិកមានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ", `${data.councilHighSchool || "0"} នាក់`],
    ["១.៥", "ចំនួនសមាជិកមានបរិញ្ញបត្ររង", `${data.councilAssociate || "0"} នាក់`],
    ["១.៦", "ចំនួនសមាជិកមានបរិញ្ញបត្រ", `${data.councilBachelor || "0"} នាក់`],
    ["១.៧", "ចំនួនសមាជិកមានបរិញ្ញបត្រជាន់ខ្ពស់ឡើង", `${data.councilMasterOrHigher || "0"} នាក់`],
    ["", "", ""],
    ["២", "សន្តិសុខ របៀបរៀបរយ និងសុវត្ថិភាពសង្គម", ""],
    ["២.១", "ចំនួនប្រជាការពារសរុប", `${data.totalSecurityGuards || "0"} នាក់`],
    ["២.២", "អត្រាបង្ក្រាបបទល្មើស", `${data.crimeSuppressionRate || "0"} %`],
    ["២.៣", "គ្រោះថ្នាក់ចរាចរណ៍", `${data.trafficAccidentsCount || "0"} ករណី`],
    ["", "", ""],
    ["៣", "ការផ្តល់សេវាសាធារណៈ និងហេដ្ឋារចនាសម្ព័ន្ធ", ""],
    ["៣.១", "ផ្លូវបេតុងថ្មី (ខ្សែ)", `${data.newConcreteRoadsCount || "0"} ខ្សែ`],
    ["៣.២", "ផ្លូវកៅស៊ូថ្មី (ខ្សែ)", `${data.newAsphaltRoadsCount || "0"} ខ្សែ`],
    ["៣.៣", "ការទទួលបានទឹកស្អាត", `${data.cleanWaterAccessPct || "0"} %`],
    ["៣.៤", "ការទទួលបានអគ្គិសនី", `${data.electricityAccessPct || "0"} %`],
    ["", "", ""],
    ["៤", "ការអភិវឌ្ឍសេដ្ឋកិច្ចមូលដ្ឋាន", ""],
    ["៤.១", "សហគ្រាសខ្នាតតូចបង្កើតថ្មី", `${data.smallEnterprisesCreated || "0"} សហគ្រាស`],
    ["៤.២", "សហគ្រាសខ្នាតតូចចុះបញ្ជី", `${data.smallEnterprisesRegistered || "0"} សហគ្រាស`],
    ["៤.៣", "គ្រួសារកសិកម្មសរុប", `${data.agriculturalFamiliesCount || "0"} គ្រួសារ`],
  ];

  // @ts-expect-error autoTable is added by jspdf-autotable plugin
  doc.autoTable({
    startY: 50,
    head: [["ល.រ", "សូចនាករ", "ទិន្នន័យ ឬព័ត៌មានលទ្ធផលនៃការអនុវត្ត"]],
    body: rows,
    styles: { font: "Siemreap", fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 15, halign: "center" },
      1: { cellWidth: 120 },
      2: { cellWidth: 55 },
    },
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], font: "Siemreap" },
    theme: "grid",
  });

  doc.save(`របាយការណ៍_វាយតម្លៃលទ្ធផល_ឃុំ_សង្កាត់_${toKhmer(data.commune) || "ថ្មី"}.pdf`);
}
