import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TFunction } from 'react-i18next';
import { TableActions } from 'interfaces/features/TableActionsEntity';
import Editor from 'react-simple-code-editor';
import * as prism from 'prismjs';

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
      className: 'p-0',
      title: t('Name'),
      dataIndex: 'name',
      render: (_, record) => (
        <Editor
          aria-rowcount={3}
          aria-colcount={3}
          value={record?.name || ''}
          name="name"
          onValueChange={(code) => true}
          onChange={(code) => true}
          highlight={(code) => prism.highlight(code, prism.languages.js, 'js')}
          padding={10}
          placeholder={t('Content is None')}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
        />
      ),
    },
    {
      key: 'createBy',
      title: t('Created_by'),
      dataIndex: 'created_by',
      render: (_, record) => record.created_by?.name,
    },
    {
      key: 'courseName',
      title: t('Course_name'),
      dataIndex: 'course_name',
      render: (_, record) => record?.course_name || '_',
    },
    {
      key: 'categoryName',
      title: t('Category_name'),
      dataIndex: 'category_name',
      render: (_, record) => record?.category_name || '_',
    },
    {
      key: 'updatedAt',
      title: t('Updated_at'),
      dataIndex: 'updatedAt',
      render: (_, record) => new Date(record?.updatedAt).toLocaleString(),
    },
    {
      title: t('Action'),
      width: 100,
      render: (text, record) => (
        <Space size="small">
          <Button onClick={() => onEdit?.(record._id)}>{t('Edit')}</Button>
          <Button onClick={() => onDelete?.(record._id)}>{t('Delete')}</Button>
        </Space>
      ),
    },
  ];
}
