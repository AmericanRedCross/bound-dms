const users = require('../services/users')

module.exports = {
  getAll (req, res, next) {
    users.all().then((users) => {
      res.status(200).json(users)
    }).catch(() => {
      res.status(200).json([])
    })
  },
  getUser (req, res, next) {
    users.find(parseInt(req.params.id)).then((user) => {
      res.status(200).json(user)
    }).catch((err) => {
      res.status(404).json({message: 'User not found'})
      console.log('User error: ' + err)
    })
  },
  getAuthenticatedUser (req, res, next) {
    res.status(200).json({
      status: 200,
      data: req.user
    })
  },
  createUser (req, res, next) {
    users.create(req.body).then((user) => {
      res.status(201).json(user)
    }).catch((err) => {
      res.status(500).json({message: 'Could not create user'})
      console.log('User error: ' + err)
    })
  },
  updateUser (req, res, next) {
    users.save(parseInt(req.params.id), req.body).then((user) => {
      res.status(200).json(user)
    }).catch((err) => {
      res.status(500).json({message: 'Could not update user'})
      console.log('User error: ' + err)
    })
  },
  deleteUser (req, res, next) {
    users.delete(parseInt(req.params.id)).then(() => {
      res.status(200).json({message: 'User deleted'})
    }).catch((err) => {
      res.status(500).json({message: 'Could not delete user'})
      console.log('User error: ' + err)
    })
  }
}
