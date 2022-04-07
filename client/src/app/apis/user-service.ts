import axiosService from '../axios/axios-service';
import { API_ENDPOINT } from '../../app-constants';

const token = localStorage.getItem('TOKEN');

export const getListUser = () => {
  return axiosService.get(`${API_ENDPOINT}/users`);
};

export const createUser = (data:any) => {
  return axiosService.post(`${API_ENDPOINT}/user` , data)
};

export const updateUserAvatar = (data:any) => {
  return axiosService.patch(`${API_ENDPOINT}/user/avatar`, data , token)
};

export const getOneUser = () => {
  return axiosService.get(`${API_ENDPOINT}/user`, token);
}
