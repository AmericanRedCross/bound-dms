class PublishFormat {

  constructor (options) {
    const defaults = {
      type: 'file',
      storage: 'disk',
      publishDir: '/static/publishes',
      uploadDir: 'uploads',
      host: 'https://cie.arc.cubeapis.com'
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
    let structure = flatData.filter(directory => directory.parentId === null)
    const buildStructure = (parent) => {
      parent.directories = flatData.filter(child => child.parentId === parent.id)
      // Loop through and build structure
      parent.directories.forEach(child => buildStructure(child))
    }

    structure.forEach(parent => buildStructure(parent))
    this._structure = structure
  }
}

module.exports = PublishFormat
