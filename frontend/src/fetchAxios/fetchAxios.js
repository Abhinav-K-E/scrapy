import axios from 'axios';

const fetchAxios = axios.create({
  baseURL: 'http://localhost:5001/',
});

export default fetchAxios;
