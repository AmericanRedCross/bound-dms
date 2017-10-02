class Publish {

  constructor (options) {
    const defaults = {
      type: 'file',
      storage: 'disk',
      directory: '/static/publishes'
    }

    this._options = Object.assign({}, defaults, options)
    this._directoryData = null
  }

  setFlatData (directoryData) {
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
    return structure
  }
}

module.exports = Publish
