import axios , { AxiosInstance } from 'axios';

class AxiosService {
  service: AxiosInstance;
  constructor() {
    const service: AxiosInstance = axios.create({
      headers: {}
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  setHeader(name:string, value:string) {
    this.service.defaults.headers.common[name] = value;
  }

  removeHeader(name:string) {
    delete this.service.defaults.headers.common[name];
  }

  handleSuccess(response:any) {
    return response;
  }

  redirectTo = (document:any, path:string) => {
    document.location = path;
  };
  redirectPage = (title:string, path:string) => {
    window.history.pushState('page2', title, path);
  };

  handleError(error:any) {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, '/login');
        break;
      default:
        return Promise.reject(error);
    }
  }

  get(endpoint:string, token?:any) {
    return this.service.request({
      method: 'GET',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
    });
  }

  post(endpoint:string, payload:any, token?:any) {
    return this.service.request({
      method: 'POST',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
      data: payload
    });
  }

  put(endpoint:string, payload:any, token?:any) {
    return this.service.request({
      method: 'PUT',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
      data: payload
    });
  }

  patch(endpoint:string, payload:any, token?:any) {
    return this.service.request({
      method: 'PATCH',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
      data: payload
    });
  }

  delete(endpoint:string, token?:any) {
    return this.service.request({
      method: 'DELETE',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json'
    });
  }
}
export default new AxiosService();
