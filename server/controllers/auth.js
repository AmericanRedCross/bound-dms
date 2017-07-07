const jwt = require('jsonwebtoken')
const config = require('../config')
const users = require('../services/users')

module.exports = {
  login (req, res, next) {
    users.findByEmail(req.body.email).then((user) => {
      // @todo time safe comparison
      if (user.password === req.body.password) {
        const payload = {id: user.id}
        const token = jwt.sign(payload, config.jwtSecretKey)
        res.append('authorization', token)
        res.status(200).json({message: 'ok', token: token})
      } else {
        res.status(401).json({message: 'Email or password is incorrect.'})
      }
    }).catch((err) => {
      res.status(401).json({message: 'Email or password is incorrect.'})
      console.log('Auth error: ' + err)
    })
  }
}
