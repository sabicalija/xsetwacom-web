import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    devices: [],
  },
  getters: {
    getDevice: (state) => (id) => {
      return state.devices.find((device) => device.id === id);
    },
    getDeviceOptions: (state) => (id) => {
      const device = state.devices.find((device) => device.id === id);
      return device ? device.options : [];
    },
  },
  mutations: {
    SET_DEVICES(state, devices) {
      state.devices = devices;
    },
    SET_DEVICE_OPTIONS(state, { id, options }) {
      state.devices.find((device) => device.id === id).options = options;
    },
  },
  actions: {
    async getDevices({ commit, state, dispatch }) {
      const response = await axios.get("http://localhost:8080/devices/all");
      commit("SET_DEVICES", response.data);
      for (const device of state.devices) {
        dispatch("getDeviceStatus", device.id);
      }
    },
    async getDeviceStatus({ commit }, id) {
      const response = await axios.get(
        `http://localhost:8080/devices/${id}/overview`
      );
      commit("SET_DEVICE_OPTIONS", { id, options: response.data });
    },
  },
  modules: {},
});
