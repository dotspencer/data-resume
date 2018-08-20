const PDF = require('pdfkit');

const { font } = require('./constants.js');
const doc = new PDF({
  margin: 30,
  // size: [400, 1000],
});

/**
 * Writing functions
 */
const {
  insertHead,
  insertSub,
  insertPara,
  insertExperience,
  insertProject,
  insertList
} = require('./writer.js')(doc);

/**
 * Data
 */
const {
  personalInfo: pInfo,
  workHistory,
  projects,
  education: edu,
  languages: langs,
  awards,
  knowledge,
} = require('./data.json');

/**
 * Begin creating document
 */
insertHead(pInfo.name);

insertSub('EXPERIENCE');
workHistory.map(insertExperience);

insertSub('PROJECTS');
projects.map(insertProject);

insertSub('EDUCATION');
insertPara(`${edu.school.name}, ${edu.school.location}`, { bold: true });
insertPara(edu.description);

doc.text('', 365, 30);
doc.text(pInfo.email);
doc.text(pInfo.phone);

doc.text('', 390, 65);

insertSub("LANGUAGES\nFRAMEWORKS", { moreSpaceAfter: true });
langs.map(insertList);

insertSub('AWARDS');
awards.map(a => insertList(a, { noBullet: true, moreSpace: true }));

insertSub('KNOWLEDGE', { moreSpaceAfter: true });
knowledge.map(insertList);

/* Contact info */
// doc.text(pInfo.name, 390, 30);

doc.end()
