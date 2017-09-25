const ConnectRoles = require('connect-roles')
const roles = new ConnectRoles({
  failureHandler: function (req, res, action) {
    res.status(403)
    res.json({status: 403, message: 'Permission denied'})
  }
})

roles.use('admin', function (req) {
  return req.user.role === 'admin'
})

roles.use('editor', function (req) {
  return req.user.role === 'editor'
})

roles.use('translator', function (req) {
  return req.user.role === 'translator'
})

module.exports = roles
