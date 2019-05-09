class PublishFormat {

  constructor (options) {
    const defaults = {
      type: 'file',
      storage: 'disk',
      publishDir: '/static/publishes',
      uploadDir: 'static/uploads',
      host: 'https://rcmcashcontent.org'
    }

    this._options = Object.assign({}, defaults, options)
    this._directoryData = null
    this._structure = null
    this._publishDate = new Date()
  }

  setData (directoryData) {
    this._directoryData = directoryData
  }

  getFlatData () {
    return this._directoryData
  }

  buildStructure (flatData) {
    let structure = flatData.filter(directory => directory.parentId === null).sort((a, b) => {
      return a.order - b.order
    })
    const buildStructure = (parent) => {
      parent.directories = flatData.filter(child => child.parentId === parent.id).sort((a, b) => {
        return a.order - b.order
      })
      // Loop through and build structure
      parent.directories.forEach(child => buildStructure(child))
    }

    structure.forEach(parent => buildStructure(parent))
    this._structure = structure
  }
}

module.exports = PublishFormat
