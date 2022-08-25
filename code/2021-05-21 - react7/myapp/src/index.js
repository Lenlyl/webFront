import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import store from './store/store';
import "antd/dist/antd.css";
import "./assets/css/base.css";
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider
        store={store}
      >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
