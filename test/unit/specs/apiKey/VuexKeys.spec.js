import { modules } from '../../../../src/vuex'
import { ApiKey } from '../../../../src/vuex/modules/apiKey/ApiKey'

// destructure assign users
const { apiKey } = modules
// destructure assign mutations
const { mutations } = apiKey

const mockEmptyState = {
  keys: []
}

const mockState = {
  keys: [new ApiKey({id: 1, name: 'iOS', key: '12345678'})]
}

const expectApiKeys = (mock, apiKeyObject) => {
  expect(apiKeyObject.id).to.equal(mock.id)
  expect(apiKeyObject.name).to.equal(mock.name)
  expect(apiKeyObject.key).to.equal(mock.key)
}

const mockApiKeys = [{
  id: 1,
  name: 'iOS',
  key: '12345678'
},
{
  id: 2,
  name: 'android',
  key: '1234567890'
}]

describe('Vuex ApiKey Mutations', () => {
  it('SET_KEYS', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockEmptyState)
    // apply mutation with mock users
    mutations.SET_KEYS(state, {response: {data: mockApiKeys}})
    // assert result
    // expect().to.equal(mockUsers)
    mockApiKeys.forEach((apiKey, index) => {
      expectApiKeys(apiKey, state.keys[index])
    })
  })
  it('SET_KEY', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockEmptyState)
    // apply mutation
    mutations.SET_KEY(state, {response: {data: mockApiKeys[0]}})
    // assert result
    expectApiKeys(mockApiKeys[0], state.keys[state.keys.length - 1])
  })
  it('REMOVE_KEY', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockState)
    let id = mockState.keys[0].id
    // apply mutation
    mutations.REMOVE_KEY(state, { id })
    // Is it still there?
    let apiKey = state.keys.find(apiKey => apiKey.id === id)
    // assert result
    expect(apiKey).to.equal(undefined)
  })
})
