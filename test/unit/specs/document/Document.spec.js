import { Document } from '../../../../src/vuex/modules/document/Document'

describe('Document Object Creation', () => {
  it('Create a new document', () => {
    let newDocument = new Document({})
    expect(newDocument).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newDocument = new Document({})
    expect(newDocument).to.have.property('id')
    expect(newDocument).to.have.property('createdBy')
    expect(newDocument).to.have.property('projectId')
    expect(newDocument).to.have.property('translations')
  })

  it('Has the correct property values', () => {
    let id = 1
    let projectId = 1
    let createdBy = { firstName: 'something' }
    let translations = [{language: 'en', content: '# some markdown content'}]
    let newDocument = new Document({id, projectId, createdBy, translations})
    expect(newDocument.id).to.equal(id)
    expect(newDocument.projectId).to.equal(projectId)
    expect(newDocument.createdBy).to.equal(createdBy)
    expect(newDocument.translations).to.equal(translations)
  })
})

describe('Document Setters and Getters', () => {
  it('Get id', () => {
    let newDocument = new Document({ id: 1 })
    expect(newDocument.id).to.equal(1)
  })
  it('Set and Get projectId', () => {
    let newDocument = new Document({})
    newDocument.projectId = 1
    expect(newDocument.projectId).to.equal(1)
  })
  it('Set and Get createdBy', () => {
    let newDocument = new Document({})
    let user = { firstName: 'something' }
    newDocument.createdBy = user
    expect(newDocument.createdBy).to.equal(user)
  })
  it('Set and Get translations', () => {
    let newDocument = new Document({})
    let translations = [{language: 'en', content: '# some markdown content'}]
    newDocument.translations = translations
    expect(newDocument.translations).to.equal(translations)
  })
})
