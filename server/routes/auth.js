const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const authService = require('../services/auth')()

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
router.post('/reset_password', (req, res, next) => {
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

// GET /api/auth/reset_password/:token
router.get('/reset_password/:token', controller.handlePasswordReset)

module.exports = router
