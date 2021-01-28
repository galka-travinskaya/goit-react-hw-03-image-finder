function fetchImg(query, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '19136435-96f0ae3906c94a349fe1f1440';

  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

const api = {
  fetchImg,
};

export default api;
