const Project = require('../models').Project
const Document = require('../models').Document
const DocumentTranslations = require('../models').DocumentTranslations
const User = require('../models').User
const Directory = require('../models').Directory

module.exports = {
  getAll (req, res, next) {
    return Project.findById(req.params.id, {
      include: [{
        model: Document,
        as: 'documents',
        include: [{
          model: DocumentTranslations,
          as: 'translations',
          attributes: { exclude: ['content'] }
        }, {
          model: User,
          as: 'createdBy',
          attributes: User.safeAttributes()
        }, {
          model: Directory,
          as: 'directory'
        }]
      }]
    }).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }

      return res.status(200).json({status: 200, data: project.documents})
    })
  },
  create (req, res, next) {
    return Project.findById(req.params.id).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }

      return Document.create({
        projectId: project.id,
        createdById: req.user.id,
        translations: [{
          language: req.body.language,
          title: req.body.title,
          content: req.body.content
        }]
      }, {
        include: ['translations']
      })
    }).then((doc) => {
      return res.status(201).json({status: 201, data: doc})
    })
  },
  delete (req, res, next) {
    Document.findById(parseInt(req.params.id)).then((document) => {
      if (document === null) {
        res.status(404).json({status: 404, message: 'Document not found'})
      }
      return document.destroy()
    }).then(() => {
      res.status(200).json({status: 200, message: 'Document deleted'})
    })
  },
  update (req, res, next) {
    Document.findById(parseInt(req.params.id), {
      include: [{
        model: Directory,
        as: 'directory'
      }]
    }).then((document) => {
      if (document === null) {
        return res.status(404).json({status: 404, message: 'Document not found'})
      }
      if (document.directoryId !== parseInt(req.body.directory.id)) {
        return Directory.findById(parseInt(req.body.directory.id))
        .then((directory) => {
          return document.setDirectory(directory).then((document) => {
            return document.reload()
          })
        })
        .then((document) => {
          return res.status(200).json({status: 200, data: document})
        })
      } else {
        return res.status(200).json({status: 200, data: document})
      }
    })
  },
  getAllTranslations (req, res, next) {
    return DocumentTranslations.findAll({
      where: {
        documentId: req.params.id
      },
      attributes: { exclude: ['content'] }
    }).then((translations) => {
      if (translations === null) {
        return res.status(404).json({status: 404, message: 'Document not found'})
      }
      res.status(200).json({status: 200, data: translations})
    })
  },
  getTranslation (req, res, next) {
    return DocumentTranslations.findOne({
      where: {
        documentId: req.params.id,
        language: req.params.language
      }
    }).then((translation) => {
      if (translation === null) {
        return res.status(404).json({status: 404, message: 'Translation not found'})
      }
      res.status(200).json({status: 200, data: translation})
    })
  },
  storeTranslation (req, res, next) {
    Document.findById(req.params.id).then((doc) => {
      if (doc === null) {
        return res.status(404).json({status: 404, message: 'Document not found'})
      }

      return DocumentTranslations.findOrCreate({
        where: {
          documentId: doc.id,
          language: req.params.language
        },
        defaults: {
          title: req.body.title,
          content: req.body.content
        }
      }).spread((translation, created) => {
        if (created) {
          return res.status(201).json({status: 201, data: translation})
        } else {
          translation.update({
            title: req.body.title,
            content: req.body.content
          }).then((translation) => {
            return res.status(200).json({status: 200, data: translation})
          })
        }
      })
    })
  },
  deleteTranslation (req, res, next) {
    DocumentTranslations.findOne({
      where: {
        documentId: req.params.id,
        language: req.params.language
      }
    }).then((translation) => {
      if (translation === null) {
        res.status(404).json({status: 404, message: 'Translation not found'})
      }
      return translation.destroy()
    }).then(() => {
      res.status(200).json({status: 200, message: 'Translation deleted'})
    })
  }
}
