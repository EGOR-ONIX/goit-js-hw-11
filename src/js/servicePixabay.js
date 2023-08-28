import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39033541-8e2f4467d22f4edf896a79a56';

export async function fetchImages(query, page, perPage) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
