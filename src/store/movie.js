import autodux from "autodux";

export const {
  reducer,
  actions: {
    setAdditionalDataIsFetching,
    requestAdditionalData,
    additionalDataSuccess,
    additionalDataFailed,
    setVersionsIsFetching,
    requestVersions,
    versionsSuccess,
    versionsFailed,
  },
  selectors: {
    getMovieCast,
    getMovieVideos,
    getAdditionalData,
    getIsVersionsFetching,
    getVersions,
  },
} = autodux({
  // the slice of state your reducer controls
  slice: "movie",

  // The initial value of your reducer state
  initial: {
    isFetching: true,
    isAdditionalFetching: true,
    isVersionsFetching: true,
    additionalData: {
      credits: { cast: [] },
      videos: {},
    },
    versions: new Map(),
  },

  actions: {
    setAdditionalDataIsFetching: (state, { isAdditionalFetching = false }) =>
      Object.assign({}, state, { isAdditionalFetching }),
    requestAdditionalData: (state) => state,
    additionalDataSuccess: (state, { id, data }) =>
      Object.assign({}, state, { additionalData: data }),
    additionalDataFailed: (state, { id, error }) => state,
    setVersionsIsFetching: (state, isVersionsFetching) =>
      Object.assign({}, state, { isVersionsFetching }),
    requestVersions: (state) => state,
    versionsSuccess: (state, { id, data }) => {
      const versions = data.versions
        .sort((a, b) => b.size - a.size)
        .reduce((acc, version) => {
          const { language, quality } = version;
          const key = `${language}-${quality}`;
          acc.set(key, version);
          return acc;
        }, new Map());
      return Object.assign({}, state, { versions });
    },
    versionsFailed: (state, { id, error }) => state,
  },
  selectors: {
    getMovieCast: (state) => state.additionalData.credits.cast,
    getMovieVideos: (state) => state.additionalData.videos,
  },
});
export default reducer;
