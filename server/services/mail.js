const nodemailer = require('nodemailer')
const config = require('../config')

const transport = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  // secure: config.mail.secure,
  auth: {
    user: config.mail.user,
    pass: config.mail.password
  },
  jsonTransport: process.env.NODE_ENV === 'testing'
})

module.exports = {
  /**
   * @return Promise
   */
  send: (mailOptions) => {
    return transport.sendMail(mailOptions)
  }
}
