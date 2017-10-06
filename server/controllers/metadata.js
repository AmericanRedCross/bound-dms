const Directory = require('../models').Directory
const Project = require('../models').Project
const User = require('../models').User
const ProjectLanguage = require('../models').ProjectLanguage
const DirectoryTrans = require('../models').DirectoryTranslation
const Metatype = require('../models').Metatype
const audit = require('../services/audit')

module.exports = {
  getAllTypes (req, res, next) {
    Project.findById(parseInt(req.params.id), {
      include: [{
        model: Metatype,
        as: 'metatypes'
      }]
    }).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      res.status(200).json({status: 200, data: project.metatypes})
    })
  },
  createType (req, res, next) {
    Project.findById(parseInt(req.params.id)).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      const data = Object.assign(req.body, {
        projectId: project.id,
        createdById: req.user.id
      })
      return Metatype.create(data)
    }).then((metatype) => {
      audit.emit('event:metatypeCreated', metatype.id, req.user.id)
      res.status(201).json({status: 201, data: metatype})
    })
  }
}
