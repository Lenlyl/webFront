import { useDispatch, useSelector } from "react-redux";

function Count(){
    const count = useSelector(state=>state.count);
    const dispatch = useDispatch();
    return <div>
    <button onClick={()=>{
        dispatch({
            type:"count/add"
        })
    }}>+</button>
    <span> {count} </span>
    <button onClick={()=>{
        dispatch({
            type:"count/mius"
        })
    }}>-</button>
</div>
}
export default Count;
