import Vue from 'vue'
import Vuex from 'vuex'
// import http from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin:false
  },
  mutations: {
    adminOK(state){
      state.admin = true
    }
  },
  actions: {
  },
  modules: {
  }
})
