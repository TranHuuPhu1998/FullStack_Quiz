import ReactDOM from "react-dom/client";
import 'styles/vendors/bootstrap.min.css';
import 'styles/vendors/antd.less';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from 'app/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
