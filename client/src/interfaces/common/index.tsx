export interface Pagination {
  current: number;
  pageSize: number;
  text_search: number;
}

export enum CrudState {
  NotSet, // not set, default
  Succeed, // Created
  Deleted, // Deleted
  Updated, // Updated
  Failed, // Bad request
  ServerError, // internal server error
  NotFound, //Not found
  OK, //Found
  Forbidden,
}

export interface OptionEntity {
  value: string;
  label: string;
}
