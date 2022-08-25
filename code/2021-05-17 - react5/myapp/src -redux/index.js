import { createStore } from "redux";
import ReactDOM from "react-dom";
/*
  redux 三大原则:
  
- 单一数据源: 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中

- state 是只读的: 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象

- 使用纯函数来执行修改
*/
/*
  state 状态
  store 存储状态的仓库 - 提供了对状态的修改和获取方法
    dispatch: ƒ dispatch(action)(同步方法) 发出修改指令
        调用 dispatch，store 会重新执行 reducer 函数，并将 state 和 action 传递给 reducer，reducer 接收到 action 之后，要根据 action 的相关参数，返回新的state
    getState: ƒ getState() 获取状态
    replaceReducer: ƒ replaceReducer(nextReducer)
    subscribe
  reducer 纯函数 - 状态可以有何种修改
  action 描述要对状态进行什么的修改
      - action 是一个普通对象
      - 该对象由一个 type 属性，及 0 到多个 payload 属性组成
        - type 属性用于描述该指令是对 state 做出什么的修改
        - payload 附加参数
*/
/*
  纯函数:
    1. 相同的输入永远返回相同的输出
    2. 不修改函数的输入值
    3. 不依赖外部环境状态，只依赖其参数
    4. 无任何副作用
*/
function fn(state = {
  count: 1
}, action) {
  //console.log(state,action);
  switch (action.type) {
    case "add":
      return {
        count: state.count + 1
      }
    case "mius":
      return {
        count: state.count - 1
      }
  }
  return state;
}

const store = createStore(fn);

const render = () => {
  console.log('render');
  ReactDOM.render(
    <div>
      <button onClick={() => {
        store.dispatch({
          type: "mius"
        })
      }}>-</button>
      {store.getState().count}
      <button onClick={() => {
        store.dispatch({
          type: "add"
        })
      }}>+</button>
      <button onClick={() => {
        unSubscribe();
      }}>取消监听</button>
      <button onClick={() => {
        unSubscribe = store.subscribe(render);
      }}>添加监听</button>
    </div>,
    document.querySelector("#root")
  )
};
let unSubscribe = store.subscribe(() => {
  console.log('unSubscribe');
  render();
});
render();
