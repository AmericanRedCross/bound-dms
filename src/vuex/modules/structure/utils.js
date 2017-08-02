import { Step } from './Step'
import { Attachment } from './Attachment'

let mockStructure = [{
  id: 1,
  title: 'Prepare and analyze',
  hierarchy: 1,
  content: '# Markdown Content',
  critical: true,
  attachments: [{id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: true},
    {id: 2, title: 'Another one', url: 'http://somedocument.docx', size: 12000, mime: '', featured: true},
    {id: 3, title: 'Something else', url: 'http://somedocument.md', size: 12000, mime: '', featured: true}],
  steps: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    hierarchy: 1,
    content: '# Some other content',
    attachments: [],
    steps: [{
      id: 3,
      title: 'Et Harum quidem reprum',
      hierarchy: 1,
      content: '# Some other content',
      attachments: []
    },
    {
      id: 4,
      title: 'Et Harum quidem reprum',
      hierarchy: 2,
      content: '# Some other content',
      attachments: []
    }]
  }]
},
{
  id: 2,
  title: 'Prepare and analyze',
  hierarchy: 2,
  content: '# Markdown Content',
  attachments: [],
  steps: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    hierarchy: 1,
    content: '# Some other content',
    attachments: [],
    steps: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        hierarchy: 1,
        content: '# Some other content',
        attachments: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        hierarchy: 2,
        content: '# Some other content',
        attachments: []
      }
    ]
  }]
}]

const StepUtils = {
  // Useful function to get an array of step objects
  getSteps (dataArray) {
    let steps = []
    if (Array.isArray(dataArray)) {
      dataArray.forEach((data) => {
        let step = this.getStepObject(data)
        step.sortSteps()
        steps.push(step)
      })
    }
    return steps
  },

  // Useful function to build a step object
  getStepObject (data) {
    return new Step({
      id: data.id,
      title: data.title,
      hierarchy: data.hierarchy,
      content: data.content,
      critical: data.critical,
      attachments: this.getAttachments(data.attachments),
      steps: this.getSteps(data.steps)
    })
  },

  // Useful function to get an array of attachment objects
  getAttachments (dataArray) {
    let attachments = []
    if (Array.isArray(dataArray)) {
      dataArray.forEach((data) => {
        attachments.push(this.getAttachmentObject(data))
      })
    }
    return attachments
  },

  // Useful function to build a step object
  getAttachmentObject (data) {
    return new Attachment({
      id: data.id,
      title: data.title,
      url: data.url,
      size: data.size,
      mime: data.mime,
      featured: data.featured
    })
  },

  // Use a mock structure until we know what the endpoints will be
  getMockStructure () {
    return mockStructure
  }
}

export default StepUtils
