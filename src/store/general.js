import autodux from "autodux";

export const {
  reducer,
  actions: { init },
} = autodux({
  // the slice of state your reducer controls
  slice: "general",

  // The initial value of your reducer state
  initial: {},

  actions: {
    init: (state) => ({
      ...state,
    }),
  },
});
export default reducer;
