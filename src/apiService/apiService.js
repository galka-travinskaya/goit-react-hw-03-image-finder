import axios from 'axios';

const API_KEY = '19136435-96f0ae3906c94a349fe1f1440';
const BASE_URL = 'https://pixabay.com/api/';


axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
}

const getImg = async (query, page = 1) => {
  console.log(query);
  console.log(page);
  try {
    const {data} = await axios.get('', {
      params: {q: query, page},
    })
    // console.log(data);
    return {
      hits: data.hits,
      totalHits: data.totalHits
     };
  } catch (error) {
    console.log(error);
    return {
      hits: [],
      totalHits: 0
    }
  }

}

// function fetchImg(query, page = 1) {

//   return fetch(
//     `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
//   ).then(res => {
//     if (res.ok) {
//       return res.json();
//     }
//   });
// }

const api = {
  getImg,
};

export default api
