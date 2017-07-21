const express = require('express')
const router = express.Router()
const controller = require('../controllers/project')
const authService = require('../services/auth')()
const projectRules = {
  'name': {
    notEmpty: true
  }
}

// GET /api/projects
router.get('/', authService.authenticate(), controller.getAll)
router.get('/:id', controller.get)
router.put('/', authService.authenticate(), (req, res, next) => {
  req.checkBody(projectRules)
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.create)
router.post('/:id', authService.authenticate(), (req, res, next) => {
  // @todo check permissions here
  // clone base rules and make optional
  let rules = Object.assign({}, projectRules)
  rules.name.optional = true

  req.checkBody(rules)
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.update)
router.delete('/:id', authService.authenticate(), controller.delete)

module.exports = router