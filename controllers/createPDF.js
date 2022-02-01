const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function createPDF(title1, clientInfo, title2, assessmentInfo, filePath) {
    let doc = new PDFDocument({ size: "A4", margin: 0 });

    generateLetterhead(doc);
    generateInvoiceTable(doc, title1, clientInfo);

    addPage(doc);

    generateLetterhead(doc);
    generateInvoiceTable(doc, title2, assessmentInfo);

    const publicPath = path.join(__dirname, '../public', filePath);
    doc.end();
    doc.pipe(fs.createWriteStream(publicPath));
    return publicPath;
}

function addPage(doc) {
    doc.addPage({ size: "A4", margin: 0 });
}

function generateLetterhead(doc) {
    doc.image("assets/letterhead.jpeg", 0, 0, { width: doc.page.width });
}

function generateInvoiceTable(doc, title, dataInfo) {
    doc
        .strokeColor("#056563")
        .lineWidth(50)
        .moveTo(50, 150)
        .lineTo(550, 150)
        .stroke();

    doc
        .fontSize(24)
        .fillColor("#fff")
        .text(title.toUpperCase(), 100, 140);

    let invoiceTableTop = 185;
    doc.font("Helvetica-Bold");
    doc.fillColor('#000');
    doc.font("Helvetica");

    let dataArray = [];
    for (var key of Object.keys(dataInfo)) {
        dataArray.push({ key: key, value: dataInfo[key] });
    }

    let posI = 0;
    // console.log(dataArray);
    for (let i = 0; i < dataArray.length; posI++, i++) {
        const { key, value } = dataArray[i];
        console.log(key + " " + value);
        const position = invoiceTableTop + (posI) * 30;
        generateTableRow(
            doc,
            position,
            key,
            value,
        );
        generateHr(doc, position + 20);

        if (position + invoiceTableTop >= doc.page.height) {
            invoiceTableTop = 100;
            addPage(doc);
            generateLetterhead(doc);
            posI = 0;
        }
    }

    doc.font("Helvetica");
}

function generateTableRow(
    doc,
    y,
    key,
    value,
) {
    const _key = key.split("_").map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1);
    }).join(" ");

    doc
        .fontSize(10)
        .text(_key, 60, y)
        .text(value, doc.page.width / 2 + 10, y)
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

module.exports = {
    createPDF
};