const express = require('express')
const router = express.Router()
const authService = require('../services/auth')()
const controller = require('../controllers/document')

// GET /api/documents/:id/translations
router.get('/:id/translations', authService.authenticate(), controller.getAllTranslations)
// GET /api/documents/:id/translations/:language
router.get('/:id/translations/:language', authService.authenticate(), controller.getTranslation)

module.exports = router
