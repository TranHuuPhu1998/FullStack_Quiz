import React , {useEffect} from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import AdminNavbar from './Navbar/AdminNavbar';
import Sidebar from './Sidebar/Sidebar';
import {logout} from '@App/app/actions/auth';
import {useDispatch , useSelector} from 'react-redux';
import { getOneUser } from '@App/app/actions/user'
import { ContentWrapper } from '@App/components';
import './styles.scoped.scss';

const LayoutAuth = ({ children, authenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducers)

  const handleLogout = (token) => {
    dispatch(logout(token));
  };

  useEffect(() => {
    dispatch(getOneUser())
  },[])


  return (
    <>
      {authenticated ? (
        <>
          <AdminNavbar handleLogout={handleLogout} user={user}/>
          <ContentWrapper>{children}</ContentWrapper>
          <Sidebar />
        </>
      ) : (
        <>
          <Header />
          <div>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default LayoutAuth;
