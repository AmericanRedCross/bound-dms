const fileService = require('../services/files')()
const path = require('path')

module.exports = {
  getAll (req, res, next) {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10

    fileService.getAll(page, limit).then(({rows, count}) => {
      res.status(200).json({
        status: 200,
        data: {
          files: rows,
          total: count
        }
      })
    })
  },
  createMultiple (req, res, files) {
    let inputCount = files.length

    Promise.all(
      files.map((file, index) => {
        return Promise.all(
          [
            fileService.persist({
              title: file.name.replace(/\.[^/.]+$/, ''),
              filename: path.basename(file.path),
              mimeType: file.type,
              createdById: req.user.id
            }),
            fileService.generateThumbnails(file.path)
          ]
        ).then(([persistedFile, thumbSizes]) => {
          thumbSizes.map(({filename, isSystemThumbnail}) => {
            fileService.persist({
              parentId: persistedFile.id,
              title: persistedFile.title,
              filename: filename,
              mimeType: persistedFile.mimeType,
              metadata: (isSystemThumbnail) ? 'system-thumbnail' : null,
              createdById: req.user.id
            })
          })
          return persistedFile
        }).catch((err) => {
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
    let title = (fields.title) ? fields.title : file.name.replace(/\.[^/.]+$/, '')
    let description = (fields.description) ? (fields.description) : null
    Promise.all(
      [
        fileService.persist({
          title: title,
          description: description,
          filename: path.basename(file.path),
          mimeType: file.type,
          createdById: req.user.id
        }),
        fileService.generateThumbnails(file.path)
      ]
    ).then(([persistedFile, thumbSizes]) => {
      thumbSizes.map(({filename, isSystemThumbnail}) => {
        fileService.persist({
          parentId: persistedFile.id,
          title: persistedFile.title,
          description: persistedFile.description,
          filename: filename,
          mimeType: persistedFile.mimeType,
          metadata: (isSystemThumbnail) ? 'system-thumbnail' : null,
          createdById: req.user.id
        })
      })
      return res.status(201).json({status: 201, data: persistedFile})
    }).catch((err) => {
      // this path is not covered by a test, as mocking a database write failure is tricky
      res.status(500).json({status: 500, error: 'Files was not uploaded'})
    })
  }
}

