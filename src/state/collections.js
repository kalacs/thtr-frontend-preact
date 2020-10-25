import autodux from "autodux";
export const INITIAL_STATE = [];
export const {
  reducer,
  actions: {
    setCollectionDataIsFetching,
    requestCollectionData,
    collectionDataSuccess,
    collectionDataFailed,
  },
  selectors: { getCollections, getCollectionDatas, getCollectionItemDatas },
} = autodux({
  // the slice of state your reducer controls
  slice: "collections",

  // The initial value of your reducer state
  initial: {
    configs: INITIAL_STATE,
    datas: [...INITIAL_STATE].reduce((acc, { id }) => {
      acc[id] = { data: [], isFetching: false };
      return acc;
    }, {}),
  },

  // No need to implement switching logic -- it's
  // done for you.
  actions: {
    setCollectionDataIsFetching: (state, { id, isFetching = false }) => {
      // TODO
      return state;
    },
    requestCollectionData: (state) => state,
    collectionDataSuccess: (state, { id, data }) => {
      //      state.datas[id] = Object.assign({}, state.datas[id], { data });
      return Object.assign({}, state, {
        datas: Object.assign({}, state.datas, {
          [id]: { data: data.filter(({ poster_path }) => !!poster_path) },
        }),
      });
    },
    collectionDataFailed: (state, { id, error }) => state,
  },
  selectors: {
    getCollections: (state) => state.configs,
    getCollectionDatas: (state) => state.datas,
  }
});
export function getCollectionData(state, id) {
  return getCollectionDatas(state)[id].data;
}
export default reducer;
