const PDF = require('pdfkit');

const { font } = require('./constants.js');
const doc = new PDF({
  margins: {
    top: 20,
    right: 20,
    bottom: 0,
    left: 20,
  },
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
  insertListItem
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

doc.text('', 375, 20);
insertPara(pInfo.email);
insertPara(pInfo.phone);
doc.moveDown();

// doc.text('', 400, 90);

insertSub('PROJECTS');
projects.map(insertProject);

insertSub('EDUCATION');
insertPara(`${edu.school.name}, ${edu.school.location}`, { bold: true, small: true });
insertPara(edu.description, { small: true });

insertSub("LANGUAGES\nFRAMEWORKS", { moreSpaceAfter: true });
langs.map(a => insertListItem(a, { small: true }));

insertSub('AWARDS');
awards.map(a => insertListItem(a, { noBullet: true, moreSpace: true, small: true }));

insertSub('KNOWLEDGE', { moreSpaceAfter: true });
knowledge.map(a => insertListItem(a, { small: true }));

// doc.text('', 160, doc.page.height - 30);
// insertPara('https://github.com/dotspencer/data-resume', { small: true, color: '#999' });

doc.end()
