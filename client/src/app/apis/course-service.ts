import axiosService from '../axios/axios-service';
import { API_ENDPOINT } from '../../app-constants';

const token = localStorage.getItem('TOKEN');

export const getListCourse = () => {
  return axiosService.get(`${API_ENDPOINT}/courses`);
};

export const createCourse = (data:any) => {
  return axiosService.post(`${API_ENDPOINT}/course`, data ,token)
};

export const deleteCourse = (id:any) => {
  return axiosService.delete(`${API_ENDPOINT}/course/${id}`, token)
};

export const updateCourse = (data:any) => {
  return axiosService.patch(`${API_ENDPOINT}/course/${data.id}`,data,token)
};
