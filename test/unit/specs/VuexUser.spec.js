import { modules } from '../../../src/vuex'
// destructure assign users
const { users } = modules
// destructure assign mutations
const { mutations } = users

const mockState = {
  users: [],
  error: ''
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
    Object.assign(state, mockState)
    // apply mutation with mock users
    mutations.SET_USERS(state, {response: mockUsers})
    // assert result
    expect(state.users).to.equal(mockUsers)
  })
  // SET USER
  it('SET_USER', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockState)
    // apply mutation
    mutations.SET_USER(state, {response: mockUsers[0]})
    // assert result
    expect(state.users[state.users.length - 1]).to.equal(mockUsers[0])
  })
  // REMOVE USER
  it('REMOVE_USER', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockState)
    state.users = [...mockUsers]
    // apply mutation
    mutations.REMOVE_USER(state, {response: mockUsers[0]})
    // Is it still there?
    let user = state.users.find(user => user.id === mockUsers[0].id)
    // assert result
    expect(user).to.equal(undefined)
  })
})
