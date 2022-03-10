import axiosService from '@App/app/axios/axios-service';
import { API_ENDPOINT } from '@App/app/constants';

const token = localStorage.getItem('TOKEN');

export const getListChatGlobal = () => {
  return axiosService.get(`${API_ENDPOINT}/chat-globals`, token);
}
