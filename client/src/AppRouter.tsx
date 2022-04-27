import BaseDashboardLayout from 'layout/DashboardLayout';
import NotFound from 'pages/404';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import flattenNavURLs from 'routes/routes';
import routersAuth from 'routes/routersAuth';
import { Spin } from 'antd';
import { AUTHORIZATION_KEY } from 'app-constants';
import { useDispatch } from 'react-redux';
import { logout } from 'app/actions/auth';
import jwt_decode from 'jwt-decode';

const AsyncRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props}>{props.children}</Route>;
};

const AppRouter: React.FC<any> = ({ authenticated }) => {
  const appRoutes = authenticated ? flattenNavURLs : routersAuth;

  return (
    <BaseDashboardLayout authenticated={authenticated}>
      <Suspense fallback={<Spin size="large" />}>
        <Switch>
          {appRoutes?.map((route: any) => {
            const Component = route.component;
            return <AsyncRoute exact key={route.key} path={route.path} children={<Component />} />;
          })}
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Suspense>
    </BaseDashboardLayout>
  );
};

const App: React.FC = () => {
  const authenticated = localStorage.getItem(AUTHORIZATION_KEY);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) {
      const decode: any = jwt_decode(authenticated);
      if (decode.exp < Date.now() / 1000) {
        dispatch(logout(decode.exp));
      }
    }
  }, [authenticated, dispatch]);
  return (
    <Router>
      <AppRouter authenticated={authenticated} />
    </Router>
  );
};

export default App;
