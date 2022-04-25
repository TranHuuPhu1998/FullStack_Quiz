import ReactDOM from "react-dom/client";
import 'styles/vendors/bootstrap.min.css';
import 'styles/vendors/antd.less';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from 'app/store';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { Router } from "react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore();

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
      <ToastContainer />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
