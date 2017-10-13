const fileService = require('../services/files')()
const path = require('path')
const audit = require('../services/audit')

module.exports = {
  getForProjectId (req, res, next) {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let filter = req.query.filter || null
    let projectId = req.params.id
    fileService.getForProjectId(page, limit, projectId, filter).then(({rows, count}) => {
      res.status(200).json({
        status: 200,
        data: rows,
        meta: {
          total: count
        }
      })
    })
  },
  getOne (req, res, next) {
    fileService.getById(parseInt(req.params.id))
      .then((file) => {
        if (!file) {
          res.status(404).json({status: 404, message: 'File not found'})
        }
        res.status(201).json({status: 201, data: file})
      }).catch((err) => {
        res.status(500).json({status: 500, error: err})
      })
  },
  update (req, res, next) {
    fileService.getById(parseInt(req.params.id))
      .then(file => {
        if (!file) {
          res.status(404).json({status: 404, message: 'File not found'})
        }
        return fileService.update(file, req.body)
      }).then(file => {
        audit.emit('event:fileUpdated', file.id, req.user.id, req.body)
        res.status(200).json({status: 200, data: file})
      }).catch((err) => {
        res.status(500).json({status: 500, error: err})
      })
  },
  createMultiple (req, res, files, fields) {
    let projectId = parseInt(fields.projectId)
    let languageCode = fields.languageCode || null
    let directoryId = (fields.directoryId) ? parseInt(fields.projectId) : null
    let inputCount = files.length

    Promise.all(
      files.map((file, index) => {
        return Promise.all(
          [
            fileService.persist({
              projectId: projectId,
              directoryId: directoryId,
              title: file.name.replace(/\.[^/.]+$/, ''),
              filename: path.basename(file.path),
              mimeType: file.type,
              createdById: req.user.id,
              code: languageCode
            }),
            fileService.generateThumbnails(file.path)
          ]
        ).then(([persistedFile, thumbSizes]) => {
          audit.emit('event:fileCreated', persistedFile.id, req.user.id)
          thumbSizes.map(({filename, isSystemThumbnail}) => {
            fileService.persist({
              parentId: persistedFile.id,
              title: persistedFile.title,
              filename: filename,
              mimeType: persistedFile.mimeType,
              metadata: (isSystemThumbnail) ? 'system-thumbnail' : null,
              createdById: req.user.id,
              code: languageCode
            })
          })
          return persistedFile
        }).catch((err) => {
          console.error(err)
          return null
        })
      })
    ).then((files) => {
      files = files.filter(Boolean)
      if (files.length === 0) {
        // this path is not covered by a test, as mocking a database write failure is tricky
        res.status(500).json({status: 500, error: 'No files were uploaded'})
      } else if (inputCount !== files.length) {
        // this path is not covered by a test, as mocking a database write failure is tricky
        res.status(201).json({status: 207, message: inputCount + ' file(s) were uploaded', data: files})
      } else {
        res.status(201).json({status: 201, data: files})
      }
    })
    .catch(err => {
      res.status(500).json({status: 500, error: err})
    })
  },
  createSingle (req, res, file, fields) {
    let projectId = parseInt(fields.projectId)
    let languageCode = fields.languageCode || null
    let directoryId = (fields.directoryId) ? parseInt(fields.projectId) : null
    let title = (fields.title) ? fields.title : file.name.replace(/\.[^/.]+$/, '')
    let description = (fields.description) ? (fields.description) : null
    Promise.all(
      [
        fileService.persist({
          projectId: projectId,
          directoryId: directoryId,
          title: title,
          description: description,
          filename: path.basename(file.path),
          mimeType: file.type,
          createdById: req.user.id,
          code: languageCode
        }),
        fileService.generateThumbnails(file.path)
      ]
    ).then(([persistedFile, thumbSizes]) => {
      audit.emit('event:fileCreated', persistedFile.id, req.user.id)
      thumbSizes.map(({filename, isSystemThumbnail}) => {
        fileService.persist({
          parentId: persistedFile.id,
          title: persistedFile.title,
          description: persistedFile.description,
          filename: filename,
          mimeType: persistedFile.mimeType,
          metadata: (isSystemThumbnail) ? 'system-thumbnail' : null,
          createdById: req.user.id,
          code: languageCode
        })
      })
      return res.status(201).json({status: 201, data: [persistedFile]})
    }).catch((err) => {
      // this path is not covered by a test, as mocking a database write failure is tricky
      res.status(500).json({status: 500, error: 'File was not uploaded'})
    })
  }
}
