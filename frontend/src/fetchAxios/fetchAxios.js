import axios from 'axios';

const fetchAxios = axios.create({
  baseURL: 'https://scrapy-api-7wnj.onrender.com/',
});

export default fetchAxios;
