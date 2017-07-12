const passport = require('passport')
const passportJwt = require('passport-jwt')
const users = require('./users')
const config = require('../config')
const JwtStrategy = passportJwt.Strategy

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: config.jwtSecretKey
}

module.exports = () => {
  const strategy = new JwtStrategy(jwtOptions, (payload, next) => {
    // TODO check JWT is not blacklisted
    users.find(payload.sub).then((user) => {
      // Add "user" to request
      return next(null, user)
    }).catch((err) => {
      return next(err, null)
    })
  })
  passport.use(strategy)

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return passport.authenticate('jwt', {session: false})
    }
  }
}
