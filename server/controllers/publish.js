const Project = require('../models').Project
const Publish = require('../models').Publish
const Language = require('../models').ProjectLanguage
const User = require('../models').User
const config = require('../config')
const PublishTask = require('../services/publish/publishTask')
const BundleArchive = require('../services/publish/bundleArchive')
const path = require('path')
const audit = require('../services/audit')

const scheme = config.enableHttps ? 'https://' : 'http://'
const url = [scheme, config.systemHostname].join('')

module.exports = {
  getAll (req, res, next) {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let offset = page - 1
    if (offset > 0) {
      offset = (limit * offset)
    }

    Project.findById(parseInt(req.params.id)).then(project => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }

      Publish.findAndCount({
        where: {
          projectId: project.id
        },
        include: [{
          model: User,
          as: 'createdBy',
          attributes: User.safeAttributes()
        }],
        limit: limit,
        offset: offset,
        distinct: true,
        order: [['createdAt', 'DESC']]
      }).then(({rows, count}) => {
        return res.status(200).json({
          status: 200,
          data: rows,
          meta: {
            total: count
          }
        })
      }).catch(err => {
        res.status(500).json({status: 500, error: err})
      })
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
  },
  create (req, res, next) {
    Project.findById(parseInt(req.params.id)).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      const archive = new BundleArchive({
        host: url,
        publishDir: config.publish.directory
      })
      const task = new PublishTask(archive, {
        projectId: project.id,
        language: req.body.language,
        userId: req.user.id
      })
      // Start the publish
      return task.start()
    }).then((publish) => {
      audit.emit('event:publishCreated', publish.id, req.user.id)
      return res.status(201).json({status: 201, data: publish})
    }).catch(err => {
      console.error(err)
      res.status(500).json({status: 500, message: 'There was a problem creating the publish'})
    })
  }
}
