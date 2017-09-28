const Project = require('../models').Project
const Document = require('../models').Document
const DocumentTranslations = require('../models').DocumentTranslations
const User = require('../models').User
const Directory = require('../models').Directory
const docService = require('../services/document')
const fs = require('fs')

module.exports = {
  getAll (req, res, next) {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let offset = page - 1
    if (offset > 0) {
      offset = (limit * offset)
    }
    return Document.findAndCount({
      where: {
        projectId: req.params.id
      },
      limit: limit,
      offset: offset,
      distinct: true,
      order: [
        ['createdAt', 'DESC']
      ],
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
    }).then(({rows, count}) => {
      return res.status(200).json({
        status: 200,
        data: {
          documents: rows,
          total: count
        }
      })
    }).catch(err => {
      res.status(500).json({status: 500, error: err})
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
    }).catch(err => {
      res.status(500).json({status: 500, error: err})
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
    }).catch(err => {
      res.status(500).json({status: 500, error: err})
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
      const directoryId = parseInt(req.body.directory.id)
      if (document.directoryId !== directoryId) {
        return Directory.findById(directoryId)
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
    }).catch(err => {
      res.status(500).json({status: 500, error: err})
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
    }).catch(err => {
      res.status(500).json({status: 500, error: err})
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
    }).catch(err => {
      res.status(500).json({status: 500, error: err})
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
    }).catch(err => {
      res.status(500).json({status: 500, error: err})
    })
  },
  uploadAndConvert (req, res, next) {
    fs.readFile(req.uploadedFile.path, (err, buf) => {
      if (err) {
        console.error('Error locating uploaded document', err)
        return res.status(500).json({status: 500, message: 'Error converting uploaded document'})
      }
      docService.convertDocxToMarkdown(buf).then(md => {
        return res.status(200)
        .set('Content-Type', 'text/plain')
        .set('Cache-Control', 'no-cache')
        .send(md)
      })
      .catch((err) => {
        console.error('Error converting uploaded document to md', err)
        res.status(500).json({status: 500, message: 'Error converting uploaded document'})
      })
    })
  }
}
