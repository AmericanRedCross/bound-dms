import { modules } from '../../../../src/vuex'
import { User } from '../../../../src/vuex/modules/user/User'

// destructure assign users
const { users } = modules
// destructure assign mutations
const { mutations } = users

const mockEmptyState = {
  users: []
}

const mockState = {
  users: [new User({id: 1, firstname: 'Test', lastname: 'User', email: 'user@domain.com'}), new User({id: 2, firstname: 'Test', lastname: 'Dude', email: 'dude@domain.com'})]
}

const expectUser = (mock, userObject) => {
  expect(userObject.id).to.equal(mock.id)
  expect(userObject.firstName).to.equal(mock.firstname)
  expect(userObject.lastName).to.equal(mock.lastname)
  expect(userObject.email).to.equal(mock.email)
}

const mockUsers = [{
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

describe('Vuex User Mutations', () => {
  // SET USERS
  it('SET_USERS', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockEmptyState)
    // apply mutation with mock users
    mutations.SET_USERS(state, {response: {data: mockUsers}})
    // assert result
    // expect().to.equal(mockUsers)
    mockUsers.forEach((user, index) => {
      expectUser(user, state.users[index])
    })
  })
  // SET USER
  it('SET_USER', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockEmptyState)
    // apply mutation
    mutations.SET_USER(state, {response: {data: mockUsers[0]}})
    // assert result
    expectUser(mockUsers[0], state.users[state.users.length - 1])
  })
  // REMOVE USER
  it('REMOVE_USER', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockState)
    let id = mockState.users[0].id
    // apply mutation
    mutations.REMOVE_USER(state, { id })
    // Is it still there?
    let user = state.users.find(user => user.id === id)
    // assert result
    expect(user).to.equal(undefined)
  })
})
