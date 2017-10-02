import { Attachment } from '../../../../src/vuex/modules/structure/Attachment'

describe('Attachment Object Creation', () => {
  it('Create a new Attachment', () => {
    let newAttachment = new Attachment({})
    expect(newAttachment).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newAttachment = new Attachment({})
    expect(newAttachment).to.have.property('id')
    expect(newAttachment).to.have.property('title')
    expect(newAttachment).to.have.property('filename')
    expect(newAttachment).to.have.property('mimeType')
    expect(newAttachment).to.have.property('size')
    expect(newAttachment).to.have.property('featured')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let title = 'Section 1'
    let filename = 'http://www.somewebsite.com/document.pdf'
    let mimeType = 'application/pdf'
    let size = 12000
    let featured = true
    let newAttachment = new Attachment({
      id,
      title,
      filename,
      mimeType,
      size,
      featured
    })

    expect(newAttachment.id).to.equal(id)
    expect(newAttachment.title).to.equal(title)
    expect(newAttachment.filename).to.equal(filename)
    expect(newAttachment.mimeType).to.equal(mimeType)
    expect(newAttachment.size).to.equal(size)
    expect(newAttachment.featured).to.equal(featured)
  })
})
