import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { AUTHORIZATION_KEY } from '@App/app/constants';
import routes from './app/routes';
import routesUnauth from './app/routes/routesUnath';
import LayoutAuth from './layout';
import LoadingTop from '@App/layout/Loading/LoadingTop';
import LoadingSpin from '@App/layout/Loading/LoadingSpin';

import './assets/css/black-dashboard-react.css';
import './assets/css/nucleo-icons.css';
import './assets/css/common.css';
import 'react-toastify/dist/ReactToastify.css';
/* Syntax highlighting */
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const DelayedFallback = () => {
  useEffect(() => {
    return () => {
      clearTimeout(100);
    };
  }, []);

  return <LoadingSpin />;
};

const RenderApp = ({ authenticated }) => {
  const appRoutes = authenticated ? routes : routesUnauth;

  return (
    <LayoutAuth authenticated={authenticated}>
      <React.Suspense fallback={<DelayedFallback />}>
        <Switch>
          {appRoutes?.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={() => {
                  return React.createElement(route.component);
                }}
              />
            );
          })}
          <Redirect to='/' />
        </Switch>
      </React.Suspense>
    </LayoutAuth>
  );
};

const App = () => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  // const tokenRedux = useSelector((state) => state.authReducers);

  return (
    <Router>
      <RenderApp authenticated={token} />
      <LoadingTop />
    </Router>
  );
};

export default App;
