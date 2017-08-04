const Directory = require('../models').Directory
const Project = require('../models').Project
const User = require('../models').User

module.exports = {
  getAll (req, res, next) {
    Directory.findAll({
      where: {
        projectId: req.params.id
      }
    }).then((directories) => {
      res.status(200).json({status: 200, data: directories})
    })
  },
  get (req, res, next) {
    Directory.findById(req.params.did, {
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
      }, {
        model: Directory,
        as: 'directories'
      }]
    }).then((directory) => {
      if (directory === null) {
        return res.status(404).json({status: 404, message: 'Directory not found'})
      }
      res.status(200).json({status: 200, data: directory})
    })
  },
  create (req, res, next) {
    Project.findById(parseInt(req.params.id)).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }
      const data = Object.assign(req.body, {
        createdById: req.user.id,
        projectId: project.id
      })
      return Directory.create(data)
    }).then((directory) => {
      return Directory.findById(directory.id, {
        include: [{
          model: User,
          as: 'createdBy',
          attributes: User.safeAttributes()
        }, {
          model: Directory,
          as: 'directories'
        }]
      })
    }).then((directory) => {
      res.status(201).json({status: 201, data: directory})
    })
  }
}
