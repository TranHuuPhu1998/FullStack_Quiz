import React from 'react'
import { Link , useHistory } from 'react-router-dom';

const DashBoard:React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Link to='/admin/course'>courses</Link>
      <button onClick={() => history.push('/admin/users')}>User</button>
      DashBoard
    </div>
  )
}

export default DashBoard
