import { API_URL, API_KEY, SCRAPER_URL } from "../config";

const getTrendingUrl = (type) =>
  `${API_URL}trending/${type}/week?api_key=${API_KEY}&language=hu-HU&include_adult=false&include_video=false&page=1`;
const getPopularUrl = (type) =>
  `${API_URL}${type}/popular/?api_key=${API_KEY}&language=hu-HU&region=HU&include_adult=false&include_video=false&page=1`;
const getTopRatedUrl = (type) =>
  `${API_URL}${type}/top_rated/?api_key=${API_KEY}&language=hu-HU&region=HU&include_adult=false&include_video=false&page=1`;
const getDiscoverUrl = (params, type) => {
  const more = [];

  if (params.genres) more.push(`with_genres=${params.genres.join(",")}`);
  if (params.sort_by) more.push(`sort_by=${params.sort_by}`);
  if (params.region) more.push(`region=${params.region}`);

  const moreParams = more.length ? `&${more.join("&")}` : "";
  return `${API_URL}discover/${type}/?api_key=${API_KEY}&language=hu-HU&region=HU&include_adult=false&include_video=false&page=1${moreParams}`;
};

const getAdditionalDatadUrl = ({ id }, type) =>
  `${API_URL}${type}/${id}?api_key=${API_KEY}&append_to_response=videos,credits&language=hu-HU`;

const getVersionsDatadUrl = ({ id }) => `${SCRAPER_URL}/moviesByImdb/${id}`;

export const getTrendingMovies = () => getTrending();
export const getTrending = (type = "movie") =>
  fetch(getTrendingUrl(type)).then((response) => response.json());

export const getPopularMovies = () => getPopular();
export const getPopular = (type = "movie") =>
  fetch(getPopularUrl(type)).then((response) => response.json());

export const getTopRatedMovies = () => getTopRated();
export const getTopRated = (type = "movie") =>
  fetch(getTopRatedUrl(type)).then((response) => response.json());

export const getMoviesByGenre = (params) => getByGenre(params);
export const getByGenre = (params, type = "movie") =>
  fetch(getDiscoverUrl(params, type)).then((response) => response.json());

export const getAdditionalMovieData = (params) => getAdditionalData(params);
export const getAdditionalData = (params, type = "movie") =>
  fetch(getAdditionalDatadUrl(params, type)).then((response) =>
    response.json()
  );

export const getVersionsMovieData = (params) => getVersionsData(params);
export const getVersionsData = (params, type = "movie") =>
  fetch(getVersionsDatadUrl(params, type)).then((response) => response.json());
