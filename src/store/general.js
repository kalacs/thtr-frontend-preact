import autodux from "autodux";

export const {
  reducer,
  actions: { initMovies, init, configSuccess },
  selectors: { getConfig },
} = autodux({
  // the slice of state your reducer controls
  slice: "general",

  // The initial value of your reducer state
  initial: {
    config: {},
  },

  actions: {
    initMovies: (state) => ({
      ...state,
    }),
    init: (state) => ({
      ...state,
    }),
    configSuccess: (state, data) => ({
      ...state,
      config: data,
    }),
  },
});
export default reducer;
