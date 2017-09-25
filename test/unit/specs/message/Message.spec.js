import { modules } from '../../../../src/vuex'

// destructure assign users
const { message } = modules
// destructure assign mutations
const { mutations } = message
const { getters } = message

const mockEmptyState = {
  message: '',
  code: null
}

const mockState = {
  message: 'Server Error',
  code: 500
}

const mockMessageObject = {
  message: 'Server Error',
  response: {
    status: 500
  }
}

describe('Vuex Message Mutations', () => {
  // SET MESSAGE
  it('SET_MESSAGE', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockEmptyState)
    // apply mutation with mock users
    mutations.SET_MESSAGE(state, {message: mockMessageObject})

    expect(state.message).to.equal(mockMessageObject.message)
    expect(state.code).to.equal(mockMessageObject.response.status)
  })
})

describe('Vuex Message Getters', () => {
  it('friendlyHTTPMessage', () => {
    const result = getters.friendlyHTTPMessage(mockState)
    expect(result.localisationString).to.equal('http.' + mockState.code)
    expect(result.serverMessage).to.equal(mockState.message)
  })
})
