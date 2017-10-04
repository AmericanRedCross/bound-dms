const ApiKey = require('../models').ApiKey
const Project = require('../models').Project
const crypto = require('crypto')
const audit = require('../services/audit')

module.exports = {
  getAllForProject (req, res, next) {
    ApiKey.findAll({ where: {projectId: req.params.projectId} }).then((apiKeys) => {
      if (apiKeys === null) {
        return res.status(404).json({status: 404, message: 'api keys not found'})
      }
      res.status(200).json({status: 200, data: apiKeys})
    })
  },
  create (req, res, next) {
    Project.findById(req.params.projectId).then(project => {
      if (project === null) {
        return res.status(404).json({status: 404, message: 'Project not found'})
      }

      const data = Object.assign(req.body, {createdById: req.user.id, projectId: project.id})
      data.key = crypto.randomBytes(32).toString('hex')
      return ApiKey.create(data)
    }).then((apiKey) => {
      audit.emit('event:apiKeyCreated', apiKey.id, req.user.id)
      res.status(201).json({status: 201, data: apiKey})
    }).catch(err => {
      console.error(err)
      res.status(500).json({status: 500, message: 'Could not add api key'})
    })
  },
  delete (req, res, next) {
    ApiKey.destroy({
      where: {id: req.params.keyId}
    }).then(() => {
      audit.emit('event:apiKeyDeleted', req.params.keyId, req.user.id)
      res.status(202).json({status: 202, message: 'api key deleted'})
    })
  }
}
