export interface TableActions {
  [otherAction: string]: (rowId: string) => void;
}
