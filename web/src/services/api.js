import axios from 'axios';

const api = axios.create({
  baseURL: 'https://asystec-restaurant.co.uk:3000'
  //baseURL: 'http://localhost:3000'
});

export default api;