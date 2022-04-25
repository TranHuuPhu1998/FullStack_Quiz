import { Col, Row, Table, Pagination, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PAGE_INFO } from 'app-constants'
import { useHistory } from 'react-router-dom'
import { getQuestions } from 'app/actions/question'
import { DEFAULT_PAGE_SIZE } from 'app-constants'
import { getTableColumns } from 'features/admin-question/columns'
import SkeletonTable, { SkeletonTableColumnsType } from 'components/skeleton/Table'
import PageContentBase from 'components/page-content/PageContentBase'
import { RootState } from 'app/reducers'
import { useTranslation } from 'react-i18next'

const AdminQuestion: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading] = useState(false)
  const [pagination, setPagination] = useState(PAGE_INFO)

  const { data, totalDocs } = useSelector((state: RootState) => state.questionReducers)

  useEffect(() => {
    dispatch(getQuestions(pagination))
  }, [dispatch, pagination])

  const onView = (id: string) => {
    return history.push(`/admin/category/view/${id}`)
  }

  const columns = getTableColumns(t, { onView })

  const handleChangePageSize = (current: number, pageSize: number) => {
    setPagination({
      ...pagination,
      pageSize: pageSize,
      current: current,
    })
  }

  return (
    <PageContentBase
      title={t('List_of_questions')}
      useBack={false}
      actions={[
        <Button color="#FFAC40" key="add">
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
          rowKey={(record) => record._id}
          dataSource={data}
          pagination={false}
          loading={loading}
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
        />
      </SkeletonTable>
    </PageContentBase>
  )
}

export default AdminQuestion
