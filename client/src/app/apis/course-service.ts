import { Pagination } from 'interfaces/common';
import { CourseItem } from 'interfaces/features/CourseEntity';
import axiosService from 'app/axios/axios-service';
import { API_ENDPOINT } from 'app-constants';

const token = localStorage.getItem('TOKEN');

export const getListCourse = (pageInfo: Pagination) => {
  const { current, pageSize, text_search } = pageInfo;
  return axiosService.get(
    `${API_ENDPOINT}/courses?page=${current}&limit=${pageSize}${
      text_search ? `&name=${text_search}` : ''
    }`
  );
};

export const createCourse = (data: CourseItem) => {
  return axiosService.post(`${API_ENDPOINT}/course`, data, token);
};

export const deleteCourse = (id: string) => {
  return axiosService.delete(`${API_ENDPOINT}/course/${id}`, token);
};

export const updateCourse = (data: CourseItem) => {
  return axiosService.patch(`${API_ENDPOINT}/course/${data.id}`, data, token);
};

export const getCourseById = (id: string) => {
  return axiosService.get(`${API_ENDPOINT}/course/${id}`);
};
