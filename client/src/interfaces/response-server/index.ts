import { CrudState } from 'interfaces/common';
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export interface ResponseReducers<T> {
  data?: T;
  totalDocs: number;
  status?: CrudState;
}
