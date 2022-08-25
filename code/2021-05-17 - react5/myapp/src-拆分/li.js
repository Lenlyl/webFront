import {memo} from "react";
function Li({data,dispatch}){
    const {id,title} = data;
    return <li>{title} - <button onClick={()=>{
        dispatch({
            type: "todos/remove",
            id
        })
    }}>删除</button></li>
}
export default memo(Li);
