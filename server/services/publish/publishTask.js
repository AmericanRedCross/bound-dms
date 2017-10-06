const Directory = require('../../models').Directory
const DirectoryTrans = require('../../models').DirectoryTranslation
const Metatype = require('../../models').Metatype
const File = require('../../models').File
const Document = require('../../models').Document
const DocumentTrans = require('../../models').DocumentTranslations
const PublishFormat = require('./publishFormat')
const Publish = require('../../models').Publish
const path = require('path')

class PublishTask {

  constructor (publishFormat, options) {
    this._publishFormat = publishFormat
    this._language = options.language || 'en'
    this._projectId = options.projectId
    this._userId = options.userId || null
  }

  start () {
    return this.loadData().then(data => {
      if (this._publishFormat instanceof PublishFormat) {
        // flatten model object
        const flatData = data.map(dir => dir.toJSON())
        this._publishFormat.setData(flatData)
        // start publish of this format instance
        return this._publishFormat.start(this._language)
      } else {
        throw new Error('Invalid publish format')
      }
    }).then((data) => {
      // publish complete
      return this.savePublishRecord(data)
    })
  }

  loadData () {
    return Directory.findAll({
      where: {
        projectId: this._projectId
      },
      include: [{
        model: DirectoryTrans,
        as: 'translations',
        attributes: ['title', 'language']
      }, {
        model: Metatype,
        as: 'metatypes'
      }, {
        model: File,
        as: 'files' /*,
        where: {
          $or: [{
            code: this._language
          }, {
            code: null
          }]
        }*/
      }, {
        model: Document,
        as: 'documents',
        attributes: ['id'],
        include: [{
          model: DocumentTrans,
          as: 'translations',
          where: {language: this._language}
        }]
      }]
    })
  }

  savePublishRecord (publishData) {
    return Publish.create({
      projectId: this._projectId,
      language: this._language,
      type: 'bundleArchive',
      filePath: path.basename(publishData.path),
      createdById: this._userId
    })
  }
}

module.exports = PublishTask
