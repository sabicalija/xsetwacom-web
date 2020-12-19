import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    ready: true,
    devices: [],
    screens: [],
    displays: [],
  },
  getters: {
    getDevice: (state) => (id) => {
      return state.devices.find((device) => device.id === id);
    },
    getDeviceOptions: (state) => (id) => {
      const device = state.devices.find((device) => device.id === id);
      return device ? device.options : [];
    },
    getMapOutput: (state) => (id) => {
      const device = state.devices.find((device) => device.id === id);
      return device ? device.output : "";
    },
  },
  mutations: {
    SET_DEVICES(state, devices) {
      state.devices = devices;
    },
    SET_DEVICE_OPTIONS(state, { id, options }) {
      const device = state.devices.find((device) => device.id === id);
      if (device) device.options = options;
    },
    SET_SCREENS(state, screens) {
      state.screens = screens;
    },
    SET_DISPLAYS(state, displays) {
      state.displays = displays;
    },
    SET_ACTIVE_OUTPUT(state, { id, output }) {
      const device = state.devices.find((device) => device.id === id);
      if (device) device.output = output;
    },
    START_REQUEST(state) {
      state.ready = false;
    },
    FINISH_REQUEST(state) {
      state.ready = true;
    },
  },
  actions: {
    async getDevices({ commit, state, dispatch }) {
      commit("START_REQUEST");
      const response = await axios.get("http://localhost:8080/devices/all");
      commit("SET_DEVICES", response.data);
      for (const device of state.devices) {
        await dispatch("getDeviceOptions", device.id);
      }
      commit("FINISH_REQUEST");
    },
    async getDeviceOptions({ commit }, id) {
      const response = await axios.get(
        `http://localhost:8080/devices/${id}/overview`
      );
      commit("SET_DEVICE_OPTIONS", { id, options: response.data });
    },
    async getScreens({ commit }) {
      commit("START_REQUEST");
      const response = await axios.get("http://localhost:8080/screens/all");
      commit("SET_SCREENS", response.data);
      commit("FINISH_REQUEST");
    },
    async getDisplays({ commit }) {
      commit("START_REQUEST");
      const response = await axios.get(
        "http://localhost:8080/screens/monitors"
      );
      commit("SET_DISPLAYS", response.data);
      commit("FINISH_REQUEST");
    },
    async mapToOutput({ commit }, { id, output }) {
      commit("START_REQUEST");
      const response = await axios.put(
        `http://localhost:8080/devices/${id}/MapToOutput/`,
        { id, output }
      );
      commit("SET_ACTIVE_OUTPUT", response.data);
      commit("FINISH_REQUEST");
    },
  },
  modules: {},
});
