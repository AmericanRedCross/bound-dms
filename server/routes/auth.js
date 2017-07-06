const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

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
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, controller.login)

module.exports = router
