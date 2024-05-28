import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const getCompetencias = () => {
  return axios.get(apiRoute + '/competencias', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    }
  });
};
