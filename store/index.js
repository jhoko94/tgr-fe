export const state = () => ({
    isLoading: false
  });
  
  export const mutations = {
    SET_LOADING(state, newValue) {
      state.isLoading = newValue;
    },
  };
  
  export const actions = {
    setLoading({ commit }, value) {
      commit('SET_LOADING', value);
    }
  };
  