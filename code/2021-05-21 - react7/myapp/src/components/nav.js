import {Menu} from "antd"
import { Link, useLocation } from "react-router-dom";
function Nav({getkey=()=>{},theme="dark",navs,...props}){
    const location = useLocation();
    const key = getkey(location);
    return <Menu
        theme={theme}
        mode="horizontal"
        selectedKeys={[String(key)]}
        {...props}
    >
        {navs.map((item,index)=>{
            return <Menu.Item
                key={index}
            >
                <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
        })}
    </Menu>
}
export default Nav;
