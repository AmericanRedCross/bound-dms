const Project = require('../models').Project
const Language = require('../models').ProjectLanguage

module.exports = {
  getAll (req, res, next) {
    Project.findById(req.params.id, {
      include: [{
        model: Language,
        as: 'languages'
      }]
    }).then(project => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      res.status(200).json({status: 200, data: project.languages})
    })
  },
  create (req, res, next) {
    Project.findById(req.params.id).then(project => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      Language.create({projectId: project.id, code: req.params.code}).then((language) => {
        res.status(201).json({status: 201, data: language})
      })
    }).catch(err => {
      console.error(err)
      res.status(500).json({status: 500, message: 'Could not add language'})
    })
  },
  delete (req, res, next) {
    Language.destroy({
      where: {projectId: req.params.id, code: req.params.code}
    }).then(() => {
      res.status(200).json({status: 200, message: 'Language deleted'})
    })
  }
}
