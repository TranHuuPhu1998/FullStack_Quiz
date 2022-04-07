import axiosService from '../axios/axios-service';
import { API_ENDPOINT } from '../../app-constants';

const token = localStorage.getItem('TOKEN');

export const getQuestions = ({ pageInfo }:any) => {
  const { page, limit, text_search } = pageInfo;
  return axiosService.get(`${API_ENDPOINT}/questions?page=${page}&limit=${limit}${text_search ? `&name=${text_search}` : ''}`, token);
};

export const getQuestionsCategory = (id:string) => {
  return axiosService.get(`${API_ENDPOINT}/question/category/${id}`);
};

export const getQuestionsCourse = (id:string) => {
  return axiosService.get(`${API_ENDPOINT}/question/courses/${id}`);
};

export const createQuestion = (data:any) => {
  return axiosService.post(`${API_ENDPOINT}/question`, data, token);
};

export const updateQuestion = (request:any) => {
  const { data, id } = request;
  return axiosService.patch(`${API_ENDPOINT}/question/${id}`, data, token);
};

export const deleteQuestion = (id:string) => {
  return axiosService.delete(`${API_ENDPOINT}/question/${id}`, token);
};
