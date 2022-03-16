import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false,
    user: {},
  },
  getters: {},
  mutations: {
    LOGIN_USER(state, payload) {
      window.localStorage.setItem("token", payload.token);
      (state.isLogin = true), (state.user = payload);
    },
    LOGOUT_USER(state) {
      (state.isLogin = false),
        (state.user = {}),
        window.localStorage.removeItem("token");
    },
  },
  actions: {},
  modules: {},
});
