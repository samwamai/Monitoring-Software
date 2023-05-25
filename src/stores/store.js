import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '../router';

const store = createStore({
  plugins:[createPersistedState()],  
  state: {
    isLoggedIn: false,
    token: null,
    devices: null,
    user: null,
    selectedDevice:null,
  },
  mutations: {
    resetState(state) {
        state.isLoggedIn = false;
        state.token = null;
        state.devices = null;
        state.user = null;
        state.selectedDevice = null;
      },
    login(state,{token,user}) {
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
    },
    user(state,user) {
      state.user = user;
    },
    devices(state,devices) {
        state.devices = devices;
      },
    selectedDevice(state,selectedDevice) {
        state.selectedDevice = selectedDevice;
      },  
  },
  actions: {
    login({ commit }, {token,user}) {  
      if((user && token)){  
      commit('login', {token,user});
      router.push({ path: '/home' });
      }
    },
    logout({ commit }) {
      commit('resetState');
      router.push({ path: '/login' });
    },
    setUser({ commit },user) {
      if(user){
        commit('user',user);
      }
    },
    devices({ commit },devices) {
        commit('devices', devices);
    },
    selectedDevice({commit},selectedDevice){
        commit('selectedDevice', selectedDevice);
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    token: (state) => state.token,
    devices: (state) => state.devices,
    currentUser: (state) => state.user,
    selectedDevice: (state) => state.selectedDevice
  },
});

export default store;
