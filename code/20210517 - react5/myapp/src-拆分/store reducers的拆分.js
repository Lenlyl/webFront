import {createStore, combineReducers} from "redux";

/*
    reducer 的拆分与合并
*/

const count = (count=1,action)=>{
    return count;
};
/*
    reducer 的拆分与合并
*/

// const f = (state={
//     count: 1,
//     todos:[]
// },action)=>{
//     return state;
// };

const count = (count=1,action)=>{
    return count;
};
const todos = (todos=[],action) =>{
    return todos;
};

const f = (state={
    count:1,
    todos:[]
},action)=>{
    return {
        count:count(state.count,action),
        todos:todos(state.todos,action)
    }
}

export default createStore(f);

