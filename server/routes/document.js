const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/document')

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
  req.checkBody('title', 'Invalid title').isAscii()
  req.checkBody('content').optional({checkFalsy: true})
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, controller.storeTranslation)

// DELETE /api/documents/:id/translations/:language
router.delete('/:id/translations/:language', authService.authenticate(), controller.deleteTranslation)
// DELETE /api/documents/:id
router.delete('/:id', authService.authenticate(), controller.delete)

module.exports = router
