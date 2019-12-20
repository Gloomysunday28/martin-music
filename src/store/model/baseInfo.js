export default {
  state: {
    personal: window.localStorage.personal ? JSON.parse(window.localStorage.personal) : {},
    loveList: []
  },
  mutations: {
    getPersonal(state, payload) {
      state.personal = payload
    },
    getLoveSong(state, payload) {
      state.loveList = payload
    },
  },
  actions: {
    setPersonInfo({commit}, payload) {
      commit('getPersonal', payload)
    },
    setLoveSong({commit}, payload) {
      commit('getLoveSong', payload)
    }
  }
}
