// const jsPDF = require("jspdf");

// var pdf = new jsPDF({
//   orientation: "p",
//   unit: "mm",
//   format: "a5",
//   putOnlyUsedFonts: true,
// });
// pdf.text("Generate a PDF with JavaScript", 20, 20);
// pdf.text("published on APITemplate.io", 20, 30);
// pdf.addPage();
// pdf.text(20, 20, "The second page");
// pdf.save("jsPDF_2Pages.pdf");
const jsPDF = require("jspdf");
var pdf = new jsPDF("p", "pt", "letter");
console.log(pdf);
// generatePDF();
