export const coverListDateToOption = (data:any) => {
  return data?.map((item:any) => ({
    label: item.name,
    value: item._id
  }));
}

export const coverItemDataSelect = (item:any) => {
  return {
    value: item?.id || "",
    label: item?.name || ""
  };
}
