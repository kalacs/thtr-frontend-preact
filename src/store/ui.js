import autodux from "autodux";

export const {
  reducer,
  actions: {
    setSelectedRow,
    setSelectedColumn,
    setSelectedMovie,
    nextRow,
    nextColumn,
    previousColumn,
    previousRow,
    scrollToColumn,
    scrollToRow,
  },
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
    nextRow: (state) => ({
      ...state,
      selectedRow: state.selectedRow + 1,
    }),
    previousRow: (state) => ({
      ...state,
      selectedRow: state.selectedRow - 1,
    }),
    nextColumn: (state) => ({
      ...state,
      selectedColumn: state.selectedColumn + 1,
    }),
    previousColumn: (state) => ({
      ...state,
      selectedColumn: state.selectedColumn - 1,
    }),
    scrollToRow: (state, { row, column, type = "vertical" }) => state,
    scrollToColumn: (state, { row, column, type = "horizontal" }) => state,
  },
});
export default reducer;
