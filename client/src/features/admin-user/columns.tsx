import { Avatar, Button, Space, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TFunction } from 'react-i18next';
import { TableActions } from 'interfaces/components/TableActionsEntity';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

/**
 * @param t Translation function
 * @returns
 */
export function getTableColumns(
  t: TFunction,
  { onDelete, onEdit }: TableActions
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
      render: (_, record) => {
        if (record.avatar) {
          return (
            <Space>
              <Avatar src={record.avatar} />
              <Typography.Text>{record.name}</Typography.Text>
            </Space>
          );
        } else {
          return (
            <Space>
              <Avatar>{record.name[0]}</Avatar>
              <Typography.Text>{record.name}</Typography.Text>
            </Space>
          );
        }
      },
    },
    {
      key: 'role',
      title: t('Role'),
      dataIndex: 'role',
      render: (_, record) => {
        if (record.role === 'admin') {
          return <Tag color="#55acee">{t('Admin')}</Tag>;
        } else {
          return <Tag color="#cd201f">{t('User')}</Tag>;
        }
      },
    },
    {
      key: 'createdAt',
      title: t('Created_at'),
      dataIndex: 'createdAt',
      render: (_, record) => new Date(record.createdAt).toLocaleString(),
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
          <Button icon={<EditOutlined />} onClick={() => onEdit?.(record._id)}>
            {t('Edit')}
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => onDelete?.(record._id)}>
            {t('Delete')}
          </Button>
        </Space>
      ),
    },
  ];
}
