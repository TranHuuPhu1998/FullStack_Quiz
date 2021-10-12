import axiosService from '@App/app/axios/axios-service';
import { API_ENDPOINT } from '@App/app/constants';

const token = localStorage.getItem('TOKEN');

export const getCategories = () => {
  return axiosService.get(`${API_ENDPOINT}/categories`);
};

export const createCategory = (data) => {
  return axiosService.post(`${API_ENDPOINT}/category`, data, token);
};
export const updateCategory = (_data) => {
  const { data, id } = _data;
  return axiosService.patch(`${API_ENDPOINT}/category/${id}`, data, token);
};

export const deleteCategory = (id) => {
  return axiosService.delete(`${API_ENDPOINT}/category/${id}`, token);
};
