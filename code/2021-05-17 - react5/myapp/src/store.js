import { combineReducers, createStore } from "redux";

const Count = (count = 1, action) => {
    switch (action.type) {
        case "count/add":
            return count + 1
        case "count/mius":
            return count - 1
    }
    return count;
}
const Todos = (todos = [], action) => {
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
}

const reduxer = (state = {
    count: 1,
    todos: [
        {
            id: '1',
            title: '列表-1'
        }
    ]
}, action) => {
    return {
        count: Count(state.count, action),
        todos: Todos(state.todos, action)
    }
}
// const store = createStore(reduxer);
const func = combineReducers({ count: Count, todos: Todos });
const store = createStore(func);
export default store;