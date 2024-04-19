import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const updateCandidato = (data, id) => {
  return axios.put(`${apiRoute}/usuarios/candidatos/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteCandidato = (id) => {
  return axios.delete(`${apiRoute}/usuarios/candidatos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
