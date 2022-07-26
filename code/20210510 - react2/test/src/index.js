// import ReactDom from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./app";


// ReactDom.render(
//     <app />,
//     document.getElementById("root")
// );

//react 18开始使用下面的初始化方法
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <App />
)