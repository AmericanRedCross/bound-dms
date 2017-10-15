const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const authService = require('../services/auth')()

const passwordRules = {
  notEmpty: true,
  isLength: {
    options: [{min: 8}]
  }
}

// POST /api/auth
router.post('/', (req, res, next) => {
  req.checkBody({
    'email': {
      isEmail: {
        errorMessage: 'Invalid Email'
      }
    },
    'password': {
      notEmpty: true
    }
  })

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, controller.login)

// GET /api/auth/refresh
router.get('/refresh', authService.authenticate(), controller.refresh)

// POST /api/auth/reset_password
router.post('/password/reset', (req, res, next) => {
  req.checkBody({
    'email': {
      isEmail: {
        errorMessage: 'Invalid Email'
      }
    }
  })

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, controller.sendPasswordReset)

// POST /api/auth/update_password
router.post('/password/update', (req, res, next) => {
  req.checkBody({
    'token': {
      notEmpty: true
    },
    'password': passwordRules
  })

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, controller.handlePasswordReset)

router.post('/activate', (req, res, next) => {
  req.checkBody({
    'code': {
      notEmpty: true
    },
    'password': passwordRules
  })

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json({status: 400, errors: result.array()})
      return
    }
    next()
  })
}, controller.activateAccount)

module.exports = router
