const PDF = require('pdfkit');
const fs = require('fs');

const { font } = require('./constants.js');

/**
 * Document
 */
const doc = new PDF();
doc.pipe(fs.createWriteStream('output.pdf'));

const { insertHead, insertSub, insertPara } = require('./writer.js')(doc);
const { personalInfo, workHistory } = require('./data.json');

doc.addPage({
  margin: 10,
})

insertHead(personalInfo.name);

insertSub('EXPERIENCE');

workHistory.map(({ title, company }) => {
  insertPara(title, { bold: true });
  insertPara(company.name);
});

doc.end()
