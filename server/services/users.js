let users = [{
  id: 1,
  email: 'user@domain.com',
  password: '12345678',
  firstname: 'Test',
  lastname: 'User'
},
{
  id: 2,
  email: 'kevin.borrill@3sidedcube.com',
  password: '12345678',
  firstname: 'Kev',
  lastname: 'Borrill'
}]

module.exports = {
  create (data) {
    data.id = users.length + 1
    return new Promise((resolve, reject) => {
      users.push(data)
      resolve(data)
    })
  },
  save (id, data) {
    const idx = users.findIndex((item) => item.id === id)
    return new Promise((resolve, reject) => {
      if (idx !== -1) {
        users[idx] = Object.assign({}, users[idx], data)
        resolve(users[idx])
      } else {
        reject('User not found')
      }
    })
  },
  all () {
    return new Promise((resolve, reject) => {
      if (users.length) {
        resolve(users)
      } else {
        reject('No users')
      }
    })
  },
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
  },
  delete (id) {
    const idx = users.findIndex((item) => item.id === id)
    return new Promise((resolve, reject) => {
      if (idx !== -1) {
        users.splice(idx, 1)
        resolve()
      } else {
        reject('User not found')
      }
    })
  }
}
