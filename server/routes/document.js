const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/document')

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

module.exports = router
