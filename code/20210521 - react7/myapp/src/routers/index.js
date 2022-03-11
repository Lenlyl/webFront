import { Route, Switch } from "react-router-dom";
import { routes } from "./routers.config";

function RootRouter(props){
    return <Switch>
        {routes.map((item,index)=>{
            return <Route 
                key={index}
                path={item.path} 
                exact={item.exact}
                render={(routerProps)=>item.render({...props,...routerProps})} 
            />
        })}    
    </Switch>
}

export default RootRouter;
