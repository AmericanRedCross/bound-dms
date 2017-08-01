const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/directory')

// GET /api/projects/:id/directories
router.get('/:id/directories', authService.authenticate(), controller.getAll)

module.exports = router
