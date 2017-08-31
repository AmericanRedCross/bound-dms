const express = require('express')
const router = express.Router()
const controller = require('../controllers/project')
const langController = require('../controllers/language')
const dirController = require('../controllers/directory')
const keyController = require('../controllers/apiKey')
const authService = require('../services/auth')()
const projectRules = {
  'name': {
    notEmpty: true
  }
}

// GET /api/projects
router.get('/', authService.authenticate(), controller.getAll)
router.get('/:id', controller.get)
router.get('/:id/publishes/latest', controller.getLatestPublish)
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
// Languages
router.get('/:id/languages', authService.authenticate(), langController.getAll)
router.put('/:id/languages/:code', authService.authenticate(), (req, res, next) => {
  req.checkParams('id', 'Invalid project id').isInt()
  req.checkParams('code', 'Invalid language code').notEmpty()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, langController.create)
router.delete('/:id/languages/:code', authService.authenticate(), (req, res, next) => {
  req.checkParams('id', 'Invalid project id').isInt()
  req.checkParams('code', 'Invalid language code').notEmpty()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, langController.delete)

router.get('/:projectId/api-keys', authService.authenticate(), keyController.getAllForProject)

router.put('/:projectId/api-keys', authService.authenticate(), (req, res, next) => {
  req.checkParams('projectId', 'Invalid project id').isInt()
  req.checkBody({
    'name': {
      notEmpty: true
    }
  })
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, keyController.create)

// GET /api/projects/:id/directories
router.get('/:id/directories', authService.authenticate(), dirController.getAll)
// POST /projects/:id/directories
router.post('/:id/directories', authService.authenticate(), (req, res, next) => {
  req.checkBody('parentId').optional({checkFalsy: true}).isInt()
  req.checkBody('order').optional().isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 422, errors: result.array()})
      return
    }
    next()
  })
}, dirController.create)

module.exports = router
