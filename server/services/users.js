const users = [{
  id: 1,
  email: 'user@domain.com',
  password: '12345678'
}]

module.exports = {
  find (id) {
    return new Promise((resolve, reject) => {
      const user = users[users.findIndex((item) => item.id === id)]
      if (user) {
        resolve(user)
      } else {
        reject('User not found')
      }
    })
  },
  findByEmail (email) {
    // return promise to simulate async request
    return new Promise((resolve, reject) => {
      const user = users[users.findIndex((item) => item.email === email)]
      if (user) {
        resolve(user)
      } else {
        reject('User not found')
      }
    })
  }
}
