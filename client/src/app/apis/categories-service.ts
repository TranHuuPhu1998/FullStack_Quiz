import { CategoryItem } from 'interfaces/features/CategoryEntity';
import axiosService from 'app/axios/axios-service';
import { API_ENDPOINT } from 'app-constants';
import { Pagination } from 'interfaces/common';

const token = localStorage.getItem('TOKEN');

export const getCategories = (pageInfo: Pagination) => {
  const { current, pageSize, text_search } = pageInfo;
  return axiosService.get(
    `${API_ENDPOINT}/categories?page=${current}&limit=${pageSize}${
      text_search ? `&name=${text_search}` : ''
    }`
  );
};

export const createCategory = (data: CategoryItem) => {
  return axiosService.post(`${API_ENDPOINT}/category`, data, token);
};

export const updateCategory = (request: CategoryItem) => {
  const { name, id } = request;
  const data = { name };
  return axiosService.patch(`${API_ENDPOINT}/category/${id}`, data, token);
};

export const deleteCategory = (id: string) => {
  return axiosService.delete(`${API_ENDPOINT}/category/${id}`, token);
};

export const getCategoryById = (id: string) => {
  return axiosService.get(`${API_ENDPOINT}/category/${id}`, token);
};
