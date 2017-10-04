const Project = require('../models').Project
const Publish = require('../models').Publish
const Language = require('../models').ProjectLanguage
const User = require('../models').User
const config = require('../config')

module.exports = {
  getAll (req, res, next) {
    Publish.findAll({
      where: {
        projectId: parseInt(req.params.id)
      },
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      }],
      order: [['createdAt', 'DESC']]
    }).then((projects) => {
      return res.status(200).json({status: 200, data: projects})
    })
  },
  getLatestPublish (req, res, next) {
    Project.findById(parseInt(req.params.id), {
      include: [{
        model: Language,
        as: 'languages'
      }]
    }).then((project) => {
      if (project === null) {
        res.status(404).json({status: 404, message: 'Project not found'})
      }

      const host = config.systemHostname ? config.systemHostname : req.hostname
      const scheme = config.enableHttps ? 'https://' : 'http://'
      const port = process.env.NODE_ENV !== 'production' ? ':' + req.app.settings.port : ''
      const url = [scheme, host, port].join('')
      const language = req.query.language ? req.query.language : 'en'

      Publish.findOne({
        where: {
          projectId: project.id,
          language: language
        },
        order: [['createdAt', 'DESC']]
      }).then((publish) => {
        if (publish === null) {
          return res.status(404).json({
            status: 404,
            message: 'This project has not been published in the requested language yet'
          })
        }

        if (req.query.redirect && req.query.redirect === 'true') {
          const redirect = url + '/static/publishes/' + publish.filePath
          return res.redirect(redirect)
        }

        return res.status(200).json({
          status: 200,
          data: {
            'id': publish.id,
            'publish_date': new Date(publish.createdAt).toISOString(),
            'download_url': url + '/api/projects/' + project.id + '/publishes/latest?redirect=true',
            'languages': project.languages.map(lang => lang.code)
          }
        })
      }).catch(err => {
        console.error(err)
        res.status(500).json({status: 500, message: 'There was a problem loading the publish data'})
      })
    })
  }
}
