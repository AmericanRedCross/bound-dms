import { Step } from '../../../../src/vuex/modules/content/Step'
import { Attachment } from '../../../../src/vuex/modules/content/Attachment'

describe('Step Object Creation', () => {
  it('Create a new step', () => {
    let newStep = new Step()
    expect(newStep).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newStep = new Step()
    expect(newStep).to.have.property('id')
    expect(newStep).to.have.property('title')
    expect(newStep).to.have.property('heirarchy')
    expect(newStep).to.have.property('content')
    expect(newStep).to.have.property('attachments')
    expect(newStep).to.have.property('steps')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let title = 'Section 1'
    let heirarchy = 1
    let content = '# Content'
    let attachments = [new Attachment()]
    let steps = [new Step()]
    let newStep = new Step({
      id,
      title,
      heirarchy,
      content,
      attachments,
      steps
    })
    expect(newStep.id).to.equal(id)
    expect(newStep.title).to.equal(title)
    expect(newStep.heirarchy).to.equal(heirarchy)
    expect(newStep.content).to.equal(content)
    expect(newStep.attachments).to.equal(attachments)
    expect(newStep.steps).to.equal(steps)
  })
})
