const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const authService = require('../services/auth')()
const controller = require('../controllers/file')
const config = require('../config')

router.get('/', authService.authenticate(['jwt']), (req, res, next) => {
  req.checkQuery('page').optional().isInt()
  req.checkQuery('limit').optional().isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 422, errors: result.array()})
      return
    }
    next()
  })
}, controller.getAll)

router.post('/', authService.authenticate(['jwt']), (req, res, next) => {
  // create an incoming form object
  let form = new formidable.IncomingForm()

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true

  // store all uploads in the /uploads directory
  form.uploadDir = config.uploads.directory

  form.keepExtensions = true

  form.hash = true

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occurred: \n' + err)
  })

  // parse the incoming request containing the form data
  form.parse(req, function (err, fields, uploadedFiles) {
    if (err) {
      return res.status(400).json({status: 400, errors: err})
    }

    if (Array.isArray(uploadedFiles['files'])) {
      controller.createMultiple(req, res, uploadedFiles['files'])
    } else {
      controller.createSingle(req, res, uploadedFiles['files'], fields)
    }
  })
})

module.exports = router
