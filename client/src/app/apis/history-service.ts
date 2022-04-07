import axiosService from '../axios/axios-service';
import { API_ENDPOINT } from '../../app-constants';

const token = localStorage.getItem('TOKEN');

export const getListHistoryExercise = () => {
  return axiosService.get(`${API_ENDPOINT}/histories`);
}

export const createHistoryExercise = (data:any) => {
  return axiosService.post(`${API_ENDPOINT}/history`, data, token)
}
