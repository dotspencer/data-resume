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
    insertSub: (text, { moreSpaceAfter, moreSpaceTop } = {}) => {
      const spaceTop = moreSpaceTop ? 1.25 : 0.75;
      const color = '#1e90ff';
      const spaceAfter = moreSpaceAfter ? 0.25 : 0;
      doc
        .font('semi-bold')
        .fontSize(font.subheader)
        .moveDown(spaceTop)
        .fillColor(color)
        .text(text, {
          characterSpacing: 1,
        })
        .moveDown(spaceAfter);
    },
    insertPara: (text, options = {}) => {
      const { bold, small, xsmall, moreSpace, color: _color } = options;
      let spaceTop = bold ? 0.75 : 0.25;
      if (moreSpace) spaceTop = 0.5;
      const color = _color || '#444';

      let fontSize = font.normal;
      if (small) fontSize = font.small;
      if (xsmall) fontSize = font.xsmall;

      doc
        .font(bold ? 'semi-bold' : 'regular')
        .fontSize(fontSize)
        .moveDown(spaceTop)
        .fillColor(color)
        .text(text)
    },
    insertLinkTitle: (name, url) => {
      const spaceTop = 0.75;
      const color = '#444';
      doc
        .font('semi-bold')
        .fontSize(font.small)
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

  const insertListItem = (item, { noBullet, small, xsmall, moreSpace }) => {
    const text = noBullet ? item : `• ${item}`;
    simp.insertPara(text, { small, xsmall, moreSpace });
  };
  const insertProject = (project) => {
    const { name, description, url } = project;
    simp.insertLinkTitle(name, url);
    simp.insertPara(description, { small: true });
  };
  const insertAccomplishmentsList = (accomplishments) => {
    const indent = 10;
    doc.text('', doc.x + indent, doc.y);
    accomplishments.map(acc => {
      let spaceTop = 0.35;
      const color = '#444';
      const options = {
        lineGap: 2,
        width: 330,
        indent: -8,
      };
      doc
        .font('regular')
        .fontSize(font.small)
        .moveDown(spaceTop)
        .fillColor(color)
        .text(`• ${acc}`, options)
    });
    doc.text('', doc.x - indent, doc.y);
  };
  const insertExperienceTitle = (title, companyName) => {
    let spaceTop = 0.75;
    const color = '#444';
    doc
      .font('semi-bold')
      .fontSize(font.small)
      .moveDown(spaceTop)
      .fillColor(color)
      .text(title, { continued: true })
      .font('regular')
      .text(' - ' + companyName)
  }
  const insertExperience = (item) => {
    const { title, company, start, end, hidden, accomplishments } = item;
    if (hidden) return;
    // simp.insertPara(title, { bold: true });
    // simp.insertPara(company.name);
    insertExperienceTitle(title, company.name);
    simp.insertPara(`${start} - ${end}`, { xsmall: true, color: '#666' });
    insertAccomplishmentsList(accomplishments);
  };

  return {
    insertExperience,
    insertProject,
    insertListItem,
  };
};

module.exports = (doc) => {
  setup(doc);
  return {
    ...simple(doc),
    ...complex(doc),
  };
};
