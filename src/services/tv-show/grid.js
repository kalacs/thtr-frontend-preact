import { API_URL, API_KEY } from "../../config";

const urls = [
  `${API_URL}search/tv?api_key=${API_KEY}&language=hu-HU&query=stranger`,
  `${API_URL}search/tv?api_key=${API_KEY}&language=hu-HU&query=breaking`,
  `${API_URL}search/tv?api_key=${API_KEY}&language=hu-HU&query=13`,
];

export function fetchTvShowsGrid() {
  return Promise.all(
    urls.map((items) => {
      return fetch(items).then((response) => response.json());
    })
  );
}
