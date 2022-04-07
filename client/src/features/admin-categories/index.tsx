import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory , deleteCategory } from "../../app/actions/category";
import { PAGE_INFO } from "../../app-constants";

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    editable: true,
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    editable: true,
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_: any, record: Item) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
      );
    },
  },
];

const Category : React.FC = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState("");
  const [pageInfo, setPageInfo] = useState(PAGE_INFO);

  const dispatch = useDispatch();
  const categories = useSelector((state:any) => state.categoryReducers);
  useEffect(() => {
    dispatch(getCategory(pageInfo));
  }, [pageInfo]);

  const handleCreateCategory = () => {
    setIsShowModal(true);
    setCategoryDetails("");
  };

  const handleUpdateCategory = (category:any) => {
    setIsShowModal(true);
    setCategoryDetails(category);
  };

  const handleDeleteCategory = (id:any) => {
    dispatch(deleteCategory(id));
  };

  const handleKeyPressSearch = (e:any) => {
    if (e.key === "Enter") {
      dispatch(getCategory(pageInfo));
    }
  };

  const onChangeSearch = (e:any) => {
    setPageInfo({
      ...pageInfo,
      page: 1,
      text_search: e.target.value,
    });
  };

  const onChangePage = (number:any) => {
    setPageInfo({ ...pageInfo, page: Number(number) });
  };

  return (

  );
};

export default Category;
