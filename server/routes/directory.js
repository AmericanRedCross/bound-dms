const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/directory')

// GET /api/projects/:id/directories
router.get('/', authService.authenticate(), controller.getAll)
// GET /api/directories/:id
router.get('/:id', authService.authenticate(), controller.get)
// PUT /api/directories/:id
router.put('/:id', authService.authenticate(), (req, res, next) => {
  req.checkBody('parentId').optional({checkFalsy: true}).isInt()
  req.checkBody('order').optional().isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 422, errors: result.array()})
      return
    }
    next()
  })
}, controller.update)
// DELETE /api/directories/:id
router.delete('/:id', authService.authenticate(), controller.delete)

module.exports = router
