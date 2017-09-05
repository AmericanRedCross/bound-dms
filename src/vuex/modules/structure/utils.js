import { Directory } from './Directory'
import { Attachment } from './Attachment'

let mockStructure = [{
  id: 1,
  title: 'Prepare and analyze',
  order: 1,
  content: '# Markdown Content',
  attachments: [{id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: true},
    {id: 2, title: 'Another one', url: 'http://somedocument.docx', size: 12000, mime: '', featured: true},
    {id: 3, title: 'Something else', url: 'http://somedocument.md', size: 12000, mime: '', featured: true}],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    attachments: [],
    directories: [{
      id: 3,
      title: 'Et Harum quidem reprum',
      order: 1,
      content: '# Some other content',
      attachments: []
    },
    {
      id: 4,
      title: 'Et Harum quidem reprum',
      order: 2,
      content: '# Some other content',
      attachments: []
    }]
  }]
},
{
  id: 2,
  title: 'Prepare and analyze',
  order: 2,
  content: '# Markdown Content',
  attachments: [],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    attachments: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        attachments: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        attachments: []
      }
    ]
  }]
},
{
  id: 3,
  title: 'Prepare and analyze',
  order: 3,
  content: '# Markdown Content',
  attachments: [],
  critical: false,
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    attachments: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        attachments: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        attachments: []
      }
    ]
  }]
},
{
  id: 4,
  title: 'Prepare and analyze',
  order: 4,
  content: '# Markdown Content',
  attachments: [],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    attachments: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        attachments: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        attachments: [],
        directories: []
      }
    ]
  }]
},
{
  id: 5,
  title: 'Prepare and analyze',
  order: 5,
  content: '# Markdown Content',
  attachments: [],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    attachments: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        attachments: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        attachments: []
      }
    ]
  }]
}]

const DirectoryUtils = {
  // Useful function to get an array of directory objects
  getDirectories (dataArray) {
    let directories = []
    if (Array.isArray(dataArray)) {
      dataArray.forEach((data) => {
        let directory = this.getDirectoryObject(data)
        directory.sortDirectories()
        directories.push(directory)
      })
    }
    return directories
  },

  // Useful function to build a directory object
  getDirectoryObject (data) {
    return new Directory({
      id: data.id,
      title: data.title,
      order: data.order,
      content: data.content,
      attachments: this.getAttachments(data.attachments),
      directories: this.getDirectories(data.directories),
      parentId: data.parentId
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

  // Useful function to build a directory object
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
  },

  getFlatStructure (structure, flatStructure = []) {
    console.log(structure)
    structure.forEach(directory => {
      let childDirectories = directory.directories
      if (Array.isArray(childDirectories)) {
        this.getFlatStructure(childDirectories, flatStructure)
      }
      flatStructure.push(directory.flatten())
    })
    return flatStructure
  }
}

export default DirectoryUtils
