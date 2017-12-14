const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/document')
const formidable = require('formidable')
const config = require('../config')

// PATCH /api/documents/:id
router.patch('/:id', authService.authenticate(), (req, res, next) => {
  // req.checkBody('directory.id', 'Invalid directory id').exists().isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, controller.update)
// GET /api/documents/:id/translations
router.get('/:id/translations', authService.authenticate(), controller.getAllTranslations)
// GET /api/documents/:id/translations/:language
router.get('/:id/translations/:language', authService.authenticate(), controller.getTranslation)
// PUT /api/documents/:id/translations/:language
router.put('/:id/translations/:language', authService.authenticate(), (req, res, next) => {
  req.checkBody('title', 'Invalid title').optional({checkFalsy: true})
  req.checkBody('content').optional({checkFalsy: true})
  req.checkBody('revision').optional().isInt()
  req.checkBody('newRevision').optional({checkFalsy: true}).isBoolean()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, controller.storeTranslation)

// POST /api/documents/convert
router.post('/convert', authService.authenticate(), (req, res, next) => {
  const form = new formidable.IncomingForm()

  form.multiples = false
  form.keepExtensions = true
  form.uploadDir = config.uploads.directory

  form.on('error', (err) => {
    console.log('An error has occurred: \n' + err)
    next(err)
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return res.status(400).json({status: 400, errors: err})
    }

    if (!files['file'] && files['file'].type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return res.status(400).json({status: 400, errors: 'Invalid file type'})
    }

    req.uploadedFile = files['file']
    next()
  })
}, controller.uploadAndConvert)

// DELETE /api/documents/:id/translations/:language
router.delete('/:id/translations/:language', authService.authenticate(), controller.deleteTranslation)
// DELETE /api/documents/:id
router.delete('/:id', authService.authenticate(), controller.delete)

module.exports = router
