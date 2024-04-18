import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const updateCandidato = (data, id) => {
  return axios.put(`${apiRoute}/${id}`, data);
};
