import autodux from "autodux";

export const {
  reducer,
  actions: { setSelectedRow, setSelectedColumn, setSelectedMovie },
  selectors: { getSelectedRow, getSelectedColumn, getSelectedMovie },
} = autodux({
  // the slice of state your reducer controls
  slice: "ui",

  // The initial value of your reducer state
  initial: {
    selectedRow: 0,
    selectedColumn: 0,
    selectedMovie: null,
  },

  actions: {
    setSelectedRow: (state, row) => ({
      ...state,
      selectedRow: row,
    }),
    setSelectedColumn: (state, column) => ({
      ...state,
      selectedColumn: column,
    }),
    setSelectedMovie: (state, item) => ({
      ...state,
      selectedMovie: item,
    }),
  },
});
export default reducer;
