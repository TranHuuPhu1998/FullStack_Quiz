import axiosService from '../axios/axios-service';
import { API_ENDPOINT } from '../../app-constants';

const token = localStorage.getItem('TOKEN');

export const getCategories = ({ pageInfo }:any) => {
  const { current, pageSize, text_search } = pageInfo;
  return axiosService.get(`${API_ENDPOINT}/categories?page=${current}&limit=${pageSize}${text_search ? `&name=${text_search}` : ''}`);
};

export const createCategory = (data:any) => {
  return axiosService.post(`${API_ENDPOINT}/category`, data, token);
};
export const updateCategory = (request:any) => {
  const { data, id } = request;
  return axiosService.patch(`${API_ENDPOINT}/category/${id}`, data, token);
};

export const deleteCategory = (id:any) => {
  return axiosService.delete(`${API_ENDPOINT}/category/${id}`, token);
};
