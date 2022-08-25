import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
// 要注意 action 的 type 要做到全局唯一
const count = (count = 1, action) => {
    switch (action.type) {
        case "count/add":
            return count + 1
        case "count/mius":
            return count - 1
    }
    return count;
};
const todos = (todos = [
    {
        id: 1,
        title: "列表项-1"
    }, {
        id: 2,
        title: "列表项-2"
    }
], action) => {
    switch (action.type) {
        case "todos/add":
            return [
                ...todos,
                {
                    id: action.id,
                    title: action.title
                }
            ]
        case "todos/remove":
            return todos.filter(item => (action.id !== item.id));
    }
    return todos;
};

const cnode = (cnode = {
    type: "all",
    list: [],
    loading: false
}, action) => {
    switch (action.type) {
        case "cnode/update":
            return {
                ...cnode,
                loading: false,
                list: action.data
            }
        case "cnode/type":
            return {
                ...cnode,
                type: action.tab
            }
        case "cnode/loading":
            return {
                ...cnode,
                loading: true
            }
    }
    return cnode;
}

const f = combineReducers({ count, todos, cnode });
// console.log(f);
export default createStore(f,applyMiddleware(thunk));

/*
    使用了 thunk 中间件之后， dispatch 除了可以接受一个 对象类型的 action 之外，还可以接受 函数类型的 action
        对象类型的 action：直接调用 reducer 修改 state
        函数类型的 action：执行该函数，并将 dispatch 方法 和 getState 方法传递给函数

*/
