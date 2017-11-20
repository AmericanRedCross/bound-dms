import { Project } from '../../../../src/vuex/modules/project/Project'

describe('Project Object Creation', () => {
  it('Create a new project', () => {
    let newProject = new Project({})
    expect(newProject).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newProject = new Project({})

    expect(newProject).to.have.property('id')
    expect(newProject).to.have.property('name')
    expect(newProject).to.have.property('description')
    expect(newProject).to.have.property('languages')
    expect(newProject).to.have.property('createdAt')
    expect(newProject).to.have.property('updatedAt')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let name = 'TestProject'
    let description = 'Test Description'
    let languages = []
    let createdAt = 'date'
    let updatedAt = 'updateDate'
    let newProject = new Project({
      id,
      name,
      description,
      languages,
      createdAt,
      updatedAt
    })

    expect(newProject.id).to.equal(id)
    expect(newProject.name).to.equal(name)
    expect(newProject.description).to.equal(description)
    expect(newProject.languages).to.equal(languages)
    expect(newProject.createdAt).to.equal(createdAt)
    expect(newProject.updatedAt).to.equal(updatedAt)
    // expect(newProject.keys).to.equal(keys)
  })
})
