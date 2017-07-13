module.exports = {
  production: {
    jwtSecretKey: process.env.JWT_SECRET || 'secret_key'
  },
  development: {
    jwtSecretKey: 'secret_key'
  },
  testing: {
    jwtSecretKey: 'secret_key'
  }
}
