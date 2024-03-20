import axios from 'axios';
import { CaseEntity } from '../context/case';

const baseUrl = 'http://localhost:3000';

const fetchCases = async () => {
  return axios.get(`${baseUrl}/cases`).then((res) => res.data);
};

const addCase = async (caseItem: CaseEntity) => {
  return axios.post(`${baseUrl}/cases`, caseItem).then((res) => res.data);
};

const removeCase = async (id: string) => {
  return axios.delete(`${baseUrl}/cases/${id}`).then((res) => res.data);
};

const editCase = async (id: string, data: Partial<CaseEntity>) => {
  return axios.put(`${baseUrl}/cases/${id}`, data).then((res) => res.data);
};

export const caseService = {
  fetchCases,
  addCase,
  removeCase,
  editCase,
};
