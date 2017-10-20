const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const historyController = require('../controllers/history')
const authService = require('../services/auth')()
const roles = require('../services/roles')
const userRules = {
  'email': {
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  },
  'firstname': {
    notEmpty: true,
    isLength: {
      options: [{max: 100}]
    }
  },
  'lastname': {
    notEmpty: true,
    isLength: {
      options: [{max: 100}]
    }
  },
  'role': {
    notEmpty: true,
    isIn: {
      options: [['admin', 'editor', 'translator']]
    }
  },
  'isActive': {
    notEmpty: true,
    isBoolean: {
      errorMessage: 'should be a boolean'
    }
  }
}
const passwordRules = {
  notEmpty: true,
  isLength: {
    options: [{min: 8}]
  }
}

// GET /api/user
router.get('/', authService.authenticate(), roles.is('admin'), controller.getAll)
router.get('/me', authService.authenticate(), controller.getAuthenticatedUser)
router.get('/:id', authService.authenticate(), controller.getUser)
router.get('/:id/history', authService.authenticate(), historyController.getForUser)
router.post('/', authService.authenticate(), roles.is('admin'), (req, res, next) => {
  req.checkBody(userRules)
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.createUser)
router.put('/:id', authService.authenticate(), (req, res, next) => {
  // only permit updates to other users if user is admin
  if (req.params.id !== req.user.id && req.user.role !== 'admin') {
    res.status(403).json({status: 403, message: 'Forbidden'})
    return
  }

  // clone base rules and make optional
  let rules = Object.assign({}, userRules)
  rules.email.optional = true
  rules.firstname.optional = true
  rules.lastname.optional = true
  rules.role.optional = true
  rules.isActive.optional = true

  req.checkBody(rules)
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.updateUser)
router.delete('/:id', authService.authenticate(), roles.is('admin'), controller.deleteUser)
router.put('/me/password', authService.authenticate(), (req, res, next) => {
  req.checkBody({
    'password': passwordRules,
    'newPassword': passwordRules
  })
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.updatePassword)

module.exports = router
