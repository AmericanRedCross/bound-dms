import { File } from '../../../../src/vuex/modules/file/File'

describe('File Object Creation', () => {
  it('Create a new File', () => {
    let newFile = new File({})
    expect(newFile).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newFile = new File({})
    expect(newFile).to.have.property('id')
    expect(newFile).to.have.property('title')
    expect(newFile).to.have.property('filename')
    expect(newFile).to.have.property('mimeType')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let title = 'Section 1'
    let filename = 'document.pdf'
    let mimeType = 'application/pdf'
    let newFile = new File({
      id,
      title,
      filename,
      mimeType
    })

    expect(newFile.id).to.equal(id)
    expect(newFile.title).to.equal(title)
    expect(newFile.filename).to.equal(filename)
    expect(newFile.mimeType).to.equal(mimeType)
  })
})
