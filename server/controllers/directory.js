const Directory = require('../models').Directory

module.exports = {
  getAll (req, res, next) {
    Directory.findAll({
      where: {
        projectId: req.params.id
      }
    }).then((directories) => {
      console.log(directories)
    })
  }
}
