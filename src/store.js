import Vue from 'vue';
import Vuex from 'vuex';
import UpdatesMeta from './static/updates_meta.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    updates_meta: UpdatesMeta.updates,
  },
  mutations: {

  },
  actions: {

  }
});
