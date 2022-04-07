import { AUTH_ONLY } from 'routes/types';
import getIsLoggedIn from 'utils/getIsLoggedIn';

const requireLogin = (to:any, from:any, next:any) => {
  if (to.meta[AUTH_ONLY] && !getIsLoggedIn()) {
    next.redirect('/login');
  }
  next();
};

export default requireLogin;
