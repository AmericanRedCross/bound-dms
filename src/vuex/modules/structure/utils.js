import { Directory } from './Directory'
import { Document } from '../document/Document'
import { File } from '../file/File'

let mockStructure = [{
  id: 1,
  title: 'Prepare and analyze',
  order: 1,
  content: '# Markdown Content',
  files: [{id: 1, title: 'File', filename: 'http://somedocument.pdf', size: 12000, mimeType: '', featured: true},
    {id: 2, title: 'Another one', filename: 'http://somedocument.docx', size: 12000, mimeType: '', featured: true},
    {id: 3, title: 'Something else', filename: 'http://somedocument.md', size: 12000, mimeType: '', featured: true}],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    files: [],
    directories: [{
      id: 3,
      title: 'Et Harum quidem reprum',
      order: 1,
      content: '# Some other content',
      files: []
    },
    {
      id: 4,
      title: 'Et Harum quidem reprum',
      order: 2,
      content: '# Some other content',
      files: []
    }]
  }]
},
{
  id: 2,
  title: 'Prepare and analyze',
  order: 2,
  content: '# Markdown Content',
  files: [],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    files: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        files: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        files: []
      }
    ]
  }]
},
{
  id: 3,
  title: 'Prepare and analyze',
  order: 3,
  content: '# Markdown Content',
  files: [],
  critical: false,
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    files: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        files: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        files: []
      }
    ]
  }]
},
{
  id: 4,
  title: 'Prepare and analyze',
  order: 4,
  content: '# Markdown Content',
  files: [],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    files: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        files: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        files: [],
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
  files: [],
  directories: [{
    id: 2,
    title: 'Et Harum quidem reprum',
    order: 1,
    content: '# Some other content',
    files: [],
    directories: [
      {
        id: 3,
        title: 'Et Harum quidem reprum',
        order: 1,
        content: '# Some other content',
        files: []
      },
      {
        id: 4,
        title: 'Et Harum quidem reprum',
        order: 2,
        content: '# Some other content',
        files: []
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
      files: this.getFiles(data.files),
      documents: this.getDocuments(data.documents),
      directories: this.getDirectories(data.directories),
      translations: data.translations,
      parentId: data.parentId
    })
  },

  // Useful function to get an array of file objects
  getFiles (dataArray) {
    let files = []
    if (Array.isArray(dataArray)) {
      dataArray.forEach((data) => {
        files.push(this.getFileObject(data))
      })
    }
    return files
  },

  // Useful function to get an array of document objects
  getDocuments (dataArray) {
    let documents = []
    if (Array.isArray(dataArray)) {
      dataArray.forEach((data) => {
        documents.push(this.getDocumentObject(data))
      })
    }
    return documents
  },

  // Useful function to build a directory object
  getFileObject (data) {
    return new File({
      id: data.id,
      title: data.title,
      filename: data.filename,
      size: data.size,
      mimeType: data.mimeType,
      featured: data.featured
    })
  },

  // Useful function to build a directory object
  getDocumentObject (data) {
    return new Document({
      id: data.id,
      translations: data.translations
    })
  },

  // Use a mock structure until we know what the endpoints will be
  getMockStructure () {
    return mockStructure
  },

  getFlatStructure (structure, flatStructure = []) {
    structure.forEach(directory => {
      let childDirectories = directory.directories
      if (Array.isArray(childDirectories)) {
        this.getFlatStructure(childDirectories, flatStructure)
      }
      flatStructure.push(directory.flatten())
    })
    return flatStructure
  },

  traverseWithOrder (directories, directoryNumbers) {
    if (directoryNumbers !== undefined) {
      directoryNumbers.forEach((directoryNumber, index) => {
        if (index === 0) {
          // an array so a bit different to find
          directories = directories.find(directory => directory.order === directoryNumber)
        } else {
          directories = directories.directories.find(directory => directory.order === directoryNumber)
        }
      })
      directories = directories.directories
    }
    return directories
  }
}

export default DirectoryUtils
