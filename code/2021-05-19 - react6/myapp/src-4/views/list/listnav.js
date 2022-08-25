import { Fragment } from 'react';
import {NavLink} from 'react-router-dom'
import {listNavData} from '../../listnavdata';
function ListNav(){
    return <nav className="listNav">
        {listNavData.map(item=>{
            return <Fragment key={item.type}>
                <NavLink
                    to={item.path}
                >
                    {item.title}
                </NavLink>
                <span> | </span>
            </Fragment>
        })}
    </nav>
}
export default ListNav;
