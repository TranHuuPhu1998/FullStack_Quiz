import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Pagination, Row, Table } from 'antd';
import { DEFAULT_PAGE_SIZE, PAGE_INFO } from 'app-constants';
import PageContentBase from 'components/page-content/PageContentBase';
import SkeletonTable, { SkeletonTableColumnsType } from 'components/skeleton/Table';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTableColumns } from 'features/admin-user/columns';
import { RootState } from 'app/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { getListUser } from 'app/actions/user';

const AdminUser: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(PAGE_INFO);

  const { data, totalDocs } = useSelector((state: RootState) => state.userReducers);

  const columns = getTableColumns(t, {});

  const handleChangePageSize = (current: number, pageSize: number) => {
    setPagination({
      ...pagination,
      pageSize: pageSize,
      current: current,
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getListUser());
    setLoading(false);
  }, [dispatch]);

  return (
    <PageContentBase
      title={t('List_of_users')}
      useBack={false}
      actions={[
        <Button icon={<PlusCircleOutlined />} key="add">
          {t('Add_user')}
        </Button>,
      ]}
    >
      <SkeletonTable
        loading={loading}
        rowCount={DEFAULT_PAGE_SIZE}
        columns={columns as SkeletonTableColumnsType[]}
      >
        <Table
          bordered
          columns={columns}
          rowKey={(record) => record._id}
          dataSource={Array.isArray(data) ? data : []}
          pagination={false}
          loading={loading}
          footer={() => (
            <Row justify="space-between" align="middle">
              <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                <span
                  dangerouslySetInnerHTML={{ __html: t('List_page', { total: totalDocs }) }}
                ></span>
              </Col>
              <Col
                xxl={7}
                xl={7}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="d-flex justify-content-end"
              >
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

export default AdminUser;
