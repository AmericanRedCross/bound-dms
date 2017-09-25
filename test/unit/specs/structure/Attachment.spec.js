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
    expect(newAttachment).to.have.property('url')
    expect(newAttachment).to.have.property('mime')
    expect(newAttachment).to.have.property('size')
    expect(newAttachment).to.have.property('featured')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let title = 'Section 1'
    let url = 'http://www.somewebsite.com/document.pdf'
    let mime = 'application/pdf'
    let size = 12000
    let featured = true
    let newAttachment = new Attachment({
      id,
      title,
      url,
      mime,
      size,
      featured
    })

    expect(newAttachment.id).to.equal(id)
    expect(newAttachment.title).to.equal(title)
    expect(newAttachment.url).to.equal(url)
    expect(newAttachment.mime).to.equal(mime)
    expect(newAttachment.size).to.equal(size)
    expect(newAttachment.featured).to.equal(featured)
  })
})
