import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const getVagas = () => {
  return axios.get(apiRoute + '/vagas', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getVaga = (id) => {
  return axios.get(apiRoute + '/vagas/' + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const createVaga = (data) => {
  return axios.post(apiRoute + '/vagas', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateVaga = (id, data) => {
  return axios.put(apiRoute + '/vagas/' + id, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteVaga = (id) => {
  return axios.delete(apiRoute + '/vagas/' + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
