const users = require('../services/users')
const audit = require('../services/audit')

module.exports = {
  getAll (req, res, next) {
    users.all().then((users) => {
      res.status(200).json({status: 200, data: users})
      return
    }).catch(() => {
      res.status(200).json({status: 200, data: []})
    })
  },
  getUser (req, res, next) {
    users.find(parseInt(req.params.id)).then((user) => {
      res.status(200).json({status: 200, data: user})
      return
    }).catch((err) => {
      res.status(404).json({status: 404, message: 'User not found'})
      console.log('User error: ' + err)
    })
  },
  getAuthenticatedUser (req, res, next) {
    res.status(200).json({status: 200, data: req.user})
  },
  createUser (req, res, next) {
    const createPromise = users.create(req.body)
    const activatePromise = createPromise.then((user) => {
      audit.emit('event:userCreated', user.id, req.user.id)
      return users.sendActivationEmail(user)
    })

    Promise.all([createPromise, activatePromise]).then(([user, email]) => {
      console.log('email sent')
      return res.status(201).json({status: 201, data: user})
    }).catch((err) => {
      console.log('User error: ' + err)
      return res.status(500).json({status: 500, message: 'Could not create user'})
    })
  },
  updateUser (req, res, next) {
    users.find(parseInt(req.params.id)).then((user) => {
      delete req.body.password // remove password from input
      return user.update(req.body)
        .then(() => {
          audit.emit('event:userUpdated', user.id, req.user.id, req.body)
          res.status(200).json({status: 200, data: user})
          return
        })
        .catch((err) => {
          res.status(400).json({status: 400, message: 'User not updated'})
          console.log('User error: ' + err)
        })
    }).catch((err) => {
      res.status(404).json({status: 404, message: 'User not found'})
      console.log('User error: ' + err)
    })
  },
  deleteUser (req, res, next) {
    users.delete(parseInt(req.params.id)).then(() => {
      audit.emit('event:userDeleted', req.params.id, req.user.id)
      res.status(200).json({status: 200, message: 'User deleted'})
      return
    }).catch((err) => {
      res.status(500).json({status: 500, message: 'Could not delete user'})
      console.log('User error: ' + err)
    })
  },
  updatePassword (req, res, next) {
    if (req.user.checkPassword(req.body.password)) {
      users.updatePassword(req.user.id, req.body.newPassword).then((user) => {
        audit.emit('event:userPasswordChange', req.user.id, req.user.id)
        res.status(200).json({status: 200, message: 'Password updated'})
        return
      }).catch((err) => {
        res.status(500).json({status: 500, message: 'Password update failed'})
        console.log('User error: ' + err)
      })
    } else {
      res.status(400).json({status: 400, message: 'Password update failed'})
    }
  }
}
