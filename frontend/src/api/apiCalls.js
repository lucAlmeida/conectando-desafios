import axios from 'axios';
import i18n from '../locale/i18n';
import { store } from '../state/store';

axios.interceptors.request.use((request) => {
  request.headers['Accept-Language'] = i18n.language;
  const { header } = store.getState();
  if (header) {
    request.headers['Authorization'] = header;
  }
  return request;
});

export const signUp = (body) => {
  return axios.post(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/usuarios',
    body
  );
};

export const cadastrarAluno = (body) => {
  return axios.post(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/alunos',
    body
  );
};

export const cadastrarEmpresa = (body) => {
  return axios.post(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/empresas',
    body
  );
};

export const cadastrarProjeto = (body) => {
  return axios.post(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/projetos',
    body
  );
};

export const activate = (token) => {
  return axios.post(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/usuarios/token/' +
      token
  );
};

export const loadUsers = (page) => {
  return axios.get(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/usuarios',
    {
      params: { page, size: 3 },
    }
  );
};

export const loadAlunos = (page) => {
  return axios.get(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/alunos',
    {
      params: { page, size: 3 },
    }
  );
};

export const loadAlunosWithFilter = (page, search) => {
  return axios.get(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/alunos',
    {
      params: { page, size: 3, search },
    }
  );
};

export const loadEmpresas = (page) => {
  return axios.get(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/empresas',
    {
      params: { page, size: 3 },
    }
  );
};

export const loadEmpresasWithFilter = (page, search) => {
  return axios.get(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/empresas',
    {
      params: { page, size: 3, search },
    }
  );
};

export const loadProjetos = (page) => {
  return axios.get(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/projetos',
    {
      params: { page, size: 3 },
    }
  );
};

export const loadProjetosWithFilter = (page, search) => {
  return axios.get(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/projetos',
    {
      params: { page, size: 3, search },
    }
  );
};

export const getUserById = (id) => {
  return axios.get(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/usuarios/${id}`
  );
};

export const getAlunoById = (id) => {
  return axios.get(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/alunos/${id}`
  );
};

export const getEmpresaById = (id) => {
  return axios.get(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/empresas/${id}`
  );
};

export const getProjetoById = (id) => {
  return axios.get(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/projetos/${id}`
  );
};

export const login = (body) => {
  return axios.post(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/auth',
    body
  );
};

export const updateUser = (id, body) => {
  return axios.put(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/usuarios/${id}`,
    body
  );
};

export const updateAluno = (id, body) => {
  return axios.put(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/alunos/${id}`,
    body
  );
};

export const updateEmpresa = (id, body) => {
  return axios.put(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/empresas/${id}`,
    body
  );
};

export const updateProjeto = (id, body) => {
  return axios.put(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/projetos/${id}`,
    body
  );
};

export const logout = () => {
  return axios.post(
    'https://conectando-desafios-api.herokuapp.com/api/1.0/logout'
  );
};

export const deleteUser = (id) => {
  return axios.delete(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/usuarios/${id}`
  );
};

export const deleteAluno = (id) => {
  return axios.delete(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/alunos/${id}`
  );
};

export const deleteEmpresa = (id) => {
  return axios.delete(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/empresas/${id}`
  );
};

export const deleteProjeto = (id) => {
  return axios.delete(
    `https://conectando-desafios-api.herokuapp.com/api/1.0/projetos/${id}`
  );
};
