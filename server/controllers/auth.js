const jwt = require('jsonwebtoken')
const config = require('../config')
const users = require('../services/users')

const generateJwtPayload = (user) => {
  return {sub: user.id}
}

const jwtOptions = {
  expiresIn: '1 day'
}

module.exports = {
  // Authenticates user via username / password and issues auth token
  login (req, res, next) {
    users.findByEmail(req.body.email).then((user) => {
      if (user.checkPassword(req.body.password)) {
        const token = jwt.sign(generateJwtPayload(user), config.jwtSecretKey, jwtOptions)
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
    const token = jwt.sign(generateJwtPayload(req.user), config.jwtSecretKey, jwtOptions)
    res.append('Authorization', token)
    res.status(200).json({message: 'ok', token: token})
  }
}
