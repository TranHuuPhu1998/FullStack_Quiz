import axiosService from '@App/app/axios/axios-service';
import { API_ENDPOINT } from '@App/app/constants';

const token = localStorage.getItem('TOKEN');

export const getListChatGlobal = (pageInfo) => {
  const { page, limit } = pageInfo;
  return axiosService.get(`${API_ENDPOINT}/chat-globals?page=${page}&limit=${limit}`, token);
}
