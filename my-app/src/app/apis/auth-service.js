import axiosService from '@App/app/axios/axios-service';
import { API_ENDPOINT } from '@App/app/constants';

const url = 'auth';

export const signUp = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/register`, data);
};

export const login = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/login`, data);
};

export const logout = (data) => {
  return axiosService.get(`${API_ENDPOINT}/${url}/logout`, data.token);
};

export const sendMail = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/forgot-password`, data);
};

export const resetPassword = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/reset-password`, data);
};
