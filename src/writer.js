const { font } = require('./constants.js');
const fs = require('fs');

const setup = (doc) => {
  doc.pipe(fs.createWriteStream('output.pdf'));
  doc.registerFont('semi-bold', 'src/fonts/FiraSans-SemiBold.ttf');
  doc.registerFont('regular', 'src/fonts/FiraSans-Regular.ttf');

  const page = doc.page;
  doc
    .rect(0, 0, page.width, page.height)
    .fill('#EAEAEA')

  doc.fillColor('#444') // default
};

const simple = (doc) => {
  return {
    insertHead: (text) => {
      const options = {
        // align: 'center',
      };
      const spaceAfter = 0;
      doc
        .font('regular')
        .fontSize(font.header)
        .text(text, options)
        .moveDown(spaceAfter) // extra space afterwards
    },
    insertSub: (text) => {
      const spaceTop = 1.25;
      const color = '#1e90ff';
      doc
        .font('semi-bold')
        .fontSize(font.subheader)
        .moveDown(spaceTop)
        .fillColor(color)
        .text(text, {
          characterSpacing: 1,
        })
    },
    insertPara: (text, options = {}) => {
      const { bold, small, moreSpace } = options;
      let spaceTop = bold ? 0.75 : 0.25;
      if (moreSpace) spaceTop = 0.5;
      const color = '#444';
      doc
        .font(bold ? 'semi-bold' : 'regular')
        .fontSize(small? font.small : font.normal)
        .moveDown(spaceTop)
        .fillColor(color)
        .text(text)
    },
    insertLinkTitle: (name, url) => {
      const spaceTop = 0.75;
      const color = '#444';
      doc
        .font('semi-bold')
        .fontSize(font.normal)
        .moveDown(spaceTop)
        .fillColor(color)
        .text(name, { continued: true })
        .font('regular')
        .text(' - ' + url)
    }
  };
};

const complex = (doc) => {
  const simp = simple(doc);
  return {
    insertExperience: (item) => {
      const { title, company, start, end } = item;
      simp.insertPara(title, { bold: true });
      simp.insertPara(company.name);
      simp.insertPara(`${start} - ${end}`, { small: true });
    },
    insertProject: (project) => {
      const { name, description, url } = project;
      simp.insertLinkTitle(name, url);
      simp.insertPara(description);
    },
    insertList: (item, { noBullet, small, moreSpace }) => {
      const text = noBullet ? item : `• ${item}`;
      simp.insertPara(text, { small, moreSpace });
    },
  };
};

module.exports = (doc) => {
  setup(doc);
  return {
    ...simple(doc),
    ...complex(doc),
  };
};
