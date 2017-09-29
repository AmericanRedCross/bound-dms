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
        as: 'attachments'
      }]
    }).then((directories) => {
      res.status(200).json({status: 200, data: directories})
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
      return directory.update(req.body, {fields: Directory.massAssignable()})
    }).then(directory => {
      res.status(200).json({status: 200, data: directory})
    })
  },
  delete (req, res, next) {
    Directory.findById(parseInt(req.params.id)).then((dir) => {
      if (dir === null) {
        res.status(404).json({status: 404, message: 'Directory not found'})
      }
      return dir.destroy()
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
        return translation.update({title: req.body.title})
      }
      return DirectoryTrans.create({directoryId: req.params.id, language: req.params.lang, title: req.body.title})
    }).then((translation) => {
      return res.status(200).json({status: 200, data: translation})
    }).catch((err) => {
      return res.status(400).json({status: 400, message: err.message})
    })
  },
  createMetadata (req, res, next) {
    let key = req.body.key
    let value = req.body.value

    Directory.findById(req.params.id).then((directory) => {
      if (directory === null) {
        return res.status(404).json({status: 404, error: 'Directory not found'})
      }
      return directory
    }).then((directory) => {
      Metatype.find({
        where: {
          projectId: directory.projectId,
          key: key
        }
      }).then((metatype) => {
        if (metatype === null) {
          return res.status(404).json({status: 404, error: 'Meta type does not exist for this project'})
        }
        if (typeof (value) !== metatype.type) {
          let valueType = typeof (value)
          let error = 'Value should be ' + metatype.type + ' for this key, ' + valueType + ' given'
          return res.status(400).json({status: 400, error: error})
        }
        MetaValue.find({
          where: {
            metaTypeId: metatype.id,
            entity: directoryMetaEntity,
            entityId: directory.id
          }
        }).then((existingMetaValue) => {
          if (existingMetaValue) {
            existingMetaValue.update({
              value: value
            }).then((metaValue) => {
              return res.status(200).json({status: 200, data: metaValue})
            })
          } else {
            MetaValue.create({
              metaTypeId: metatype.id,
              entity: directoryMetaEntity,
              entityId: directory.id,
              value: value
            }).then((metaValue) => {
              return res.status(201).json({status: 201, data: metaValue})
            })
          }
        })
      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      return res.status(500).json({status: 500, error: err})
    })
  }
}
