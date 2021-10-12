import axiosService from '@App/app/axios/axios-service';
import { API_ENDPOINT } from '@App/app/constants';

const token = localStorage.getItem('TOKEN');

export const getListUser = (data) => {
  return axiosService.get(`${API_ENDPOINT}/users`, data);
};

export const createUser = (data) => {
  return axiosService.post(`${API_ENDPOINT}/user` , data)
};

export const updateUserAvatar = (data) => {
  return axiosService.patch(`${API_ENDPOINT}/user/avatar`, data , token)
};

export const getOneUser = () => {
  return axiosService.get(`${API_ENDPOINT}/user`, token);
}
