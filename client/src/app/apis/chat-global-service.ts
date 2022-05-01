import axiosService from 'app/axios/axios-service';
import { API_ENDPOINT } from 'app-constants';
import { Pagination } from 'interfaces/common';

const token = localStorage.getItem('TOKEN');

export const getListChatGlobal = (pageInfo:Pagination) => {
  const {  current , pageSize } = pageInfo;
  return axiosService.get(`${API_ENDPOINT}/chat-globals?page=${current}&limit=${pageSize}`, token);
}
