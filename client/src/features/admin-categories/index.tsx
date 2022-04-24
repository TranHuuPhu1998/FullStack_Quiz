import { Col, Row, Table  , Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { getTableColumns } from "features/admin-categories/columns";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PAGE_INFO } from "app-constants";
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from "app/actions/category";
import { DEFAULT_PAGE_SIZE } from "app-constants";
import SkeletonTable , { SkeletonTableColumnsType } from "components/skeleton/Table";

const Category : React.FC = () => {
  const {t} = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState(PAGE_INFO);
  const [loading,setLoading] = useState(false);

  const {data,totalDocs} = useSelector((state:any) => state.categoryReducers);

  useEffect(() => {
    setLoading(true);
    dispatch(getCategory(pagination));
    setLoading(false);
  },[pagination])

  const onView = (id: string) => {
    return history.push(`/admin/categories/${id}`);
  }

  const columns = getTableColumns(t, { onView });

  const handleChangePageSize = (current:number, pageSize:number) => {
    setPagination({
      ...pagination,
      pageSize: pageSize,
      current: current,
    });
  }
  
  return (
    <SkeletonTable 
      loading={loading} 
      rowCount={DEFAULT_PAGE_SIZE} 
      columns={columns as SkeletonTableColumnsType[]}>
      <Table
        bordered
        columns={columns}
        rowKey={record => record._id}
        dataSource={data}
        pagination={false}
        loading={loading}
        footer={() => (
          <Row justify='space-between' align='middle'>
            <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
              <span dangerouslySetInnerHTML={{ __html: t('list_page', { total: totalDocs })}} ></span>
            </Col>
            <Col xxl={7} xl={7} lg={24} md={24} sm={24} xs={24} className="d-flex justify-content-end">
              <Pagination
                showSizeChanger
                onChange={handleChangePageSize}
                defaultCurrent={DEFAULT_PAGE_SIZE}
                total={totalDocs}
              />
            </Col>
        </Row>
        )}
      />
    </SkeletonTable>
  );
};

export default Category;
