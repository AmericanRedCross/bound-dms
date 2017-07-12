const jwt = require('jsonwebtoken')
const config = require('../config')
const users = require('../services/users')

const generateJwtPayload = (user) => {
  return {sub: user.id, expiresIn: '1 day'}
}
module.exports = {
  // Authenticates user credentials and issues JWT
  login (req, res, next) {
    users.findByEmail(req.body.email).then((user) => {
      // @todo time safe comparison
      if (user.password === req.body.password) {
        const token = jwt.sign(generateJwtPayload(user), config.jwtSecretKey)
        res.append('Authorization', token)
        res.status(200).json({message: 'ok', token: token})
      } else {
        res.status(401).json({message: 'Email or password is incorrect.'})
      }
    }).catch((err) => {
      res.status(401).json({message: 'Email or password is incorrect.'})
      console.log('Auth error: ' + err)
    })
  },
  // Issues a new JWT token
  refresh (req, res, next) {
    // TODO blacklist old token
    const token = jwt.sign(generateJwtPayload(req.user), config.jwtSecretKey)
    res.append('Authorization', token)
    res.status(200).json({message: 'ok', token: token})
  }
}
