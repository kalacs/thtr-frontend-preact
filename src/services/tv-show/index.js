import { API_URL, API_KEY } from "../../config";

const urls = [
  `${API_URL}tv/top_rated?api_key=${API_KEY}&language=hu-HU&page=1`,
  `${API_URL}tv/popular?api_key=${API_KEY}&language=hu-HU&page=4`,
  `${API_URL}tv/top_rated?api_key=${API_KEY}&language=hu-HU&page=3`,
];

export function fetchData() {
  return Promise.all(
    urls.map((items) => {
      return fetch(items).then((response) => response.json());
    })
  );
}

export const fetchAdditionalTVData = (id) => {
  const url = `${API_URL}tv/${id}?api_key=${API_KEY}&append_to_response=videos,credits&language=hu-HU`;
  return fetch(url).then((response) => response.json());
};
