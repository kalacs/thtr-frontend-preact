import autodux from "autodux";

export const {
  reducer,
  actions: { initMovies },
} = autodux({
  // the slice of state your reducer controls
  slice: "general",

  // The initial value of your reducer state
  initial: {},

  actions: {
    initMovies: (state) => ({
      ...state,
    }),
  },
});
export default reducer;
