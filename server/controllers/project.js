const Project = require('../models').Project

module.exports = {
  getAll (req, res, next) {
    Project.findAll().then((projects) => {
      res.status(200).json({status: 200, data: projects})
    }).catch(() => {
      res.status(200).json({status: 200, data: []})
    })
  },
  get (req, res, next) {
  },
  create (req, res, next) {
  },
  update (req, res, next) {
  },
  delete (req, res, next) {
  }
}
