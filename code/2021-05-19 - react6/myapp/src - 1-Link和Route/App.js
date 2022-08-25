import { Route } from "react-router-dom";
import Nav from "./nav";
import IndexView from "./views";
import AboutView from "./views/about";
import AboutDetailsView from "./views/aboutDetails";
import JoinView from "./views/join";

/*
  Route 路由组件
    path 当前路由要匹配的路由规则
      1. 注意 Route 默认为模糊匹配及 当前 url 以 path 开始则匹配
      2. exact 精确匹配， url === path 或者 url === path/ 时匹配 
      3. strict 严格匹配：url === path。要注意使用 strict 必须搭配使用 exact
      4. 动态路由
    component 当前路由的规则匹配成功之后，要显示的视图(视图应该是一个组件)
    render render 属性接收的一个函数，函数的返回值，定义的是当前 Route 要渲染的视图

*/
function App() {
  const user = {
    loginname:"YOYO"
  };
  return (<div>
      <h1>hello Router</h1>
      <Nav />
      <hr />
      <Route 
          path="/"
          exact
          component={IndexView}
      />
      <Route 
          path="/about"
          component={AboutView}
      />
      <Route 
          path="/about/details"
          component={AboutDetailsView}
      />
      <Route 
         path="/join"
         render={(props)=>{
           return <JoinView 
             user={user}
             {...props}
           />
         }}
      />
  </div>);
}

export default App;
