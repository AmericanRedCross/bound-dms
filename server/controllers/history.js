const History = require('../models').History
const User = require('../models').User

module.exports = {
  getForUser (req, res, next) {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let filter = req.query.filter || null
    let userId = parseInt(req.params.id)

    let offset = page - 1
    if (offset > 0) {
      offset = (limit * offset)
    }

    let whereClause = {
      userId: userId
    }
    if (filter) {
      whereClause.changes = {
        $like: '%' + filter + '%'
      }
    }
    History.findAndCount({
      include: {
        model: User,
        as: 'user',
        attributes: User.safeAttributes()
      },
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(({rows, count}) => {
      res.status(200).json({
        status: 200,
        data: {
          history: rows,
          total: count
        }
      })
    }).catch((err) => {
      res.status(404).json({status: 404, message: 'User history not found'})
      console.log('User history error: ' + err)
    })
  }
}
