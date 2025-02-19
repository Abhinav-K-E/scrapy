import axios from "axios";

const fetchAxios = axios.create({
  baseURL: 'http://localhost:5001/',
  // baseURL: "https://scrapy-gwx3.vercel.app/",
});

export default fetchAxios;
