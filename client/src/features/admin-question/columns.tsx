import { Button, Space } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { TFunction } from 'react-i18next'
import { TableActions } from 'interfaces/features/TableActions'

/**
 * @param t Translation function
 * @returns
 */
export function getTableColumns(
  t: TFunction,
  { onDelete, onEdit, onView }: TableActions
): ColumnsType<any> {
  return [
    {
      key: 'id',
      title: t('Id'),
      render: (_, record, index) => index + 1,
    },
    {
      key: 'name',
      title: t('Name'),
      dataIndex: 'name',
    },
    {
      key: 'createBy',
      title: t('Created_by'),
      dataIndex: 'created_by',
      render: (_, record) => record.created_by.name,
    },
    {
      key: 'courseName',
      title: t('Course_name'),
      dataIndex: 'course_name',
      render: (_, record) => record.course_name || '_',
    },
    {
      key: 'categoryName',
      title: t('Category_name'),
      dataIndex: 'category_name',
      render: (_, record) => record.category_name || '_',
    },
    {
      key: 'updatedAt',
      title: t('Updated_at'),
      dataIndex: 'updatedAt',
      render: (_, record) => new Date(record.updatedAt).toLocaleString(),
    },
    {
      title: t('Action'),
      width: 100,
      render: (text, record) => (
        <Space size="small">
          <Button onClick={() => onView?.(record._id)}>{t('View')}</Button>
          <Button onClick={() => onEdit?.(record._id)}>{t('Edit')}</Button>
          <Button onClick={() => onDelete?.(record._id)}>{t('Delete')}</Button>
        </Space>
      ),
    },
  ]
}
