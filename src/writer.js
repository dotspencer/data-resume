const { font } = require('./constants.js');
const fs = require('fs');

const setup = (doc) => {
  doc.pipe(fs.createWriteStream('output.pdf'));
  doc.registerFont('semi-bold', 'src/fonts/FiraSans-SemiBold.ttf');
  doc.registerFont('regular', 'src/fonts/FiraSans-Regular.ttf');
};

const simple = (doc) => {
  return {
    insertHead: (text) => {
      doc
        .font('semi-bold')
        .fontSize(font.header)
        .text(text)

        .moveDown(0.75)
    },
    insertSub: (text) => {
      doc
        .font('semi-bold')
        .fontSize(font.subheader)
        .text(text, {
          characterSpacing: 1,
        })

        .moveDown(0.75)
    },
    insertPara: (text, options = {}) => {
      const { bold } = options;
      doc
        .font(bold ? 'semi-bold' : 'regular')
        .fontSize(font.normal)
        .text(text)

        .moveDown(bold ? 0.5 : 0.75)
    }
  };
};

const complex = (doc) => {
  const simp = simple(doc);
  return {
    insertExperience: (item) => {
      const { title, company } = item;
      simp.insertPara(title, { bold: true });
      simp.insertPara(company.name);
    }
  };
};

module.exports = (doc) => {
  setup(doc);
  return {
    ...simple(doc),
    ...complex(doc),
  };
};
