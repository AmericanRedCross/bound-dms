import { Directory } from '../../../../src/vuex/modules/structure/Directory'
import { Attachment } from '../../../../src/vuex/modules/structure/Attachment'

describe('Directory Object Creation', () => {
  it('Create a new directory', () => {
    let newDirectory = new Directory({})
    expect(newDirectory).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newDirectory = new Directory({})
    expect(newDirectory).to.have.property('id')
    expect(newDirectory).to.have.property('title')
    expect(newDirectory).to.have.property('order')
    expect(newDirectory).to.have.property('content')
    expect(newDirectory).to.have.property('attachments')
    expect(newDirectory).to.have.property('directories')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let title = 'Section 1'
    let order = 1
    let content = '# Content'
    let attachments = [new Attachment({})]
    let directories = [new Directory({})]
    let newDirectory = new Directory({
      id,
      title,
      order,
      content,
      attachments,
      directories
    })

    expect(newDirectory.id).to.equal(id)
    expect(newDirectory.title).to.equal(title)
    expect(newDirectory.order).to.equal(order)
    expect(newDirectory.content).to.equal(content)
    expect(newDirectory.attachments).to.equal(attachments)
    expect(newDirectory.directories).to.equal(directories)
  })
})
