const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const authService = require('../services/auth')()
const roles = require('../services/roles')
const userRules = {
  'email': {
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  },
  'password': {
    notEmpty: true,
    isLength: {
      options: [{min: 8}]
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
  }
}

// GET /api/user
router.get('/', authService.authenticate(), roles.is('admin'), controller.getAll)
router.get('/me', authService.authenticate(), controller.getAuthenticatedUser)
router.get('/:id', controller.getUser)
router.put('/', authService.authenticate(), (req, res, next) => {
  req.checkBody(userRules)
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.createUser)
router.post('/:id', authService.authenticate(), (req, res, next) => {
  // @todo check permissions here
  // clone base rules and make optional
  let rules = Object.assign({}, userRules)
  rules.email.optional = true
  rules.password.optional = true
  rules.firstname.optional = true
  rules.lastname.optional = true

  req.checkBody(rules)
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.updateUser)
router.delete('/:id', authService.authenticate(), controller.deleteUser)
router.put('/me/password', authService.authenticate(), (req, res, next) => {
  req.checkBody({
    'password': userRules.password,
    'new_password': userRules.password
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
