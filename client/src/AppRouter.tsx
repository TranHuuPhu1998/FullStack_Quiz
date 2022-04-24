import BaseDashboardLayout from "layout/DashboardLayout";
import NotFound from "pages/404";
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import flattenNavURLs from "routes/routes";
import { Alert } from "antd";
import { Spin } from "antd";

const { ErrorBoundary } = Alert;

const AsyncRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props}>{props.children}</Route>;
};

const AppRouter: React.FC = ({ authenticated }: any) => {
  const appRoutes = flattenNavURLs;
  return (
    <BaseDashboardLayout>
      <Suspense fallback={<Spin size="large" />}>
        <Switch>
          {appRoutes?.map((route, index) => {
            const Component = route.component;
            return (
              <AsyncRoute exact key={route.key} path={route.path} children={(<Component/>)}/>
            );
          })}
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Suspense>
    </BaseDashboardLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
