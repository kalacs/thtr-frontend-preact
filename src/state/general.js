import autodux from "autodux";

export const {
  reducer,
  actions: { initMovies, init, configSuccess, collectionDataSuccess},
  selectors: { getConfig,getFrontendConfig,getCollections },
} = autodux({
  // the slice of state your reducer controls
  slice: "general",

  // The initial value of your reducer state
  initial: {
    config: {},
  },

  actions: {
    initMovies: (state) => ({
      ...state,
    }),
    init: (state) => ({
      ...state,
    }),
    configSuccess: (state, data) => ({
      ...state,
      config: data,
    }),
    collectionDataSuccess: (state, { id, data }) => {
      const collections = state.config.frontend.collections
      return {
        ...state,
        config: {
          ...state.config,
          frontend: {
            ...state.config.frontend,
            collections: collections.map((collection) => {
              const newCollection = { ...collection };

              if(collection.id === id) {
                newCollection.data = data.filter(({ poster_path }) => !!poster_path)
              }

              return newCollection;
            })
          }
        }
      }
    },
  },

  selectors: {
    getFrontendConfig: (state) => state && state.config ? state.config.frontend : {}, 
    getCollections: (state) => state && state.config && state.config.frontend ? state.config.frontend.collections : []
  }
});
export function getCollectionData(state, id) {
  return (getCollections(state).find(collection => collection.id === id)).data;
}

export default reducer;
