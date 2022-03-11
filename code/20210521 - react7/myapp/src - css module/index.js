import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*
### 严格模式(Strict Mode)
    识别具有不安全生命周期的组件
    有关旧式字符串ref用法的警告
    检测意外的副作用
    检测遗留 context API
*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
