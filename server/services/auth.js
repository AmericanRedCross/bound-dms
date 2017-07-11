const passport = require('passport')
const passportJwt = require('passport-jwt')
const users = require('./users')
const config = require('../config')
const JwtStrategy = passportJwt.Strategy

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
  secretOrKey: config.jwtSecretKey
}

module.exports = () => {
  const strategy = new JwtStrategy(jwtOptions, (payload, next) => {
    users.find(payload.id).then((user) => {
      // check user is active
      console.log(user)

      next(null, user)
    }).catch(next(null, false))
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
