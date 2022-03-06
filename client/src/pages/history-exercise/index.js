import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistoryExercise } from '@App/app/actions/history';
import AdminLayout from '@App/layout/AdminLayout';
import HistoryItem from './HistoryItem';

const HistoryExercise = () => {
  const histories = useSelector((state) => state.historyReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListHistoryExercise());
  }, [])
  return (
    <AdminLayout>
      {
        histories?.data?.map((item, index) => (
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
        ))
      }
    </AdminLayout>
  )
}

export default HistoryExercise