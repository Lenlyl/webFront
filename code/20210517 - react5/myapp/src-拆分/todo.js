import { useDispatch, useSelector } from "react-redux";
import Li from "./li";

function Todo() {
    const todos = useSelector(state=>state.todos);
    const dispatch = useDispatch();
    return <div>
        <input 
            type="button" 
            value="添加一列新表" 
            onClick={()=>{
                let now = Date.now()
                dispatch({
                    type:"todos/add",
                    id: now,
                    title: "列表项-"+now
                })
            }}    
        />
        <ul>
            {
                todos.map(item=><Li key={item.id} data={item} dispatch = {dispatch} />)
            }
        </ul>
    </div>
}

export default Todo;
