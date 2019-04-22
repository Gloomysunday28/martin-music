export default {
  state: {
    personal: window.localStorage.personal ? JSON.parse(window.localStorage.personal) : {},
  },
  mutations: {
    getPersonal(state, payload) {
      state.personal = payload
    },
  },
  actions: {
    setPersonInfo({commit}, payload) {
      commit('getPersonal', payload)
    }
  }
}
