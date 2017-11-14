const Directory = require('../models').Directory
const Project = require('../models').Project
const User = require('../models').User
const ProjectLanguage = require('../models').ProjectLanguage
const DirectoryTrans = require('../models').DirectoryTranslation
const Document = require('../models').Document
const DocumentTranslations = require('../models').DocumentTranslations
const Metatype = require('../models').Metatype
const MetaValue = require('../models').MetaValue
const File = require('../models').File
const audit = require('../services/audit')
const Transformer = require('../transformers/directory.js')

const directoryMetaEntity = 'directory'

module.exports = {
  getAll (req, res, next) {
    Directory.findAll({
      where: {
        projectId: req.params.id
      },
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      }, {
        model: DirectoryTrans,
        as: 'translations',
        attributes: ['title', 'language']
      },
      {
        model: Document,
        as: 'documents',
        attributes: ['id'],
        include: [{
          model: DocumentTranslations,
          as: 'translations',
          attributes: { exclude: ['content'] }
        }]
      }, {
        model: File,
        as: 'files'
      }, {
        model: Metatype,
        as: 'metatypes'
      }]
    }).then((directories) => {
      let transformed = []
      directories.forEach((directory) => {
        transformed.push(Transformer.transform(directory))
      })
      res.status(200).json({status: 200, data: transformed})
    })
  },
  get (req, res, next) {
    Directory.findById(req.params.id, {
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      }, {
        model: Directory,
        as: 'directories'
      }, {
        model: DirectoryTrans,
        as: 'translations',
        attributes: ['title', 'language']
      }, {
        model: Metatype,
        as: 'metatypes'
      }]
    }).then((directory) => {
      if (directory === null) {
        return res.status(404).json({status: 404, message: 'Directory not found'})
      }
      res.status(200).json({status: 200, data: Transformer.transform(directory)})
    })
  },
  create (req, res, next) {
    Project.findById(parseInt(req.params.id)).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      const data = Object.assign(req.body, {
        projectId: project.id,
        createdById: req.user.id
      })
      return Directory.create(data)
    }).then((directory) => {
      audit.emit('event:directoryCreated', directory.id, req.user.id)
      return Directory.findById(directory.id, {
        include: [{
          model: User,
          as: 'createdBy',
          attributes: User.safeAttributes()
        }, {
          model: Directory,
          as: 'directories'
        }]
      })
    }).then((directory) => {
      res.status(201).json({status: 201, data: directory})
    })
  },
  update (req, res, next) {
    Directory.findById(req.params.id, {
      include: {
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      }
    }).then(directory => {
      if (directory === null) {
        res.status(404).json({status: 404, message: 'Directory not found'})
      }
      let updated = directory.update(req.body, {fields: Directory.massAssignable()})
      audit.emit('event:directoryUpdated', directory.id, req.user.id, req.body)
      return updated
    }).then(directory => {
      res.status(200).json({status: 200, data: directory})
    })
  },
  delete (req, res, next) {
    Directory.findById(parseInt(req.params.id)).then((dir) => {
      if (dir === null) {
        res.status(404).json({status: 404, message: 'Directory not found'})
      }
      let destroyed = dir.destroy()
      audit.emit('event:directoryDeleted', req.params.id, req.user.id)
      return destroyed
    }).then(() => {
      res.status(200).json({status: 200, message: 'Directory deleted'})
    })
  },
  updateTranslation (req, res, next) {
    Directory.findById(req.params.id).then((directory) => {
      if (directory === null) {
        throw new Error('Directory not found')
      }
      return ProjectLanguage.findOne({where: {projectId: directory.projectId, code: req.params.lang}})
    }).then((lang) => {
      if (lang === null) {
        throw new Error('Project language has not been configured')
      }
      return DirectoryTrans.findOne({where: {directoryId: req.params.id, language: lang.code}})
    }).then((translation) => {
      if (translation !== null) {
        let updateData = {title: req.body.title, revision: translation.revision}
        if (req.body.newRevision) {
          updateData.revision++
        }

        let updated = translation.update(updateData)
        audit.emit('event:directoryTranslationUpdated', translation.id, req.user.id, updateData)
        return updated
      }
      let created = DirectoryTrans.create({directoryId: req.params.id, language: req.params.lang, title: req.body.title})
      audit.emit('event:directoryTranslationCreated', created.id, req.user.id)
      return created
    }).then((translation) => {
      return res.status(200).json({status: 200, data: translation})
    }).catch((err) => {
      return res.status(400).json({status: 400, message: err.message})
    })
  },
  updateMetadata (req, res, next) {
    let metadata = req.body
    Directory.findById(req.params.id).then((directory) => {
      if (directory === null) {
        return res.status(404).json({status: 404, error: 'Directory not found'})
      }
      return directory
    }).then((directory) => {
      return Metatype.findAll({
        where: {
          projectId: directory.projectId
        }
      }).then((metatypes) => {
        return Promise.all(
          metatypes.map((metatype) => {
            if (metatype.key in metadata) {
              let value = metadata[metatype.key]
              let valueType = typeof (value)
              if (value === null) {
                return
              } else if (metatype.type === 'integer') {
                if (valueType !== 'number' || (value % 1)) {
                  return Promise.reject('Value should be an integer for ' + metatype.key + ', ' + valueType + ' given')
                }
              } else if (typeof (value) !== metatype.type) {
                return Promise.reject('Value should be ' + metatype.type + ' for ' + metatype.key + ', ' + valueType + ' given')
              }
              // we can't use upsert here because we don't know the metavalue primary key
              MetaValue.find({
                where: {
                  metaTypeId: metatype.id,
                  entity: directoryMetaEntity,
                  entityId: directory.id
                }
              }).then((existingMetaValue) => {
                if (existingMetaValue) {
                  return existingMetaValue.update({
                    value: value
                  })
                } else {
                  return MetaValue.create({
                    metaTypeId: metatype.id,
                    entity: directoryMetaEntity,
                    entityId: directory.id,
                    value: value
                  })
                }
              })
            } else {
              return Promise.reject('Not all metadata values were provided for this directory')
            }
          })
        ).then(() => {
          audit.emit('event:directoryUpdated', directory.id, req.user.id, metadata)
          return res.status(200).json({status: 200})
        }).catch((err) => {
          return res.status(400).json({status: 400, error: err})
        })
      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      return res.status(500).json({status: 500, error: err})
    })
  }
}
