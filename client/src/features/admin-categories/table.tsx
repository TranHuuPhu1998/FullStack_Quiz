import { Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TFunction } from "react-i18next";
import { TableActions } from "../../interfaces/features/TableActions";

/**
 * Get all columns of poll table
 * @param t Translation function
 * @returns
 */
export function getTablePollColumns(t: TFunction, { onDelete, onEdit }: TableActions): ColumnsType<any> {
  return [
    {
      key: "id",
      title: t("Id"),
      render: (_, record, index) => index + 1,
    },
    {
      key: "name",
      title: t("Name"),
      dataIndex: "name",
    },
    {
      key: "createBy",
      title: t("Create-By"),
      dataIndex: "userName",
    },
    {
      key: "createdAt",
      title: t("createdAt"),
      dataIndex: "createdAt",
      render: (_, record) => new Date(record.createdAt).toLocaleString(),
    },
    {
      key: "updatedAt",
      title: t("updatedAt"),
      dataIndex: "updatedAt",
      render: (_, record) => new Date(record.updatedAt).toLocaleString(),
    },
    {
      title: t('action'),
      render: (text, record) => (
        <Space size="small">
          <ViewButton showIcon onClick={() => onView?.(record.id)} />
          <EditButton showIcon onClick={() => onEdit?.(record.id)} />
          <DeleteButton showIcon onClick={() => onDelete?.(record.id)} />
        </Space>
      ),
    },
  ]
}
