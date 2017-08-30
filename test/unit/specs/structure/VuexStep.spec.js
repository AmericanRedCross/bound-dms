import { modules } from '../../../../src/vuex'
import { Step } from '../../../../src/vuex/modules/structure/Step'
import { Attachment } from '../../../../src/vuex/modules/structure/Attachment'
import stepUtils from '../../../../src/vuex/modules/structure/utils'

// destructure assign users
const { structure } = modules
// destructure assign mutations
const { mutations } = structure

const mockEmptyState = {
  steps: []
}

const mockState = {
  steps: [
    new Step({
      id: 1,
      title: 'Module 1',
      hierarchy: 1,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: true})
      ],
      steps: [
        new Step({
          id: 3,
          title: 'Some substep name',
          hierarchy: 1,
          content: '# Markdown Content',
          attachments: [
            new Attachment({id: 2, title: 'Another Attachment', url: 'http://somedocuments.docx', size: 12000, mime: '', featured: false})
          ],
          steps: [],
          critical: true
        })
      ],
      critical: true
    }),
    new Step({
      id: 2,
      title: 'Module 2',
      hierarchy: 2,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: false})
      ],
      steps: [],
      critical: false
    }),
    new Step({
      id: 3,
      title: 'Module 3',
      hierarchy: 2,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: false})
      ],
      steps: [],
      critical: false
    }),
    new Step({
      id: 4,
      title: 'Module 4',
      hierarchy: 2,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: false})
      ],
      steps: [],
      critical: false
    })
  ]
}

const expectStep = (mock, stepObject) => {
  expect(stepObject.id).to.equal(mock.id)
  expect(stepObject.title).to.equal(mock.title)
  expect(stepObject.hierarchy).to.equal(mock.hierarchy)
  expect(stepObject.content).to.equal(mock.content)
  expect(stepObject.critical).to.equal(mock.critical)
  // Check Attachment objects
  mock.attachments.forEach((attachment, index) => {
    expectAttachment(attachment, stepObject.attachments[index])
  })
  if (mock.steps !== undefined) {
    // Recursively check steps
    mock.steps.forEach((step, index) => {
      expectStep(step, stepObject.steps[index])
    })
  }
}

const expectAttachment = (mock, attachmentObject) => {
  expect(attachmentObject.id).to.equal(mock.id)
  expect(attachmentObject.title).to.equal(mock.title)
  expect(attachmentObject.url).to.equal(mock.url)
  expect(attachmentObject.size).to.equal(mock.size)
  expect(attachmentObject.mime).to.equal(mock.mime)
  expect(attachmentObject.featured).to.equal(mock.featured)
}

const mockSteps = stepUtils.getMockStructure()

describe('Vuex Structure Mutations', () => {
  // SET_STRUCTURE
  it('SET_STRUCTURE', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockEmptyState)
    // apply mutation with mock users
    mutations.SET_STRUCTURE(state, {response: {data: mockSteps}})
    // assert result
    // expect().to.equal(mockUsers)
    mockSteps.forEach((step, index) => {
      expectStep(step, state.steps[index])
    })
  })

  // SET_HIERARCHY
  it('SET_HIERARCHY', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockState)
    // Move the first module to the bottom....
    mutations.SET_HIERARCHY(state, {newIndex: mockState.length - 1, oldIndex: 0})

    expect(state.steps[mockState.length - 1].hierarchy).to.equal(1)
    expect(state.steps[0].hierarchy).to.equal(1)
    expect(state.steps[mockState.length - 1].title).to.equal(mockState.steps[0].title)
    expect(state.steps[0].title).to.equal(mockState.steps[mockState.length - 1].title)
  })
})
