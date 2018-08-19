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

        .moveDown(0.75)
    },
    insertPara: (text, options = {}) => {
      const { bold } = options;
      doc
        .font(bold ? 'src/fonts/FiraSans-SemiBold.ttf' : 'src/fonts/FiraSans-Regular.ttf')
        .fontSize(font.normal)
        .text(text)

        .moveDown(bold ? 0.5 : 0.75)
    }
  };
};
