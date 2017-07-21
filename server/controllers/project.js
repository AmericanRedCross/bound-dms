const Project = require('../models').Project
const User = require('../models').User

module.exports = {
  getAll (req, res, next) {
    Project.findAll({
      include: [{
        model: User,
        as: 'createdBy',
        attributes: User.safeAttributes()
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
      }]
    }).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
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
  }
}
