const express = require('express')
const router = express.Router()
const controller = require('../controllers/project')
const langController = require('../controllers/language')
const dirController = require('../controllers/directory')
const keyController = require('../controllers/apiKey')
const documentController = require('../controllers/document')
const metaController = require('../controllers/metadata')
const fileController = require('../controllers/file')
const publishController = require('../controllers/publish')
const authService = require('../services/auth')()
const projectRules = {
  'name': {
    notEmpty: true
  },
  'baseLanguage': {
    notEmpty: true,
    isLength: {
      options: [{min: 2, max: 10}]
    }
  }
}

// GET /api/projects
router.get('/', authService.authenticate(['jwt', 'headerapikey']), controller.getAll)
router.get('/:id', authService.authenticate(['jwt', 'headerapikey']), controller.get)
router.get('/:id/publishes/latest', publishController.getLatestPublish)
router.get('/:id/publishes', authService.authenticate(), publishController.getAll)
router.post('/:id/publishes', authService.authenticate(), (req, res, next) => {
  req.checkBody({
    'language': {
      notEmpty: true
    },
    'type': {
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
}, publishController.create)
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

// GET /api/projects/:id/documents
router.get('/:id/documents', authService.authenticate(), documentController.getAll)

// POST /api/projects/:id/documents
router.post('/:id/documents', authService.authenticate(), (req, res, next) => {
  req.checkBody('language', 'Invalid language code').notEmpty()
  req.checkBody('title', 'Invalid title').isAscii()
  req.checkBody('content').optional({checkFalsy: true})
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, documentController.create)

// GET /api/projects/:id/metatypes
router.get('/:id/metatypes', authService.authenticate(), metaController.getAllTypes)
// POST /api/projects/:id/metatypes
router.post('/:id/metatypes', authService.authenticate(), (req, res, next) => {
  req.checkBody('key', 'Invalid key').notEmpty().isLength({min: 2, max: 32})
  req.checkBody('type', 'Invalid type (boolean, string, json, integer)').isIn(['boolean', 'string', 'json', 'integer'])
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, metaController.createType)

module.exports = router

// GET /api/projects/:id/files
router.get('/:id/files', authService.authenticate(['jwt']), (req, res, next) => {
  req.checkQuery('page').optional().isInt()
  req.checkQuery('limit').optional().isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 422, errors: result.array()})
      return
    }
    next()
  })
}, fileController.getForProjectId)
