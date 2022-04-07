import axiosService from '../axios/axios-service';
import { API_ENDPOINT } from '../../app-constants';

const token = localStorage.getItem('TOKEN');

export const getListChatGlobal = (pageInfo:any) => {
  const { page, limit } = pageInfo;
  return axiosService.get(`${API_ENDPOINT}/chat-globals?page=${page}&limit=${limit}`, token);
}
