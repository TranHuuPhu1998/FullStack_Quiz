import axiosService from 'app/axios/axios-service';
import { API_ENDPOINT } from 'app-constants';

const url = 'auth';

export const signUp = (data: any) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/register`, data);
};

export const login = (data: any) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/login`, data);
};

export const logout = (data: any) => {
  return axiosService.get(`${API_ENDPOINT}/${url}/logout`, data.token);
};

export const sendMail = (data: any) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/forgot-password`, data);
};

export const resetPassword = (data: any) => {
  return axiosService.post(`${API_ENDPOINT}/${url}/reset-password`, data);
};
