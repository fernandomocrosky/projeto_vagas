import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const login = (data) => {
  return axios.post(apiRoute + '/login', data);
};

export const logout = () => {
  const token = localStorage.getItem('token');
  return axios.post(apiRoute + '/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerEmpresa = (data) => {
  return axios.post(apiRoute + '/usuarios/empresa', data);
};

export const registerCandidato = (data) => {
  return axios.post(apiRoute + '/usuarios/candidatos', data);
};

export const getUserByToken = () => {
  const token = localStorage.getItem('token');
  return axios.get(apiRoute + '/usuario', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
