import {useDispatch, useSelector, useStore} from "react-redux";
/*
    react-redux 7 之后，新增加了几个 hook：
        - useDispatch 获取 dispatch
        - useStore 获取 store
        - useSelector 获取 state 
*/

function App(){
    const count = useSelector(state=>state.count);
    const dispatch = useDispatch();
    console.log(useStore());
    return <div>
        <button onClick={()=>{
            dispatch({
                type:"add"
            })
        }}>+</button>
        <span> {count} </span>
        <button onClick={()=>{
            dispatch({
                type:"mius"
            })
        }}>-</button>
    </div>
}
export default App;
