import React from 'react'
import { Alert } from '@App/components';

const ExerciseSuccess = ({ isSubmitQuestion, currentQ, length }) => {
  return (
    <>
      {
        isSubmitQuestion === false &&
        currentQ === length && (
          <Alert color="success">
            <h2 className='d-flex align-items-center justify-content-center text-success-info'>Chúc mừng bạn kiểm tra thành công hãy submit để kiểm tra thành quả !</h2>
          </Alert>
        )
      }
    </>
  )
}

export default ExerciseSuccess