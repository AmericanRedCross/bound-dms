const Project = require('../models').Project
const User = require('../models').User
const Language = require('../models').ProjectLanguage
const ApiKey = require('../models').ApiKey
const Publish = require('../models').Publish
const config = require('../config')

module.exports = {
  getAll (req, res, next) {
    Project.findAll({
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      },
      {
        model: Language,
        as: 'languages'
      }]
    }).then(projects => {
      res.status(200).json({status: 200, data: projects})
    })
  },
  get (req, res, next) {
    Project.findById(parseInt(req.params.id), {
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      },
      {
        model: Language,
        as: 'languages'
      }]
    }).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }

      // req.user in this case may be either a User object or an ApiKey object
      if (req.user instanceof ApiKey) {
        // check that the api key matches this project
        if (req.user.projectId !== project.id) {
          res.status(403).json({status: 403, message: 'API key does not belong to this project'})
        }
      }

      res.status(200).json({status: 200, data: project})
    })
  },
  create (req, res, next) {
    const data = Object.assign(req.body, {createdById: req.user.id})
    Project.create(data).then((project) => {
      return Project.findById(project.id, {
        include: [{
          model: User,
          as: 'createdBy',
          attributes: User.safeAttributes()
        }]
      })
    }).then((project) => {
      res.status(201).json({status: 201, data: project})
    })
  },
  update (req, res, next) {
    Project.findById(parseInt(req.params.id), {
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      }]
    }).then(project => {
      if (!project) {
        res.status(404).json({status: 404, message: 'Project not found'})
      }
      return project.update(req.body, {fields: Project.massAssignable()})
    }).then(project => {
      res.status(200).json({status: 200, data: project})
    })
  },
  delete (req, res, next) {
    Project.findById(parseInt(req.params.id)).then((project) => {
      if (project === null) {
        res.status(404).json({status: 404, message: 'Project not found'})
      }
      return project.destroy()
    }).then(() => {
      res.status(200).json({status: 200, message: 'Project deleted'})
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
