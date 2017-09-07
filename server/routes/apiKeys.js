const express = require('express')
const router = express.Router()
const keyController = require('../controllers/apiKey')
const authService = require('../services/auth')()

router.delete('/:keyId', authService.authenticate(), (req, res, next) => {
  req.checkParams('keyId', 'Invalid api key id').isInt()
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).json(result.array())
      return
    }
    next()
  })
}, keyController.delete)

module.exports = router
