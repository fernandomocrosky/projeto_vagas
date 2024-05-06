import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const updateEmpresa = (data) => {
  return axios.put(`${apiRoute}/usuario`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteEmpresa = () => {
  return axios.delete(`${apiRoute}/usuario`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
