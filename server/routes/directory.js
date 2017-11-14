const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/directory')

// GET /api/directories/:id
router.get('/:id', authService.authenticate(), controller.get)
// PUT /api/directories/:id
router.put('/:id', authService.authenticate(), (req, res, next) => {
  req.checkBody('parentId').optional({checkFalsy: true}).isInt()
  req.checkBody('order').optional().isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.update)
// DELETE /api/directories/:id
router.delete('/:id', authService.authenticate(), controller.delete)

// PUT  /api/directories/:id/translations/:lang
router.put('/:id/translations/:lang', authService.authenticate(), (req, res, next) => {
  req.checkParams('lang').isAlpha()
  req.checkBody('title').optional({checkFalsy: true})
  req.checkBody('newRevision').isBoolean()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.updateTranslation)

// PUT  /api/directories/:id/metadata
router.put('/:id/metadata', authService.authenticate(), controller.updateMetadata)

module.exports = router
