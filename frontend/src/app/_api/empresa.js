import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const updateEmpresa = (data, id) => {
  return axios.put(`${apiRoute}/usuarios/empresa/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteEmpresa = (id) => {
  return axios.delete(`${apiRoute}/usuarios/empresa/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
