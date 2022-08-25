/*
    Link 组件, 用于应用内的视图跳转
        to 跳转地址
*/

import { Link } from "react-router-dom";

function Nav(){
    return <nav>
        <Link to="/">首页</Link>
        <span> | </span>
        <Link to="/about">关于</Link>
        <span> | </span>
        <Link to="/join">加入</Link>
        <span> | </span>
        <Link to="/about/details?name=kkb&age=18">关于详情</Link>
        <span> | </span>
        <a href="https://www.baidu.com">百度</a>
    </nav>
}

export default Nav;
