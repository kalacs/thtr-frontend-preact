import autodux from "autodux";

export const {
  reducer,
  actions: { setStreamUrl },
  selectors: { getStreamUrl },
} = autodux({
  // the slice of state your reducer controls
  slice: "media",

  // The initial value of your reducer state
  initial: {
    streamUrl: "",
  },

  actions: {
    setStreamUrl: (state, url) => ({
      ...state,
      streamUrl: url,
    }),
  },
});
export default reducer;
