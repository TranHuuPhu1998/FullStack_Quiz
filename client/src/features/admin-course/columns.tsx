import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TFunction } from 'react-i18next';
import { TableActions } from 'interfaces/components/TableActionsEntity';
import { DeleteOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
      key: 'name',
      title: t('Image_banner'),
      dataIndex: 'imageBanner',
      render: (_, record) => (
        <LazyLoadImage alt={record.name} width={200} effect="blur" src={record?.imageBanner} />
      ),
    },
    {
      key: 'createBy',
      title: t('Created_by'),
      dataIndex: 'createBy',
      render: (_, record) => record.createBy || '_',
    },
    {
      key: 'courseName',
      title: t('Course_name'),
      dataIndex: 'name',
      render: (_, record) => record?.name || '_',
    },
    {
      key: 'categoryName',
      title: t('Category_name'),
      dataIndex: 'category_name',
      render: (_, record) => record?.category_name || '_',
    },
    {
      title: t('Action'),
      width: 100,
      className: 'text-center',
      render: (text, record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => onEdit?.(record._id)}>
            {t('Edit')}
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => onDelete?.(record._id)}>
            {t('Delete')}
          </Button>
          <Button icon={<SendOutlined />} onClick={() => onDelete?.(record._id)}>
            {t('Preview')}
          </Button>
        </Space>
      ),
    },
  ];
}
