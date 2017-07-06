const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const path = require('path')

// express config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 8000)

app.use(express.static(path.join(__dirname, 'dist')))

// register api
router.get('/', (req, res) => {
  res.status(200).json({success: true})
})
app.use('/api', router)

// start server
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'))
})

module.exports = app
