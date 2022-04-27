import React, { useEffect, useState } from 'react';
import PageContentBase from 'components/page-content/PageContentBase';
import SkeletonTable, { SkeletonTableColumnsType } from 'components/skeleton/Table';
import { getTableColumns } from 'features/admin-course/columns';
import { useTranslation } from 'react-i18next';
import { Button, Col, Pagination, Row, Table } from 'antd';
import { DEFAULT_PAGE_SIZE, PAGE_INFO, URL_PAGE } from 'app-constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { getListCourse } from 'app/actions/course';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const AdminCourse: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(PAGE_INFO);

  const onEdit = (id: string) => {
    return history.push(`${URL_PAGE.COURSE_EDIT}/${id}`);
  };

  const onAdd = () => {
    return history.push(URL_PAGE.COURSE_ADD);
  };

  const columns = getTableColumns(t, { onEdit });

  const { data, totalDocs } = useSelector((state: RootState) => state.courseReducers);

  const handleChangePageSize = (current: number, pageSize: number) => {
    setPagination({
      ...pagination,
      pageSize: pageSize,
      current: current,
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getListCourse(pagination));
    setLoading(false);
  }, [dispatch, pagination]);

  return (
    <PageContentBase
      title={t('List_of_questions')}
      useBack={false}
      actions={[
        <Button icon={<PlusCircleOutlined />} key="add" onClick={() => onAdd()}>
          {t('Add_question')}
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
          dataSource={Array.isArray(data) ? data : []}
          pagination={false}
          rowKey={(record) => record._id || record.name}
          loading={false}
          footer={() => (
            <Row justify="space-between" align="middle">
              <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('List_page', { total: totalDocs }),
                  }}
                ></span>
              </Col>
              <Col xl={7} lg={24} md={24} sm={24} xs={24} className="d-flex justify-content-end">
                <Pagination
                  showSizeChanger
                  onChange={handleChangePageSize}
                  defaultCurrent={DEFAULT_PAGE_SIZE}
                  total={totalDocs}
                />
              </Col>
            </Row>
          )}
        ></Table>
      </SkeletonTable>
    </PageContentBase>
  );
};

export default AdminCourse;
