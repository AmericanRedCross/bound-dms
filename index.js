const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const path = require('path')
const validator = require('express-validator')
const history = require('connect-history-api-fallback')
const auth = require('./server/routes/auth')
const userRoutes = require('./server/routes/user')
const projectRoutes = require('./server/routes/project')
const apiKeyRoutes = require('./server/routes/apiKeys')
const fileRoutes = require('./server/routes/files')
const directoryRoutes = require('./server/routes/directory')
const documentRoutes = require('./server/routes/document')
const roleService = require('./server/services/roles')
const authService = require('./server/services/auth')()
const helmet = require('helmet')

// express config
app.use(history({
  rewrites: [{
    from: '/api',
    to: (context) => {
      return context.parsedUrl.pathname
    }
  }]
}))
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(authService.initialize())
app.use(roleService.middleware())
app.use(validator())
app.set('port', process.env.PORT || 8000)

app.use(express.static(path.join(__dirname, 'dist')))
app.use('/static', express.static(path.join(__dirname, 'static')))

// register api routes
router.get('/', (req, res) => {
  res.status(200).json({success: true})
})
router.use('/auth', auth)
router.use('/users', userRoutes)
router.use('/projects', projectRoutes)
router.use('/directories', directoryRoutes)
router.use('/api-keys', apiKeyRoutes)
router.use('/documents', documentRoutes)
router.use('/files', fileRoutes)
router.use('/documents', documentRoutes)
router.use('/files', fileRoutes)
app.use('/api', router)

// register global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    status: res.statusCode,
    message: err.message
  })
})

// start server
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'))
})

module.exports = app
