import autodux from "autodux";

export const {
  reducer,
  actions: {
    setAdditionalDataIsFetching,
    requestAdditionalData,
    additionalDataSuccess,
    additionalDataFailed,
  },
  selectors: { getMovieCast, getMovieVideos },
} = autodux({
  // the slice of state your reducer controls
  slice: "movie",

  // The initial value of your reducer state
  initial: {
    isFetching: false,
    isAdditionalFetching: false,
    movieCast: [],
    movieVideos: "",
  },

  actions: {
    setAdditionalDataIsFetching: (state, { isAdditionalFetching = false }) =>
      Object.assign({}, state, { isAdditionalFetching }),
    requestAdditionalData: (state) => state,
    additionalDataSuccess: (state, { id, data }) =>
      Object.assign({}, state, { movieCast: data.credits.cast }),
    additionalDataFailed: (state, { id, error }) => state,
  },
});
export default reducer;
