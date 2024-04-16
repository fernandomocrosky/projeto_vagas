import axios from 'axios';

export const login = (data) => {
  return axios.post('http://localhost:8000/api/login', data);
};
