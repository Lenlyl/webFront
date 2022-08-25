import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store";
/*
  react-redux:
    Provider 用于将 store 传递给整个应用
*/
ReactDOM.render(
  <Provider
    store={store}
  >
      <App />
  </Provider>,
  document.querySelector("#root")
);


