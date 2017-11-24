const Project = require('../models').Project
const User = require('../models').User
const Language = require('../models').ProjectLanguage
const ApiKey = require('../models').ApiKey
const audit = require('../services/audit')
const documentService = require('../services/document')

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
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      audit.emit('event:projectCreated', project.id, req.user.id)
      Language.create({projectId: project.id, code: req.body.baseLanguage}).then(() => {
        Project.findById(project.id, {
          include: [{
            model: User,
            as: 'createdBy',
            attributes: User.safeAttributes()
          }, {
            model: Language,
            as: 'languages'
          }]
        }).then((projectWithLang) => {
          res.status(201).json({status: 201, data: projectWithLang})
        })
      }).catch((err) => {
        console.log(err)
        res.status(500).json({status: 500, message: 'Could not add language'})
      })
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
      let updated = project.update(req.body, {fields: Project.massAssignable()})
      audit.emit('event:projectUpdated', project.id, req.user.id, req.body)
      return updated
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
      audit.emit('event:projectDeleted', req.params.id, req.user.id)
      res.status(200).json({status: 200, message: 'Project deleted'})
    })
  },
  getStatistics (req, res, next) {
    Project.findById(parseInt(req.params.id)).then((project) => {
      if (project === null) {
        res.status(404).json({status: 404, message: 'Project not found'})
      }

      const promises = [
        documentService.getProjectTranslationPercentage(project),
        documentService.countUntranslatedDocs(project),
        documentService.countOldRevisions(project)
      ]

      Promise.all(promises).then(([translations, untranslated, revisions]) => {
        res.status(200).json({
          status: 200,
          data: {
            translationPercentages: translations,
            untranslatedDocs: untranslated,
            outdatedTranslations: revisions
          }
        })
      })
    })
  }
}
