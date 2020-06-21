import autodux from "autodux";

export const {
  reducer,
  actions: { initRouteMovies, init, configSuccess, setLoading },
  selectors: { getConfig, getLoading },
} = autodux({
  // the slice of state your reducer controls
  slice: "general",

  // The initial value of your reducer state
  initial: {
    loading: false,
    config: {},
  },

  actions: {
    initRouteMovies: (state) => ({
      ...state,
    }),
    initRouteMovieItemPage: (state) => ({
      ...state,
    }),
    initRouteHome: (state) => ({
      ...state,
    }),
    initRoutePlayer: (state) => ({
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
