import {connect} from "react-redux";
/*
    connect(mapStateToProps)
        mapStateToProps:(redux的state)=>{
            return 将 state 中组件需要的部分传递给组件，类型必须是个对象
        }
    withConnect 高阶组件: 传入一个组件，返回一个新的组件    
*/

function App(props){
    //console.log(props);
    const {count,dispatch} = props;
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
const withConnect = connect(state=>({count: state.count}));
const newApp = withConnect(App);
export default newApp;
