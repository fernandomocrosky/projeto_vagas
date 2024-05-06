import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const updateCandidato = (data) => {
  return axios.put(`${apiRoute}/usuario`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteCandidato = () => {
  return axios.delete(`${apiRoute}/usuario`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
