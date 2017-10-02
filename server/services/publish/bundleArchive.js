const Publish = require('./publish')

class BundleArchive extends Publish {

  buildDirectoryJson (flatData, language) {
    return flatData.map(dir => {
      const titleData = dir.translations.filter(trans => { return trans.language === language })
      const title = titleData.length > 0 ? titleData[0].title : 'Title not set'
      const url = dir.documents.length > 0 ? this.getContentFilename(dir.documents[0], language) : null

      return {
        id: dir.id,
        parentId: dir.parentId,
        title: title,
        order: dir.order,
        content: url ? ['/content/', url].join('') : null,
        metadata: {},
        directories: [],
        attachments: []
      }
    })
  }

  getContentFilename (doc, language) {
    if (doc.translations.length > 0) {
      const trans = doc.translations.filter(trans => trans.language === language)
      if (trans.length > 0) {
        return [trans[0].title, trans[0].id, trans[0].language].join('_').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.md'
      } else {
        return null
      }
    }
  }

  exportDocumentFiles () {

  }

  createBundleFile () {

  }

  publish () {
    Promise.all([
      this.buildDirectoryJson(),
      this.exportDocumentFiles()
    ]).then(results => {
      this.createBundleFile()
    })
  }
}

module.exports = BundleArchive
