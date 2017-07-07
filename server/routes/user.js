const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
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
router.get('/', controller.getAll)
router.get('/:id', controller.getUser)
router.put('/', (req, res, next) => {
  req.checkBody(userRules)
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.createUser)
router.post('/:id', (req, res, next) => {
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
router.delete('/:id', controller.deleteUser)

module.exports = router
