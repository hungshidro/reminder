import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://62e8a0d093938a545be88b58.mockapi.io/api/',
  
});

export default instance;