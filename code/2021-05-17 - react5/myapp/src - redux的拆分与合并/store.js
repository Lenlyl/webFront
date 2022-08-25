import { createStore,combineReducers} from "redux";
// 要注意 action 的 type 要做到全局唯一
const count = (count=1,action)=>{
    switch(action.type){
        case "count/add":
          return count + 1
        case "count/mius":
            return count - 1
    }
    return count;
};
const todos = (todos=[
    {
        id: 1,
        title:"列表项-1"
    },{
        id: 2,
        title:"列表项-2"
    }
],action) =>{
    switch(action.type){
        case "todos/add":
            return [
                ...todos,
                {
                    id: action.id,
                    title: action.title
                }
            ]
        case "todos/remove":
            return todos.filter(item=>(action.id!==item.id));
    }
    return todos;
};
const f = combineReducers({count,todos});
// console.log(f);
export default createStore(f);
