const getTrendingUrl = ({ movieAPIUrl, movieAPIKey }, type) =>
  `${movieAPIUrl}trending/${type}/week?api_key=${movieAPIKey}&language=hu-HU&include_adult=false&include_video=false&page=1`;
const getPopularUrl = ({ movieAPIUrl, movieAPIKey }, type) =>
  `${movieAPIUrl}${type}/popular/?api_key=${movieAPIKey}&language=hu-HU&region=HU&include_adult=false&include_video=false&page=1`;
const getTopRatedUrl = ({ movieAPIUrl, movieAPIKey }, type) =>
  `${movieAPIUrl}${type}/top_rated/?api_key=${movieAPIKey}&language=hu-HU&region=HU&include_adult=false&include_video=false&page=1`;
const getDiscoverUrl = (params, type) => {
  const { movieAPIUrl, movieAPIKey } = params;
  const more = [];

  if (params.genres) more.push(`with_genres=${params.genres.join(",")}`);
  if (params.sort_by) more.push(`sort_by=${params.sort_by}`);
  if (params.region) more.push(`region=${params.region}`);

  const moreParams = more.length ? `&${more.join("&")}` : "";
  return `${movieAPIUrl}discover/${type}/?api_key=${movieAPIKey}&language=hu-HU&region=HU&include_adult=false&include_video=false&page=1&primary_release_date.lte=${getDate()}${moreParams}`;
};

const getAdditionalDatadUrl = ({ id, movieAPIKey, movieAPIUrl }, type) =>
  `${movieAPIUrl}${type}/${id}?api_key=${movieAPIKey}&append_to_response=videos,credits&language=hu-HU`;

const getVersionsDatadUrl = ({ id, scraperUrl }) =>
  `${scraperUrl}/moviesByImdb/${id}`;

export const getTrendingMovies = (params) => getTrending(params);
export const getTrending = (params, type = "movie") =>
  fetch(getTrendingUrl(params, type)).then((response) => response.json());

export const getPopularMovies = (params) => getPopular(params);
export const getPopular = (params, type = "movie") =>
  fetch(getPopularUrl(params, type)).then((response) => response.json());

export const getTopRatedMovies = (params) => getTopRated(params);
export const getTopRated = (params, type = "movie") =>
  fetch(getTopRatedUrl(params, type)).then((response) => response.json());

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

function getDate() {
  const now = new Date();
  return now.toJSON().split("T")[0];
}
