const Project = require('../models').Project
const Document = require('../models').Document
const User = require('../models').User

module.exports = {
  create (req, res, next) {
    return Project.findById(req.params.id).then((project) => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }

      return Document.create({
        projectId: project.id,
        createdById: req.user.id,
        translations: [{
          language: req.body.language,
          title: req.body.title,
          content: req.body.content
        }]
      }, {
        include: ['translations']
      })
    }).then((doc) => {
      return res.status(201).json({status: 201, data: doc})
    })
  }
}
