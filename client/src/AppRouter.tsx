import BaseDashboardLayout from 'layout/DashboardLayout';
import NotFound from 'pages/404';
import NotFoundUser from 'pages/404-user';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import flattenNavURLs from 'routes/routersAdmin';
import routersAuth from 'routes/routersAuth';
import routersPublicUser from 'routes/routersUser';
import { Spin } from 'antd';
import { AUTHORIZATION_KEY } from 'app-constants';
import { useDispatch } from 'react-redux';
import { logout } from 'app/actions/auth';
import jwt_decode from 'jwt-decode';
import { RULE } from 'app-constants';
import UserLayout from 'layout/UserLayout';

const AsyncRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props}>{props.children}</Route>;
};

const AppRouter: React.FC<any> = ({ authenticated, rule }) => {
  const appRoutes = authenticated && authenticated ? flattenNavURLs : routersAuth;
  if (rule && rule === RULE.USER && authenticated) {
    return (
      <UserLayout>
        <Suspense fallback={<Spin size="large" />}>
          <Switch>
            {routersPublicUser?.map((route: any) => {
              const Component = route.component;
              return (
                <AsyncRoute exact key={route.key} path={route.path} children={<Component />} />
              );
            })}
            <Route path="*" exact component={NotFoundUser} />
          </Switch>
        </Suspense>
      </UserLayout>
    );
  } else {
    return (
      <BaseDashboardLayout authenticated={authenticated}>
        <Suspense fallback={<Spin size="large" />}>
          <Switch>
            {appRoutes?.map((route: any) => {
              const Component = route.component;
              return (
                <AsyncRoute exact key={route.key} path={route.path} children={<Component />} />
              );
            })}
            <Route path="*" exact component={NotFound} />
          </Switch>
        </Suspense>
      </BaseDashboardLayout>
    );
  }
};

const App: React.FC = () => {
  const authenticated = localStorage.getItem(AUTHORIZATION_KEY);
  const rule = localStorage.getItem('LOGIN_TYPE');
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
      <AppRouter authenticated={authenticated} rule={rule} />
    </Router>
  );
};

export default App;
