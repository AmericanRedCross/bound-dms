const PublishFormat = require('./publishFormat')
const fs = require('fs')
const path = require('path')
const tar = require('tar')

class BundleArchive extends PublishFormat {

  constructor (options) {
    super(options)
    this._type = 'bundleArchive'
  }

  buildDirectoryJson (language) {
    return this._directoryData.map(dir => {
      const titleData = dir.translations.filter(trans => { return trans.language === language })
      const title = titleData.length > 0 ? titleData[0].title : 'Title not set'
      const filename = dir.documents.length > 0 ? this.getContentFilename(dir.documents[0], language) : null

      return {
        id: dir.id,
        parentId: dir.parentId,
        title: title,
        order: dir.order,
        content: filename ? ['/content/', filename].join('') : null,
        metadata: this.transformMetadata(dir.metatypes),
        directories: [],
        attachments: this.transformFiles(dir.files)
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

  transformFiles (files) {
    return files.map(file => {
      return {
        title: file.title,
        description: file.description,
        url: [this._options.host, this._options.uploadDir, file.filename].join('/'),
        mime: file.mimeType,
        size: 10000
      }
    })
  }

  transformMetadata (metatypes) {
    let metadata = {}
    metatypes.forEach((metatype, index) => {
      let value = metatype.MetaValue.value
      if (metatype.type === 'boolean') {
        value = (value === '1')
      } else if (metatype.type === 'integer') {
        value = parseInt(value)
      }
      metadata[metatype.key] = value
    })

    return metadata
  }

  exportDocumentFile (dir, contentPath, language) {
    if (dir.documents.length > 0 && dir.documents[0].translations.length > 0) {
      const filename = this.getContentFilename(dir.documents[0], language)
      const filepath = path.join(contentPath, filename)
      const trans = dir.documents[0].translations.filter(trans => trans.language === language)
      fs.writeFileSync(filepath, trans[0].content)
    }
  }

  createBundleFile (language, cb) {
    const fileName = Math.floor(this._publishDate.getTime() / 1000).toString()
    const workpath = path.join(this._options.publishDir, fileName)
    const contentPath = path.join(workpath, 'content')
    const structureFile = path.join(workpath, 'structure.json')
    const bundlePath = path.join(this._options.publishDir, fileName) + '_bundle.tar.gz'

    if (!fs.existsSync(workpath)) {
      fs.mkdirSync(workpath)
      fs.mkdirSync(contentPath)
    } else {
      cb(new Error('Bundle path already exists'), null)
    }

    this._directoryData.forEach((dir) => {
      this.exportDocumentFile(dir, contentPath, language)
    })

    fs.writeFileSync(structureFile, JSON.stringify(this._structure))

    tar.create({
      file: bundlePath,
      cwd: path.join(this._options.publishDir, fileName),
      gzip: true,
      sync: true
    }, ['structure.json', 'content'])

    cb(null, {path: bundlePath})
  }

  start (language) {
    return new Promise((resolve, reject) => {
      this.buildStructure(this.buildDirectoryJson(language))
      this.createBundleFile(language, (err, bundleData) => {
        if (err) { reject(err) }
        resolve(bundleData)
      })
    })
  }
}

module.exports = BundleArchive
