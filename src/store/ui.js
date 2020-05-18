import autodux from "autodux";
import { INITIAL_STATE } from "./collections";

export const {
  reducer,
  actions: {
    setSelectedRow,
    setSelectedMovie,
    nextRow,
    nextColumn,
    previousColumn,
    previousRow,
    scrollToColumn,
    scrollToRow,
    selectMovie,
  },
  selectors: { getSelectedRow, getSelectedColumn, getSelectedMovie },
} = autodux({
  // the slice of state your reducer controls
  slice: "ui",

  // The initial value of your reducer state
  initial: {
    currentRow: 0,
    itemPositions: INITIAL_STATE.map(() => 0),
    selectedMovie: null,
  },

  actions: {
    setSelectedRow: (state, row) => ({
      ...state,
      currentRow: row,
    }),
    setSelectedMovie: (state, item) => ({
      ...state,
      selectedMovie: item,
    }),
    nextRow: (state) => ({
      ...state,
      currentRow: state.currentRow + 1,
    }),
    previousRow: (state) => ({
      ...state,
      currentRow: state.currentRow - 1,
    }),
    nextColumn: (state) => {
      const newItemPositions = state.itemPositions.slice();
      newItemPositions[state.currentRow] =
        newItemPositions[state.currentRow] + 1;
      return {
        ...state,
        itemPositions: newItemPositions,
      };
    },
    previousColumn: (state) => {
      const newItemPositions = state.itemPositions.slice();
      newItemPositions[state.currentRow] =
        newItemPositions[state.currentRow] - 1;
      return {
        ...state,
        itemPositions: newItemPositions,
      };
    },
    scrollToRow: (state, { row, column, type = "vertical" }) => state,
    scrollToColumn: (state, { row, column, type = "horizontal" }) => state,
    selectMovie: (state, { row, column }) => state,
  },
  selectors: {
    getSelectedColumn: (state) => state.itemPositions[state.currentRow],
    getSelectedRow: ({ currentRow }) => currentRow,
  },
});
export default reducer;
