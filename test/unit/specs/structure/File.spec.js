import { File } from '../../../../src/vuex/modules/file/File'

describe('File Object Creation', () => {
  it('Create a new File', () => {
    let newAttachment = new File({})
    expect(newAttachment).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newAttachment = new File({})
    expect(newAttachment).to.have.property('id')
    expect(newAttachment).to.have.property('title')
    expect(newAttachment).to.have.property('filename')
    expect(newAttachment).to.have.property('mimeType')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let title = 'Section 1'
    let filename = 'http://www.somewebsite.com/document.pdf'
    let mimeType = 'application/pdf'
    let newAttachment = new File({
      id,
      title,
      filename,
      mimeType
    })

    expect(newAttachment.id).to.equal(id)
    expect(newAttachment.title).to.equal(title)
    expect(newAttachment.filename).to.equal(filename)
    expect(newAttachment.mimeType).to.equal(mimeType)
  })
})
