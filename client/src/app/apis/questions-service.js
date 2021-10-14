import axiosService from '../axios/axios-service';
import { API_ENDPOINT } from '../constants';

const token = localStorage.getItem('TOKEN');

export const getQuestions = () => {
  return axiosService.get(`${API_ENDPOINT}/questions`);
};

export const getQuestionsCategory = (id) => {
  return axiosService.get(`${API_ENDPOINT}/question/category/${id}`);
};

export const createQuestion = (data) => {
  return axiosService.post(`${API_ENDPOINT}/question`, data, token);
};

export const updateQuestion = (_data) => {
  const { data, id } = _data;
  return axiosService.patch(`${API_ENDPOINT}/question/${id}`, data, token);
};

export const deleteQuestion = (id) => {
  return axiosService.delete(`${API_ENDPOINT}/question/${id}`, token);
};
