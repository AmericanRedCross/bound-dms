// This is a VUEX module that handles messages.
// App.vue has an alert box that is populated from the getter below
// TODO Update this module to accept a type of message too i.e. info, warning, danger
// TODO Add http code messages to locals
const error = {
  state: {
    message: '',
    code: null
  },
  mutations: {
    SET_MESSAGE: (state, { message }) => {
      state.message = message.message
      state.code = message.response.status
    }
  },
  actions: {
    CLEAR_MESSAGE: ({commit}) => {
      commit('SET_MESSAGE', { message: {
        message: '',
        response: {
          status: null
        }
      } })
    }
  },
  getters: {
    friendlyHTTPMessage: (state, getters) => {
      if (state.code) {
        return {
          localisationString: 'http.' + state.code,
          serverMessage: state.message
        }
      }
      return false
    }
  }
}

export default error
