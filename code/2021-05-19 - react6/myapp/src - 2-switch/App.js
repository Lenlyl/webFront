import { Route, Switch } from "react-router-dom";
import Nav from "./nav";
import IndexView from "./views";
import UndefinedView from "./views/404";
import AboutView from "./views/about";
import AboutDetailsView from "./views/aboutDetails";
import JoinView from "./views/join";
/*
  Switch: 作用类似 switch 语句，当其中一项匹配成功之后，则不再向下匹配
*/
function App() {
  return (<div>
      <h1>hello Router</h1>
      <Nav />
      <hr />
      <Switch>
          <Route 
              path="/"
              exact
              component={IndexView}
          />
          <Route 
              path="/about"
              exact
              component={AboutView}
          />
          <Route 
              path="/about/details"
              component={AboutDetailsView}
          />
          <Route 
            path="/join"
            component={JoinView}
          />
          <Route component={UndefinedView} />
      </Switch>
  </div>);
}

export default App;
