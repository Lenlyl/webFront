import { Redirect } from "react-router-dom";
import APIView from "./views/api/api";
import HomeView from "./views/home/home";
import AboutView from "./views/about/about";
import GetStartView from "./views/getstart/getstart";
import UndefinedView from "./views/404/404";
// 路由表
const routes = [
  {
    path:["/","/home","/index"],
    exact: true,
    render(props){ 
        return <HomeView {...props} />
    }
  }, {
    path: "/getstart",
    exact: true,
    render(props) {
      return <GetStartView {...props} />
    }
  }, {
    path: "/api",
    exact: true,
    render(props) {
      return <APIView  {...props}/>
    }
  }, {
    path: "/about",
    exact: true,
    render(props) {
      return <AboutView {...props} />
    }
  },{
    path: "/404",
    exact: true,
    render(props){
      return <UndefinedView {...props} />
    }
  },{
    path: "",
    render() {
      return <Redirect to="/404" />
    }
  }
];
export {routes};
