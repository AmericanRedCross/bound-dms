const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/directory')

// GET /api/projects/:id/directories
router.get('/:id/directories', authService.authenticate(), controller.getAll)
// GET /api/projects/:id/directories/:did
router.get('/:id/directories/:did', authService.authenticate(), controller.get)
// POST /api/projects/:id/directories
router.post('/:id/directories', (req, res, next) => {
  req.checkBody('parentId').optional({checkFalsy: true}).isInt()
  req.checkBody('order').optional().isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 422, errors: result.array()})
      return
    }
    next()
  })
}, authService.authenticate(), controller.create)

module.exports = router
