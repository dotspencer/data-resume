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

insertHead(personalInfo.name);

insertSub('EXPERIENCE');

insertPara('Testing this out')
insertPara('Testing this out')

doc.end()
