// This module handles the global store and requests for the Files endpoint
import axios from 'axios'
import { Publish } from './Publish'
import querystring from 'querystring'

const publishes = {
  state: {
    publishes: [],
    total: 0
  },
  mutations: {
    SET_ALL_PUBLISHES: (state, { response }) => {
      if (response.data instanceof Array) {
        console.log('here')
        state.publishes = []
        response.data.forEach((item) => {
          state.publishes.push(new Publish(item))
        })
      }
      state.total = response.data.total
    }
  },
  actions: {
    GET_ALL_PUBLISHES: function ({commit}, {page, limit, projectId}) {
      return axios.get('/projects/' + projectId + '/publishes/?' + querystring.stringify({page, limit}))
        .then((response) => {
          commit('SET_ALL_PUBLISHES', { response: response.data })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    }
  },
  getters: {
    getAllPublishes: (state, getters) => () => {
      return {
        publishes: state.publishes,
        total: state.total
      }
    }
  }
}

export default publishes
