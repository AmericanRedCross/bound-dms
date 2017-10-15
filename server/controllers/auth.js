const jwt = require('jsonwebtoken')
const config = require('../config')
const users = require('../services/users')
const querystring = require('querystring')

const generateJwtPayload = (user) => {
  return {sub: user.id}
}

const jwtOptions = {
  expiresIn: '24h'
}

module.exports = {
  // Authenticates user via username / password and issues auth token
  login (req, res, next) {
    users.findByEmail(req.body.email).then((user) => {
      if (user !== null && user.checkPassword(req.body.password)) {
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
  },

  sendPasswordReset (req, res, next) {
    users.sendPasswordReset(req.body.email).then(() => {
      console.log('email sent')
      return res.status(200).json({status: 200, message: 'Reset email sent'})
    }).catch((err) => {
      console.log(err)
      // don't permit enumeration
      return res.status(200).json({status: 200, message: 'Reset email sent'})
    })
  },

  handlePasswordReset (req, res, next) {
    users.validatePasswordResetToken(req.body.token).then((token) => {
      if (!token) {
        return res.status(401).json({status: 401, message: 'Could not reset password'})
      }

      return users.findByEmail(token.email)
      .then(user => {
        return users.updatePassword(user.id, req.body.password)
      })
      .then((update) => {
        return token.destroy()
      })
      .then(() => {
        return res.status(200).json({status: 200, message: 'Password has been reset'})
      })
    }).catch(err => {
      console.error(err)
      return res.status(500).json({status: 500, message: 'Could not reset password'})
    })
  }
}
