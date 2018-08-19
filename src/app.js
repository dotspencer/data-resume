const PDF = require('pdfkit');

const { font } = require('./constants.js');

const doc = new PDF({
  margin: 30,
});
const { insertHead, insertSub, insertPara, insertExperience } = require('./writer.js')(doc);
const { personalInfo, workHistory } = require('./data.json');

insertHead(personalInfo.name);
insertSub('EXPERIENCE');

workHistory.map(insertExperience);

doc.end()
