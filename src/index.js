import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from './App';
import store from "./redux/store/index";
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Loader from "./loading";
import MessageAlert from "./messageAlert";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MessageAlert />
      <Loader />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
