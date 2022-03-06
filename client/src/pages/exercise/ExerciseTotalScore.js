import React from 'react'
import { Alert } from '@App/components';

const ExerciseTotalScore = ({ isSubmitQuestion, point, length, numberSwapTab }) => {
  return (
    <>
      {
        isSubmitQuestion && (
          <Alert color="success">
            <h2 className='pt-5 text-center text-success-info'>
              Chúc mừng bạn kiểm tra thành công với<span className='text-blue'> {point + '/' + length}</span> điểm .
            </h2>
            <h3 className='d-flex align-items-center justify-content-center'>Số lần chuyển Tab là : {numberSwapTab} lần</h3>
          </Alert>
        )
      }
    </>
  )
}

export default ExerciseTotalScore