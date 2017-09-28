const mammoth = require('mammoth')

module.exports = {
  convertDocxToMarkdown (fileBuffer) {
    return new Promise((resolve, reject) => {
      mammoth.convertToMarkdown({
        buffer: fileBuffer
      }, {
        ignoreEmptyParagraphs: false
      }).then((result) => {
        if (!result) {
          console.error('failed to convert docx document')
          reject()
        }
        resolve(result.value)
      }).done()
    })
  }
}
