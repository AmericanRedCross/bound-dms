import { Step } from '../../../../src/vuex/modules/structure/Step'
import { Attachment } from '../../../../src/vuex/modules/structure/Attachment'

describe('Step Object Creation', () => {
  it('Create a new step', () => {
    let newStep = new Step({})
    expect(newStep).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newStep = new Step({})
    expect(newStep).to.have.property('id')
    expect(newStep).to.have.property('title')
    expect(newStep).to.have.property('hierarchy')
    expect(newStep).to.have.property('content')
    expect(newStep).to.have.property('attachments')
    expect(newStep).to.have.property('steps')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let title = 'Section 1'
    let hierarchy = 1
    let content = '# Content'
    let attachments = [new Attachment({})]
    let steps = [new Step({})]
    let newStep = new Step({
      id,
      title,
      hierarchy,
      content,
      attachments,
      steps
    })

    expect(newStep.id).to.equal(id)
    expect(newStep.title).to.equal(title)
    expect(newStep.hierarchy).to.equal(hierarchy)
    expect(newStep.content).to.equal(content)
    expect(newStep.attachments).to.equal(attachments)
    expect(newStep.steps).to.equal(steps)
  })
})
