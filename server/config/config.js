module.exports = {
  production: {
    jwtSecretKey: process.env.JWT_SECRET || 'secret_key',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    uploads: {
      directory: '/uploads',
      thumbnails: {
        sizes: [
          64,
          500,
          1000
        ]
      }
    }
  },
  development: {
    jwtSecretKey: 'secret_key',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    uploads: {
      directory: '/uploads',
      thumbnails: {
        sizes: [
          64,
          500,
          1000
        ]
      }
    }
  },
  testing: {
    jwtSecretKey: 'secret_key',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    uploads: {
      directory: '/uploads',
      thumbnails: {
        sizes: [
          100,
          500,
          1000
        ]
      }
    }
  }
}
