import axios from 'axios';

const api = axios.create({
  baseURL: 'http://restaurant-classiclb-2078999781.eu-west-1.elb.amazonaws.com:3000'
  //baseURL: 'http://localhost:3000'
});

export default api;