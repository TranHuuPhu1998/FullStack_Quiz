import { Col, Row, Table , Pagination , Modal, Button } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState  } from "react";
import { getTableColumns } from "features/admin-categories/columns";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PAGE_INFO } from "app-constants";
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from "app/actions/category";
import { DEFAULT_PAGE_SIZE } from "app-constants";
import SkeletonTable , { SkeletonTableColumnsType } from "components/skeleton/Table";
import { RootState } from "app/reducers";
import { deleteCategory } from "app/actions/category";
import PageContentBase from "components/page-content/PageContentBase";

const Category : React.FC = () => {
  const {t} = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState(PAGE_INFO);
  const [loading,setLoading] = useState(false);

  const {data,totalDocs} = useSelector((state:RootState) => state.categoryReducers);

  useEffect(() => {
    setLoading(true);
    dispatch(getCategory(pagination));
    setLoading(false);
  },[dispatch, pagination])

  const onView = (id: string) => {
    return history.push(`/admin/category/view/${id}`);
  }

  const onEdit = (id: string) => {
    return history.push(`/admin/category/edit/${id}`);
  }

  const onAdd = () => {
    return history.push('/admin/category/add');
  }

  const onDelete = (id: string) => {
    Modal.confirm({
      title: 'Ban co chac chan muon xoa?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk: () => deleteCategory(id)
    });
  }

  const columns = getTableColumns(t, { onView , onEdit , onDelete });

  const handleChangePageSize = (current:number, pageSize:number) => {
    setPagination({
      ...pagination,
      pageSize: pageSize,
      current: current,
    });
  }

  return (
    <PageContentBase
      title={t('List_of_categories')}
      useBack={false}
      actions={[
        <Button color='#FFAC40' key='add' onClick={() => onAdd()} >{t('Add_category')}</Button>
      ]}>
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
              <span dangerouslySetInnerHTML={{ __html: t('List_page', { total: totalDocs })}} ></span>
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
    </PageContentBase>
  );
};

export default Category;
