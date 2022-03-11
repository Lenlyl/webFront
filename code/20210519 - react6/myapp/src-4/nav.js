import { NavLink } from "react-router-dom";
function Nav(){
    return <nav className="nav">
        <NavLink 
            to="/" 
            exact
            isActive={(match,{pathname})=>{
                return pathname === "/"||pathname === "/index"||pathname === "/home";
            }}
        > 首页</NavLink>
        <span> | </span>
        <NavLink to="/about">关于</NavLink>
        <span> | </span>
        <NavLink to="/join">加入</NavLink>
        <span> | </span>
        <NavLink to="/list">列表</NavLink>
    </nav>
}

export default Nav;
