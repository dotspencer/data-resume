const { font } = require('./constants.js');

module.exports = (doc) => {
  return {
    insertHead: (text) => {
      doc
        .font('src/fonts/FiraSans-SemiBold.ttf')
        .fontSize(font.header)
        .text(text)

        .moveDown(0.75)
    },
    insertSub: (text) => {
      doc
        .font('src/fonts/FiraSans-SemiBold.ttf')
        .fontSize(font.subheader)
        .text(text, {
          characterSpacing: 1,
        })

        .moveDown(0.5)
    },
    insertPara: (text) => {
      doc
        .font('src/fonts/FiraSans-Regular.ttf')
        .fontSize(font.normal)
        .text(text)

        .moveDown(0.5)
    }
  };
};
