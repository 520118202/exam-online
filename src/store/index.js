import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {},
	  student: sessionStorage.getItem('student') ? JSON.parse(sessionStorage.getItem('student')) : {},
	  Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',
	  isPractice: sessionStorage.getItem('isPractice') ? sessionStorage.getItem('isPractice') : false
  },
  mutations: {
	  setUser(state, value) {
		state.user = value;
		sessionStorage.setItem("user", JSON.stringify(value));
	  },
	  setStudent(state, value) {
		  state.student = value;
		  sessionStorage.setItem("student", JSON.stringify(value));
	  },
	  setAuthorization(state, value) {
		  state.Authorization = value;
		  sessionStorage.setItem("Authorization", value);
	  },
	  setIsPractice(state, value) {
		  state.isPractice = value;
		  sessionStorage.setItem("isPractice", value)
	  }
  },
  actions: {
  },
  modules: {
  }
})
