import axios from 'axios';

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

export const login = (data) => {
  return axios.post(apiRoute + '/login', data);
};

export const registerEmpresa = (data) => {
  return axios.post(apiRoute + '/usuarios/empresas', data);
};

export const registerCandidato = (data) => {
  return axios.post(apiRoute + '/usuarios/candidatos', data);
};
