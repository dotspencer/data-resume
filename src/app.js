const PDF = require('pdfkit');

const { font } = require('./constants.js');

const doc = new PDF({
  margin: 30,
  // size: [400, 1000],
});
const {
  insertHead,
  insertSub,
  insertPara,
  insertExperience,
  insertProject,
  insertList
} = require('./writer.js')(doc);

const {
  personalInfo,
  workHistory,
  projects,
  education: edu,
  languages: langs,
  awards,
  knowledge,
} = require('./data.json');

insertHead(personalInfo.name);

insertSub('EXPERIENCE');
workHistory.map(insertExperience);

insertSub('PROJECTS');
projects.map(insertProject);

insertSub('EDUCATION');
insertPara(`${edu.school.name}, ${edu.school.location}`, { bold: true });
insertPara(edu.description);

doc.text('', 390, 65);
insertSub("LANGUAGES\nFRAMEWORKS");
langs.map(insertList);

insertSub('AWARDS');
awards.map(a => insertList(a, { noBullet: true, moreSpace: true }));

insertSub('KNOWLEDGE');
knowledge.map(insertList);

doc.end()
