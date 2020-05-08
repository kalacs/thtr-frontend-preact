import autodux from "autodux";

export const INITIAL_STATE = [
  {
    id: 1,
    title: "Újdonságok",
    layout: "grid",
    action: "getTrendingMovies",
  },
  {
    id: 2,
    title: "Népszerű",
    layout: "film_strip",
    action: "getPopularMovies",
  },
  {
    id: 3,
    title: "Legjobb értékelés",
    layout: "film_strip",
    action: "getTopRatedMovies",
  },
  {
    id: 16,
    title: "Animációs",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [16],
      sort_by: "release_date.desc",
      region: "HU",
    },
  },
  {
    id: 10751,
    title: "Családi",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [10751],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 35,
    title: "Vígjáték",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [35],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 14,
    title: "Fantasy",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [14],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 28,
    title: "Akció",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [28],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 12,
    title: "Kaland",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [12],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 10749,
    title: "Romantikus",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [10749],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 80,
    title: "Bűnügyi",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [80],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 99,
    title: "Dokumentum",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [99],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 18,
    title: "Dráma",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [18],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 36,
    title: "Történelmi",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [36],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 9648,
    title: "Rejtély",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [9648],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 878,
    title: "Sci-Fi",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [878],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 53,
    title: "Thriller",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [53],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 27,
    title: "Horror",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [27],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 10402,
    title: "Zenei",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [10402],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 10752,
    title: "Háborús",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [10752],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 37,
    title: "Western",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [37],
      sort_by: "release_date.desc",
    },
  },
  {
    id: 10770,
    title: "TV film",
    layout: "film_strip",
    action: "getMoviesByGenre",
    params: {
      genres: [10770],
      sort_by: "release_date.desc",
    },
  },
];

export const {
  reducer,
  actions: {
    setCollectionDataIsFetching,
    requestCollectionData,
    collectionDataSuccess,
    collectionDataFailed,
  },
  selectors: { getCollections, getCollectionDatas },
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
        datas: Object.assign({}, state.datas, { [id]: { data } }),
      });
    },
    collectionDataFailed: (state, { id, error }) => state,
  },
  selectors: {
    getCollections: (state) => state.configs,
    getCollectionDatas: (state) => state.datas,
  },
});
export function getCollectionData(state, id) {
  return getCollectionDatas(state)[id];
}
export default reducer;
