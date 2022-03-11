import { NavLink } from "react-router-dom";
/*
    NavLink： 和 Link 作用一致，都是为了实现视图跳转，但是 NavNavLink 多了一个匹配当前项的功能
        1. NavLink 会根据 url 和 当前的 to 属性进行匹配，但是注意默认也是模糊匹配

        activeClassName: 选中之后的 class 默认为 active

        activeStyle：当前项被选中后的 style

        isActive：fn 判断当前项是否应该选中，返回值为 true 则选中，否则为false
*/
function Nav(){
    return <nav>
        <NavLink 
            to="/" 
            exact
            activeStyle={{
                color:"red",
                fontWeight:"bold"
            }}
            isActive={(match,location)=>{
                console.log(match,location);
                return true;
            }}
        >首页</NavLink>
        <span> | </span>
        <NavLink to="/about" activeClassName="selected">关于</NavLink>
        <span> | </span>
        <NavLink to="/join">加入</NavLink>
    </nav>
}

export default Nav;
