const passport = require('passport')
const passportJwt = require('passport-jwt')
const passportHeader = require('passport-headerapikey')
const users = require('./users')
const config = require('../config')
const JwtStrategy = passportJwt.Strategy
const HeaderAPIKeyStrategy = passportHeader.HeaderAPIKeyStrategy
const ApiKey = require('../models').ApiKey

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: config.jwtSecretKey
}

module.exports = () => {
  const jwtStrategy = new JwtStrategy(jwtOptions, (payload, next) => {
    // TODO check JWT is not blacklisted
    users.find(payload.sub).then((user) => {
      // Add "user" to request
      next(null, user)
      return null
    }).catch((err) => {
      return next(err, null)
    })
  })

  const headerStrategy = new HeaderAPIKeyStrategy(
    {header: 'X-APP-KEY', prefix: ''},
    true,
    function (apikey, next, req) {
      return ApiKey.findOne({where: {key: apikey}}).then((apiKey) => {
        if (!apiKey) { return next(null, false) }
        next(null, apiKey)
        return null
      }).catch(err => {
        return next(err)
      })
    }
  )

  passport.use(jwtStrategy)
  passport.use(headerStrategy)

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: (strategies) => {
      if (!strategies) { strategies = 'jwt' }
      return passport.authenticate(strategies, {session: false})
    }
  }
}
