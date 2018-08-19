const PDF = require('pdfkit');

const { font } = require('./constants.js');

const doc = new PDF({
  margin: 30,
  // size: [400, 1000],
});
const { insertHead, insertSub, insertPara, insertExperience, insertProject, insertLanguage } = require('./writer.js')(doc);
const { personalInfo, workHistory, projects, education: edu, languages: langs } = require('./data.json');

insertHead(personalInfo.name);

insertSub('EXPERIENCE');
workHistory.map(insertExperience);

insertSub('PROJECTS');
projects.map(insertProject);

insertSub('EDUCATION');
insertPara(`${edu.school.name}, ${edu.school.location}`, { bold: true });
insertPara(edu.description);

doc.text('', 400, 65);
insertSub("LANGUAGES\nFRAMEWORKS");
langs.map(insertLanguage);

insertSub('AWARDS');

doc.end()
