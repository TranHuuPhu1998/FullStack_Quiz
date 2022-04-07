import axiosService from '@App/app/axios/axios-service';
import { API_ENDPOINT } from '@App/app/constants';

const token = localStorage.getItem('TOKEN');

export const getListHistoryExercise = () => {
  return axiosService.get(`${API_ENDPOINT}/histories`);
}

export const createHistoryExercise = (data) => {
  return axiosService.post(`${API_ENDPOINT}/history`, data, token)
}