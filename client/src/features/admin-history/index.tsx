import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistoryExercise } from 'app/actions/history';
import { RootState } from 'app/reducers';
import { Row } from 'antd';
import { HistoryItemProps } from 'features/admin-history/HistoryItem';
import HistoryItem from 'features/admin-history/HistoryItem';

const AdminHistory: React.FC = () => {
  const histories = useSelector((state: RootState) => state.historyReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListHistoryExercise());
  }, []);

  return (
    <Row className="pt-2">
      {histories?.data?.map((item: HistoryItemProps, index: number) => (
        <HistoryItem
          key={index}
          userImage={item.userImage}
          courseName={item.courseName}
          categoryName={item.categoryName}
          userName={item.userName}
          courseImage={item.courseImage}
          score={item.score}
          status={item.status}
          createdAt={item.createdAt}
        />
      ))}
    </Row>
  );
};

export default AdminHistory;
