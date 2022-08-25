import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "./nav";
import IndexView from "./views";
import UndefinedView from "./views/404";
import AboutView from "./views/about";
import JoinView from "./views/join";
import  './index.css';
import ListView from "./views/list";
/*
  /list -- 显示列表首页(第0个分类的第1页);
  /list/分类 -- 显示列表(该分类的第1页);
  /list/分类/页码 -- 显示列表(该分类的第页码页);
*/
/*
  动态路由，path 中，有部分字段是一个动态(可变)的值
*/

/*
  Redirect 重定向组件:
    from 当url为什么的时候需要重定向，可以不写，不写时，代表所有地址都重定向
    to 重定向到哪里去
*/
const types = ["good","share","ask"];
function App() {
  return (<div className="wrap">
      <h1>hello Router</h1>
      <Nav />
      <hr />
      <Switch>
          <Route 
              path={["/","/home","/index"]}
              exact
              component={IndexView}
          />
          <Route 
              path="/about"
              exact
              component={AboutView}
          />
          <Route 
            path="/join"
            component={JoinView}
          />
          <Route 
            path="/list/:type?/:page?"  
            render={({match})=>{
                const {type="good",page="1"} = match.params;
                if(types.includes(type)
                && String(parseInt(page)) === page
                && page >= 1){
                    return <ListView />
                }
                return <Redirect to="/404" />
            }}
          />
          <Route path="/404" exact component = {UndefinedView} />
          <Redirect to="/404" />
      </Switch>
  </div>);
}

export default App;
