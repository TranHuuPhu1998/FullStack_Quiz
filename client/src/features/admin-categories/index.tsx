import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getTableColumns } from "features/admin-categories/columns";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PAGE_INFO } from "app-constants";
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from "app/actions/category";

const Category : React.FC = () => {
  const {t} = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState(PAGE_INFO);
  const [loading,setLoading] = useState(false);

  const data = useSelector((state:any) => state.categoryReducers);
  console.log("🚀 ~ file: index.tsx ~ line 19 ~ data", data)

  const onView = (id: string) => {
    return history.push(`/admin/categories/${id}`);
  }

  const columns = getTableColumns(t, { onView });

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getCategory(pagination))
  },[pagination])

  return (
    <Table
      columns={columns}
      rowKey={record => record._id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default Category;
