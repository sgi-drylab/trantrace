import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    
    taskList:{
      Unassigned_nums:0,
      Conflict_nums:0,
      Untranslated_nums:0,
      Unretranslated_nums:0,
      Approve_nums:0
    },
    loginUser: {},
    translateSearchForm: {},
    missionSearchForm: {},
    approveSearchForm: {},
    selfTranslateSearchForm: {},
    browTranslateSearchForm: {}
  },
  mutations: {

  },
  getters: {

  },
  actions: {}
})

export default store
