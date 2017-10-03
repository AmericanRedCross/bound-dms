import { Directory } from '../../../../src/vuex/modules/structure/Directory'
import { File } from '../../../../src/vuex/modules/file/File'

describe('Directory Object Creation', () => {
  it('Create a new directory', () => {
    let newDirectory = new Directory({})
    expect(newDirectory).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newDirectory = new Directory({})
    expect(newDirectory).to.have.property('id')
    expect(newDirectory).to.have.property('order')
    expect(newDirectory).to.have.property('files')
    expect(newDirectory).to.have.property('directories')
    expect(newDirectory).to.have.property('translations')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let order = 1
    let files = [new File({})]
    let directories = [new Directory({})]
    let newDirectory = new Directory({
      id,
      order,
      files,
      directories
    })

    expect(newDirectory.id).to.equal(id)
    expect(newDirectory.order).to.equal(order)
    expect(newDirectory.files).to.equal(files)
    expect(newDirectory.directories).to.equal(directories)
  })
})
