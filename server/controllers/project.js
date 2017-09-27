const Project = require('../models').Project
const User = require('../models').User
const Language = require('../models').ProjectLanguage
const ApiKey = require('../models').ApiKey

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
    Project.findById(parseInt(req.params.id)).then((project) => {
      if (project === null) {
        res.status(404).json({status: 404, message: 'Project not found'})
      }

      // req.user in this case may be either a User object or an ApiKey object
      if (req.user instanceof ApiKey) {
        // check that the api key matches this project
        if (req.user.projectId !== project.id) {
          res.status(403).json({status: 403, message: 'API key does not belong to this project'})
        }
      }

      const url = 'http://' + req.hostname + ':' + req.app.settings.port
      if (req.query.redirect && req.query.redirect === 'true') {
        const lang = req.query.language === 'fr' ? 'fr' : 'en'
        const redirect = url + '/static/example_project_' + lang + '.tar.gz'
        return res.redirect(redirect)
      }

      return res.status(200).json({
        status: 200,
        data: {
          'id': 'x7wndlweRs',
          'publish_date': '2017-07-13T10:40:34+00:00',
          'download_url': url + '/api/projects/' + project.id + '/publishes/latest?redirect=true',
          'languages': ['en', 'fr']
        }
      })
    })
  }
}
